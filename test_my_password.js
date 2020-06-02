/**
 * @author : Meridja Abdellah Nassim 
 * This script is a way to test if your password was cracked and compromised without revealing it . 
 * This script uses a REST API provided by https://api.pwnedpasswords.com
 * It uses K-Anomality principle : you send a prefix of the hashed version of your password to the api which will return all the hashes that have 
 * that prefix and it checks locally if they are compromised. 
 * Script inspired from Computerphile's Video on pwned passwords  
 */

/// some imports
const crypto = require("crypto");
const https = require("https");
const fs = require("fs").promises;

/// created a hash of the password using SHA-1 

let pwd = process.argv[2]
let shasum = crypto.createHash("sha1");
shasum.update(pwd);
const hash = shasum.digest("hex");

const sentbit = hash.substring(0, 5); /// this is the bit of the hash that is sent to the api
const otherbit = hash.substring(5, hash.length).toUpperCase(); /// we use this to compare in the hashes list

/// we store the hashes in a file that will be deleted 
 fs
  .open("./hashes", "a")
  .then((fileHandle) => {
      /// using https Client we request the api for data
    https.get(`https://api.pwnedpasswords.com/range/${sentbit}`, (res) => {
      
        console.log("Request statusCode:", res.statusCode);
      /// Appending all retreived data to the file .
      res.on("data", (d) => {
        fileHandle.appendFile(d);
      });
      /// when we finish appending
      res.on("end", () => {
        fileHandle.close();
        /// opening the file in read only
        fs.open("./hashes", "r")
        .then((fileHandle) => {
          fileHandle
            .readFile() /// reading all the data from the file
            .then((data) => {
              testPassword(data.toString(), otherbit); /// testing retreived data against the otherbit of the hash
            })
            .catch((err) => console.error(err))
            .finally(() => {

                /// closing the handle to the file 
              fileHandle.close();

              // delete file named 'hashes'
              fs.unlink("./hashes")
                .then(()=>{
                    console.log('Hashes file deleted')
                }).catch(err =>{
                    console.log(err)
                })
            });
        });
      });
    });
  })
  .catch((err) => console.error(err));

function testPassword(data, test) {
  let lines = data.split("\r\n"); /// getting all the lines 
  let pwned = false;
  /// trarversing the lines to test the password
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    let ind = line.indexOf(test, 0); /// we check if the line has the otherbit as substring the string
    if (ind === 0) {
      /// if it exists then the password is pwned
        let item = line.split(":");
      pwned = true;
      console.log("Password compromised and pwned ,", item[1] + " times");
      break;
    }
  }
  if(!pwned){
      /// password not compromised
    console.log("Looks like this password is safe");
  }
  
}

