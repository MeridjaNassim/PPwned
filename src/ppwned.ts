import {getSha1HashForString} from './utils/hash'
import {HashResult , TestInput, TestResult , Result} from './types/result'
import {getDataAsString} from './utils/network'
import {splitByIndex, SplitResult} from './utils/utility'

console.log('ppwned is a script built with typescript to check if a given password was cracked or not')
console.log('---------------------------------------------------------------------------------------------')
let argv : string[] = process.argv

const pwds : string[] | undefined = argv.slice(2)
const results : HashResult[] = pwds.map(pwd => getSha1HashForString(pwd))
let res1 : HashResult= results[0]
if(res1) {
    let split : SplitResult = splitByIndex(res1.hash.toUpperCase(),5)
    let endpoint = `https://api.pwnedpasswords.com/range/${split.firstPart}`
    console.log('Testing the password ...')
    getDataAsString(endpoint)
    .then(data => preProcessData(data))
    .then(compares => {
        let result = testPassword(compares,split.secondPart);
        let finalResult = getResult(res1,{
            apiUrl : endpoint,
            hashSent : split.firstPart,
            hashNotSent : split.secondPart
        },result)
        dispatchResultForUser(finalResult)
        console.log('Thank you for using our script :) ')
    })
    .catch(err => console.error(err))
}else {
    console.log('Please enter a password to test')
}

function preProcessData(data : string) : Promise<CompareInput[]> {
  return new Promise((resolve, reject)=> {
    let lines:string[] = data.split("\r\n"); /// getting all the lines
    let items = lines.map(line =>line.split(':') );
    let ret = items.map(item => <CompareInput>{
        data : item[0],
        count : Number.parseInt(item[1])
    })
    resolve(ret)
  })
}

function testPassword(data : CompareInput[] , comparedData : string) : TestResult {
    for(let i = 0 ; i<data.length ; i ++) {
        let input : CompareInput = data[i];

        if(input.data === comparedData) {
            return {
                isPwned : true,
                dataFound : input,
                pwnedCOunt : input.count
            }
        }
    }
    return {
        isPwned :false,
    }
}

function dispatchResultForUser(result : Result) : void {
    console.log('Test Data ----')
    console.log(result)
    console.log('----------')
    console.log('Verdict')
    console.log('----------')
    if(result.result.isPwned) {
        console.log('Looks like this password is not safe, it was pwned ',result.result.pwnedCOunt ,'times , if you are using it , CHANGE IT !!')
    }else {
        console.log('Looks like this password is safe for the time being , make sure to check for it safety frequently')
    }
}
function getResult( hashResult : HashResult, testInput : TestInput ,testResult : TestResult ) : Result {
    return {
        input : hashResult,
        test : testInput,
        result : testResult
    }
}
interface CompareInput {
    data : string ;
    count : number
}
