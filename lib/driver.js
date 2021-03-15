var fs = require('fs'),
    xml2js = require('xml2js'),
    child  = require('child_process'),
    chalk = require('chalk');
var parser = new xml2js.Parser();
var Bluebird = require('bluebird')


function getTestReport(testdir) {
    // '/simplecalc/target/surefire-reports/TEST-com.github.stokito.unitTestExample.calculator.CalculatorTest.xml';

    let testReportBase = `${testdir}/target/surefire-reports/`;
    const files = fs.readdirSync(testReportBase);
 
    const filename = files.find((file) => {
      // return the first xml file in directory
      return file.includes('.xml');
    });

    console.log( chalk.green(`Found test report ${filename}`) );
    return filename;
}

async function calculateFlakyTests(testsuite_dir)
{
    
    try{

        let testReport = getTestReport(testsuite_dir);

        for( var i = 0; i < 20; i++ )
        {
            child.execSync('cd simplecalc && mvn test');

            var contents = fs.readFileSync(__dirname + testReport)
            let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
            var tests = readMavenXmlResults(xml2json);
            tests.forEach( e => console.log(i, e));
        }
    } catch(e) {
        console.log( chalk.red(`Error: Calculating flaky tests:\n`) + chalk.grey(e.stack));
    }
}

async function calculateTestPriority(testsuite_dir)
{
    let tests = [];

    try{
        let testReport = getTestReport(testsuite_dir);

        child.execSync('cd simplecalc && mvn test');
        var contents = fs.readFileSync(__dirname + testReport)
        let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
        tests = readMavenXmlResults(xml2json);
        tests.forEach( e => console.log(e));
    } catch(e) {
        console.log( chalk.red(`Error: Calculating priority of tests:\n`) + chalk.grey(e.stack));
    }

    return tests;
}

function readMavenXmlResults(result)
{
    var tests = [];
    for( var i = 0; i < result.testsuite['$'].tests; i++ )
    {
        var testcase = result.testsuite.testcase[i];
        
        tests.push({
        name:   testcase['$'].name, 
        time:   testcase['$'].time, 
        status: testcase.hasOwnProperty('failure') ? "failed": "passed"
        });
    }    
    return tests;
}

module.exports.calculateFlakyTests = calculateFlakyTests;
module.exports.calculateTestPriority = calculateTestPriority;