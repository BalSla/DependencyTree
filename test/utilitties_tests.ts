import { trimChars,getItemText, getItemLevel, Leaf, LeafType, substituteParent } from "../src/deplistprocessor";
import { Test, TestSuite, assertEqual, assertNotEqual,assertObjectsValueEqual } from "./assertion";

const ts: TestSuite = new TestSuite()

ts.execute(
    new Test("Trim symbols from left and right", () => {
        return assertEqual(trimChars("aaqweratyaaaa", "a"), "qweraty")
    }),
    new Test("Trim symbols from left", () => {
        return assertEqual(trimChars("aaqweraty", "a"), "qweraty")
    }),
    new Test("Trim symbols from right", () => {
        return assertEqual(trimChars("qweratyaa", "a"), "qweraty")
    }),
    new Test("Get text from list item", () => {
        return assertEqual(getItemText(`\t\t- item with - leading symbol`), "item with - leading symbol")
    }),
    new Test ("Get item level", ()=>{
        return assertEqual(getItemLevel(`\t\t- item`), 2)
    }),
    new Test ("Substitute parent", () => {
        const a = new Leaf(0,"old",LeafType.leaf)
        const b = new Leaf(0,"2",LeafType.leaf, a)
        const c = new Leaf(0,"new",LeafType.leaf)
        substituteParent(b,a,c)
        console.log(JSON.stringify(b))
        return assertObjectsValueEqual(b.parents[0], c)
    })
)

ts.execute()



