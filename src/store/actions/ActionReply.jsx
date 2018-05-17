import { request } from '@script/reuse'
export default {
  fetchData(opts, callback) {
    // opts.content = `${opts.content}<p>FROM<a href='//liuguanhua.github.io/cnode'
    // target='_bank'>CNODE</a></p>`;
    return (dispatch, getState) => {
      const topicId = getState().Article.result.data.id
      ;(async () => {
        const getresult = await request({
          method: 'post',
          url: `/topic/${topicId}/replies`,
          data: opts
        }).catch(() => {
          this.$showMsg('亲,评论失败!')
        })
        if (getresult) {
          //评论后刷新
          request({
            url: `topic/${topicId}`,
            success: result => {
              dispatch(this.fetchDone(result))
              callback && callback()
            }
          })
        }
      })()
    }
  },
  fetchDone(result) {
    return { type: 'UPDATE_REPLY', result: result }
  },
  sendCnt(data) {
    return { type: 'GET_REPLY_CNT', reply_content: data }
  }
}
