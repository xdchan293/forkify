import {async} from 'regenerator-runtime'
import {TIMEOUT_SEC} from './config.js'
//超时计时器
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJOSN = async function(url) {
    try{
       
       const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
       const data = await res.json();

    if(!res.ok) throw new Error(`${res.message} (${res.status})`);
    return data;
    }catch(err) {
        throw err;
    }
}

export const sendJOSN = async function(url,uploadData) {
  try{
     
    const fetchPro = fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(uploadData)
    }) 
    //console.log(url,JSON.stringify(uploadData))
    const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
    const data = await res.json()

  if(!res.ok) throw new Error(`${res.message} (${res.status})`);
  return data;
  }catch(err) {
      throw err;
  }
}