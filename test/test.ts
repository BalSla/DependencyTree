import { processCodeBlock } from "../src/deplistprocessor";
import { Assertion, Test, TestSuite, assertEqual, TestResult } from "./assertion";

const ts:TestSuite=new TestSuite()

let test1=function() {
    return assertEqual(processCodeBlock(""),"","List is not empty")
}

ts.suite.push(new Test( "Empty list", test1()))

ts.execute()



