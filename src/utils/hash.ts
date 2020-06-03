import crypto, { HexBase64BinaryEncoding, HexBase64Latin1Encoding, HashOptions } from 'crypto'
import {HashResult} from '../types/result'
const SHA1 : string = 'sha1';
const HEX : HexBase64Latin1Encoding ='hex';


function getHashForString(plain : string , algo : string , encoding : HexBase64Latin1Encoding ,options?: HashOptions | undefined) : string {
    const sum : crypto.Hash = crypto.createHash(algo,options);
    sum.update(plain);
    const hash = sum.digest(encoding)
    return hash
}

export function getSha1HashForString(plain : string) : HashResult {
    return {
        password : plain,
        hash : getHashForString(plain,SHA1,HEX),
        hashType : SHA1
    }
}