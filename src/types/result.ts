export interface HashResult {
    password : string ,
    hash : string,
    hashType : string ,
}

export interface TestInput  {
    apiUrl : string | URL | undefined,
    hashSent : string,
    hashNotSent : string,
} 
export interface TestResult {
    dataFound?: Object | undefined,
    isPwned : boolean,
    pwnedCOunt ?: number | undefined
}
export interface Result {
    input : HashResult , 
    test : TestInput
    result : TestResult

}