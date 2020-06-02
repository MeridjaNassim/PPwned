const testPwd = require('./test_my_password')

let pwd = process.argv[2]
if(pwd) {
    testPwd(pwd)
}else {
    console.log('Please enter a valid password to test , cant test null password')
}
