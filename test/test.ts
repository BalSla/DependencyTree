import { processCodeBlock } from "../src/deplistprocessor";
import { Test, TestSuite, assertEqual} from "./assertion";

const ts:TestSuite=new TestSuite()

const EmptyList_Test=function() {
    return assertEqual(processCodeBlock(""),"","List is not empty")
}

const SimpleList_Test=function() {
    return assertEqual(processCodeBlock("- Root\n\t-subitem"),"- Root\n\t-subitem","List is not equal")
}

ts.suite.push(
    new Test( "Empty list", EmptyList_Test()),
    new Test( "SimpleList", SimpleList_Test()),
)

ts.execute()



