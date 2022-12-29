import { processCodeBlock, prepareTree, Leaf, LeafType, appendJoint } from "../src/deplistprocessor";
import { Test, TestSuite, assertEqual, assertNotEqual,assertObjectsValueEqual } from "./assertion";

const ts: TestSuite = new TestSuite()

ts.execute(
    new Test("List normalization", () => {
        const i1l = new Leaf(0, "i1")
        const i2l = new Leaf(1, "i2", LeafType.leaf, i1l)
        const i3l = new Leaf(1, "i3", LeafType.leaf, i1l)
        const output=prepareTree(`- i1\n\t- i2\n\t- i3`)
        // console.log(output[2])
        // console.log(i3l)
        //return assertObjectsValueEqual(output[0],i1l)
        // return assertObjectsValueEqual(output[1],i2l)
        // return assertObjectsValueEqual(output[2],i3l)
        return assertObjectsValueEqual(output, new Array<Leaf>(i1l, i2l, i3l))
    }),
    new Test("Append JOINT", () =>{
        const i1l = new Leaf(0, "i1")
        const i2l = new Leaf(1, "i2", LeafType.leaf, i1l)
        const i3l = new Leaf(1, "i3", LeafType.leaf, i1l)
        const tree= new Array<Leaf>(i1l,i2l,i3l)
        appendJoint(tree, 0)
        // console.log(JSON.stringify(tree))
        const ni1l = new Leaf(0, "i1")
        const njoint = new Leaf(1,"",LeafType.joint, i1l)
        const ni2l = new Leaf(2, "i2", LeafType.leaf, njoint)
        const ni3l = new Leaf(2, "i3", LeafType.leaf, njoint)
        return assertObjectsValueEqual(tree, new Array<Leaf>(ni1l,njoint,ni2l,ni3l))
    })
)

ts.execute()



