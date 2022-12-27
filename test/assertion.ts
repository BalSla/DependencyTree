export class Assertion {
    assertEqual(actual:string, expected:string, message?:string): boolean{
        return actual===expected;
    }
}

export function assertEqual (actual:string, expected:string, errorMessage?:string): TestResult {
    if (actual!=expected) {
        return new TestResult(false, actual, expected, errorMessage)
    }
    else
    {
        return new TestResult(true, actual, expected)
    }
}

export class Test {
    constructor(readonly name: string, readonly result: TestResult){
    }
}

export class TestResult {
    constructor (readonly success: boolean, readonly actual:string, readonly expected:string, readonly errorMessage?: string){}
}

export class TestSuite {
    readonly suite:Array<Test> = new Array<Test>()
    execute(){
        this.suite.forEach(element => {
            if (!element.result.success) {
                console.log(`${element.name} - ERROR: ${element.result.errorMessage} (Actual:${element.result.actual}, Expected:${element.result.expected})`)
            }
            else
            {
                console.log(`${element.name} - SUCCESS`)
            }
        });
    }
}

