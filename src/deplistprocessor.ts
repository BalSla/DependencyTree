export function processCodeBlock(codeBlock: string): string {
    const rows = codeBlock.split("\n").filter((row) => row.length > 0);
    let list=""
    rows.forEach((row)=> {
        // let rowText:string=""
        // for (let index = 0; index < row.length; index++) {
        //     rowText+=`${row.charCodeAt(index)},`
        // }
        // list+=`${row}\n${rowText.substring(0,rowText.length-1)}\n`
    })
    return list
}

function blockFactory(listitem: string): Rectangle {
    return new Rectangle
}

abstract class Block {
    x:number
    y:number
}

abstract class TextBlock extends Block {
    text:string
}

class Rectangle extends TextBlock {
    constructor(x:number,y:number, text:string){
        this.text=text
        this.x=x
        this.y=y
    }
}