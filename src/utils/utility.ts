
export interface SplitResult {
    firstPart : string,
    secondPart : string
}

export function splitByIndex(str : string , limit : number) : SplitResult {
    let firstPart = str.substring(0,limit)
    let secondPart = str.substring(limit,str.length)

    return {
        firstPart,
        secondPart
    }
}