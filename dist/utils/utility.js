"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitByIndex = void 0;
function splitByIndex(str, limit) {
    let firstPart = str.substring(0, limit);
    let secondPart = str.substring(limit, str.length);
    return {
        firstPart,
        secondPart
    };
}
exports.splitByIndex = splitByIndex;
