"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataAsString = void 0;
const https_1 = __importDefault(require("https"));
function getDataAsString(url) {
    return new Promise((resolve, reject) => {
        let data = '';
        https_1.default.get(url, (res) => {
            if (res.statusCode == 200) {
                res.on('data', (chunk) => {
                    data = data + chunk.toString();
                });
                res.on('end', () => {
                    resolve(data);
                });
                res.on('error', (err) => {
                    reject(err);
                });
            }
            else {
                reject(new Error('Error occured while fetching data , code : ' + res.statusCode));
            }
        });
    });
}
exports.getDataAsString = getDataAsString;
