"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSha1HashForString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SHA1 = 'sha1';
const HEX = 'hex';
function getHashForString(plain, algo, encoding, options) {
    const sum = crypto_1.default.createHash(algo, options);
    sum.update(plain);
    const hash = sum.digest(encoding);
    return hash;
}
function getSha1HashForString(plain) {
    return {
        password: plain,
        hash: getHashForString(plain, SHA1, HEX),
        hashType: SHA1
    };
}
exports.getSha1HashForString = getSha1HashForString;
