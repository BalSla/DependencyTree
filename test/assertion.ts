import isEqual from 'lodash.isequal'

export function assertEqual<T>(actual: T, expected: T, errorMessage: string="Values are not equal!"): TestResult<T> {
    if (actual != expected) {
        return new TestResult(false, actual, expected, errorMessage)
    }
    else {
        return new TestResult(true, actual, expected)
    }
}

export function assertNotEqual<T>(actual: T, expected: T, errorMessage: string="Values are equal!"): TestResult<T> {
    if (actual === expected) {
        return new TestResult(false, actual, expected, errorMessage)
    }
    else {
        return new TestResult(true, actual, expected)
    }
}

export class TestResult<T> {
    constructor(readonly success: boolean, readonly actual: T,
        readonly expected: T, readonly errorMessage?: string) { }
}

interface ITest{
    name:string
    execute:() => TestResult<any>
}

export class Test<T> implements ITest {
    constructor (readonly name:string, readonly execute:()=> TestResult<T>){}
}

export class TestSuite {
    execute(...tests: ITest[]){
        tests.forEach(element => {
            let result=element.execute()
            if (!result.success) {
                console.log(`${element.name} - ERROR: ${result.errorMessage} (Actual:${result.actual}, Expected:${result.expected})`)
            }
            else
            {
                console.log(`${element.name} - SUCCESS`)
            }
        });
    }
}

export function assertObjectsValueEqual<T>(arg1:T, arg2:T, errorMessage?:string):TestResult<T>{
    if (!isEqual(arg1, arg2)){
        return new TestResult(false, arg1, arg2, errorMessage)
    }
    else {
        return new TestResult(true,  arg1, arg2)
    }
}