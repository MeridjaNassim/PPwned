import https from 'https'
import { IncomingMessage } from 'http'


export function getDataAsString(url : URL | string) : Promise<string> {
   return new Promise((resolve, reject)=>{
    let data : string ='';
    https.get(url, (res : IncomingMessage) =>{
       if(res.statusCode == 200) {
        res.on('data',(chunk)=>{
            data = data+chunk.toString()
        })
        res.on('end',()=>{
            resolve(data)
        })
        res.on('error', (err : Error)=>{
            reject(err)
        })
       }else {
           reject(new Error('Error occured while fetching data , code : '+ res.statusCode))
       }
    })
   })
}