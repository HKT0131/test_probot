import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  // Pull Requestが作成されたタイミングで呼び出されます
  app.on('issues.labeled', async (context : any) => {

    const isBug = context.payload.issue.labels.some((label: any) => { return label.name === 'bug' })
    
    //Bugならコメントつける
    if(isBug){
      // ラベル追加APIを呼び出す際のリクエストパラメータ生成
      // Returns: {owner: 'username', repo: 'reponame', number: 123, labels: ['レビュー可能']}
      const params = context.issue({
        labels: ['need_check']
      })

      // 作成されたPull Requestにラベル追加
      await context.github.issues.addLabels(params)
    }
  })

  app.on('issues.labeled', async(context : any) => {
    // ラベルの文字列で条件分岐
    const isBug = context.payload.issue.labels.some((label: any) => { return label.name === 'bug' })
    
    //Bugならコメントつける
    if(isBug){
      const params = context.issue({
        body : 'Please look back this bug!!\nhttps://docs.google.com/forms/d/e/1FAIpQLSdufxjUrGALB-aBinIiWBYRS2KVNazSCKNK1JweVCQV3itGuw/viewform'
      })

      await context.github.issues.createComment(params)
    }
  })
}