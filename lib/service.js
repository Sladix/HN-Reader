'use babel';

import request from 'request';

export default {
  fetchLatestHN(what){
    let url = "https://hacker-news.firebaseio.com/v0/"+what+".json";
    return new Promise((resolve,reject) => {
      request(url,(error,response,body) => {
        if(!error && response.statusCode == 200){
          resolve(JSON.parse(body))
        }else{
          reject({
            reason: 'Unable to fetch news'
          });
        }
      })
    })

  }
}
