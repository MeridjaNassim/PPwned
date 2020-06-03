"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./utils/hash");
const network_1 = require("./utils/network");
const utility_1 = require("./utils/utility");
console.log('ppwned is a script built with typescript to check if a given password was cracked or not');
console.log('---------------------------------------------------------------------------------------------');
let argv = process.argv;
const pwds = argv.slice(2);
const results = pwds.map(pwd => hash_1.getSha1HashForString(pwd));
let res1 = results[0];
if (res1) {
    let split = utility_1.splitByIndex(res1.hash.toUpperCase(), 5);
    let endpoint = `https://api.pwnedpasswords.com/range/${split.firstPart}`;
    console.log('Testing the password ...');
    network_1.getDataAsString(endpoint)
        .then(data => preProcessData(data))
        .then(compares => {
        let result = testPassword(compares, split.secondPart);
        let finalResult = getResult(res1, {
            apiUrl: endpoint,
            hashSent: split.firstPart,
            hashNotSent: split.secondPart
        }, result);
        dispatchResultForUser(finalResult);
        console.log('Thank you for using our script :) ');
    })
        .catch(err => console.error(err));
}
else {
    console.log('Please enter a password to test');
}
function preProcessData(data) {
    return new Promise((resolve, reject) => {
        let lines = data.split("\r\n"); /// getting all the lines
        let items = lines.map(line => line.split(':'));
        let ret = items.map(item => ({
            data: item[0],
            count: Number.parseInt(item[1])
        }));
        resolve(ret);
    });
}
function testPassword(data, comparedData) {
    for (let i = 0; i < data.length; i++) {
        let input = data[i];
        if (input.data === comparedData) {
            return {
                isPwned: true,
                dataFound: input,
                pwnedCOunt: input.count
            };
        }
    }
    return {
        isPwned: false,
    };
}
function dispatchResultForUser(result) {
    console.log('Test Data ----');
    console.log(result);
    console.log('----------');
    console.log('Verdict');
    console.log('----------');
    if (result.result.isPwned) {
        console.log('Looks like this password is not safe, it was pwned ', result.result.pwnedCOunt, 'times , if you are using it , CHANGE IT !!');
    }
    else {
        console.log('Looks like this password is safe for the time being , make sure to check for it safety frequently');
    }
}
function getResult(hashResult, testInput, testResult) {
    return {
        input: hashResult,
        test: testInput,
        result: testResult
    };
}
