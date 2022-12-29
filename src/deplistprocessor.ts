import { type } from "os";
import { exit } from "process";

export function processCodeBlock(codeBlock: string): string {
    const rows = codeBlock.split("\n").filter((row) => row.length > 0);
    let list = ""
    rows.forEach((row) => {
        let rowText: string = ""
        for (let index = 0; index < row.length; index++) {
            rowText += `${row.charCodeAt(index)},`
        }
        list += `${row}\n${rowText.substring(0, rowText.length - 1)}\n`
    })
    return list
}

abstract class Block {
    constructor(public x: number, public y: number) { }
}

abstract class TextBlock extends Block {
    constructor(public x: number, public y: number, readonly text: string) { super(x, y) }
}

class Rectangle extends TextBlock {
    constructor(public x: number, public y: number, readonly text: string) { super(x, y, text) }
}

export function prepareTree(source: string): Leaf[] {
    const tree: Leaf[] = new Array<Leaf>()
    const rows = source.split("\n")
    let branchStackPointer = -1
    let level = -1
    rows.forEach(row => {
        const rowLevel = getItemLevel(row)
        if (level == -1) {
            tree.push(new Leaf(rowLevel, getItemText(row), getItemType(row)))
            branchStackPointer = 0
            level = 0
        }
        else {
            if (level < rowLevel) {
                branchStackPointer = tree.length - 1
            }
            else {
                if (level > rowLevel) {
                    branchStackPointer = getLastAtLevel(rowLevel - 1)
                }
            }
            tree.push(new Leaf(rowLevel, getItemText(row), getItemType(row), tree[branchStackPointer]))
            level = rowLevel
        }
    }
    );
    return tree
}

export function extendTree (tree: Array<Leaf>) {

}

export function appendJoint(tree: Leaf[], leafIndex:number){
    const outLevel=tree[leafIndex].level+1
    const joint=new Leaf (tree[leafIndex].level+1,"",LeafType.joint, tree[leafIndex])
    for (let index = leafIndex+1; index < tree.length; index++) {
        const element = tree[index];
        if (element.text=="OR" || element.level!=outLevel) {
            break
        }
        element.level++
        substituteParent(element, tree[leafIndex], joint)
    }
    tree.splice(leafIndex+1, 0, joint)
}

export enum LeafType {
    leaf,
    joint,
    concentrator,
    sideeffect
}

export class Leaf {
    readonly parents: Leaf[] = new Array<Leaf>()
    constructor(public level: number, readonly text: string, readonly type: LeafType = LeafType.leaf, ...parents: Leaf[]) {
        this.parents = [...parents]
    }
    equalTo(arg:Leaf):boolean{
        return this.level==arg.level && this.text==arg.text && this.type==arg.type &&
         this.parents.length==arg.parents.length
    }
}

export function trimChars(argument: string, trimChar: string): string {
    let start = 0
    let end = argument.length
    for (let index = 0; index < argument.length; index++) {
        if (argument.charAt(index) == trimChar) {
            start++
        }
        else { break }
    }
    for (let index = argument.length - 1; index > 0; index--) {
        if (argument.charAt(index) == trimChar) {
            end--
        }
        else { break }
    }
    return argument.substring(start, end)
}
export function getItemText(row: string): string {
    return trimChars(row, `\t`).replace("- ", "")
}

/**
 * Returns the level within list (based on leading tabs).
 * @param row List item.
 */
export function getItemLevel(row: string): number {
    return row.lastIndexOf(`\t`) + 1
}

function getItemType(arg: string): LeafType {
    return LeafType.leaf
}

function getLastAtLevel(arg0: number): number {
    throw new Error("Function not implemented.");
}

export function substituteParent(element: Leaf, oldParent: Leaf, newParent: Leaf) {
    for (let index = 0; index < element.parents.length; index++) {
        let el = element.parents[index];
        if (el.equalTo(oldParent)) {
            element.parents[index] = newParent
            return
        }
    }
    throw new Error("Can not find parent to substitute!");
}

