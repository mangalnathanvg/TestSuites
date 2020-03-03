[![build](https://travis-ci.org/CSC-DevOps/TestSuites.svg?branch=master)](https://travis-ci.org/CSC-DevOps/TestSuites)

# Test Suites

## Before you start

```
$ bakerx --version
bakerx@0.6.9
virtcrud@09a885c
```

Download an image with node.js/Java installed. If you do not have the Jenkins image locally, we can use jenkins image from Github Releases.

```
$ bakerx pull CSC-DevOps/Images#Spring2020 jenkins
```

Create virtual environment for workshop with a sync folder.

```bash
$ bakerx run testsuite jenkins --ip 192.168.44.60 --memory 2048 --sync
```

Inside your virtual environment (`bakerx ssh testsuite`), install maven.

```bash
$ sudo apt-get update
$ sudo apt install maven -y
$ mvn --version
```

### Hack to enable symlinks inside VM:

Inside a terminal, run:
```
$ VBoxManage setextradata "testsuite" VBoxInternal2/SharedFoldersEnableSymlinksCreate/vbox-share-0 1
# Stop VM
$ VBoxManage controlvm testsuite poweroff soft
# Start up again.
$ bakerx run testsuite jenkins --ip 192.168.44.60 --memory 2048 --sync
```

Another [workaround](https://stackoverflow.com/c/ncsu/a/1023/1) to consider.

## Testing setup

Inside the simplecalc directory, run `mvn test`. You should see test results. You can inspect the resulting files produced by the surefire plugin, in target/superfire-reports.

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

## Tasks

For the workshop, we will perform two tasks: 1) prioritization tests cases by print out in sorted order, and 2) automatically find the flaky test.

### Test prioritization

Print a ranked list of the test cases based on test to execute and test faiilure.

### Flaky tests

One of the tests is flaky. Extend the code to run `mvn test` several times (10--20), and each run, collection statistics about failing and passing tests. See if you can calculate a "flakyness" score for each test case.
