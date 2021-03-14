[![build](https://travis-ci.org/CSC-DevOps/TestSuites.svg?branch=master)](https://travis-ci.org/CSC-DevOps/TestSuites)

# Test Suites

## Setup

### Before you get started

Import this as a notebook or clone this repo locally. Also, ensure you [install latest version of docable](https://github.com/ottomatica/docable-notebooks/blob/master/docs/install.md)!

```bash
docable-server import https://github.com/CSC-DevOps/TestSuites
```

Ensure you have the jenkins image already pulled locally. We will use this image to take advantage of Java + Maven. If it is missing, you can run:

```
$ bakerx pull jenkins CSC-DevOps/Images#Spring2021 
```

Create virtual environment for workshop with a sync folder.

```bash
$ bakerx run
```

## Testing your setup

Inside the `simplecalc` directory, run `mvn test`. You should see test results. You can inspect the resulting files produced by the surefire plugin, in target/superfire-reports.

Stepping one directory back up from the simplecalc directory, run `npm install`, then `node main.js`.

You should see the printout of the test suite file:

```
{ name: 'testSum', time: '0.004', status: 'passed' }
{ name: 'testSlow', time: '0.007', status: 'passed' }
{ name: 'testFlaky', time: '10.715', status: 'passed' }
{ name: 'testMinus', time: '0.005', status: 'failed' }
{ name: 'testDivide', time: '0', status: 'passed' }
{ name: 'testDivideWillThrowExceptionWhenDivideOnZero',
  time: '0.001',
  status: 'passed' }
```

### Inspecting the Maven Test Report

```xml
  <testcase classname="com.github.stokito.unitTestExample.calculator.CalculatorTest" name="testSum" time="0.015"/>
  <testcase classname="com.github.stokito.unitTestExample.calculator.CalculatorTest" name="testFlaky" time="7.347"/>
  <testcase classname="com.github.stokito.unitTestExample.calculator.CalculatorTest" name="testMinus" time="0.016">
    <failure message="expected:&lt;0&gt; but was:&lt;4&gt;" type="junit.framework.AssertionFailedError">junit.framework.AssertionFailedError: expected:&lt;0&gt; but was:&lt;4&gt;
	at junit.framework.Assert.fail(Assert.java:57)
	at junit.framework.Assert.failNotEquals(Assert.java:329)
	at junit.framework.Assert.assertEquals(Assert.java:78)
	at junit.framework.Assert.assertEquals(Assert.java:234)
	at junit.framework.Assert.assertEquals(Assert.java:241)
	at com.github.stokito.unitTestExample.calculator.CalculatorTest.testMinus(CalculatorTest.java:45)
```

## Tasks

For the workshop, we will perform two tasks: 1) prioritization tests cases by print out in sorted order, and 2) automatically find the flaky test.

### Test prioritization

Print a ranked list of the test cases based on time to execute and test faiilure.

### Flaky tests

One of the tests is flaky. Extend the code to run `mvn test` several times (10--20), and each run, collection statistics about failing and passing tests. See if you can calculate a "flakyness" score for each test case.
