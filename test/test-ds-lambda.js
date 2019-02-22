
const debug = require('debug')('test-index');
const expect = require('chai').expect;
const logger = require('datacoral-utils-logger');
const dsLambda = require('../ds-lambda/index');

const tag = 'test-ds-lambda:: ';

describe('Test suite for ds-lambda', () => {
  process.env.AWS_REGION = 'us-west-2';

  let MINUTE = 60 * 1000;
  let LAMBDA_TIMEOUT = 5 * MINUTE;
  let lambdaContext = {
    done: function () {
      logger.info(tag + 'Finished!');
    },
    getRemainingTimeInMillis: function () {
      return 1 * MINUTE;
    }
  };

  describe('testing ds-lambda positive workflow', () => {
    let installationName = 'secure';
    let sliceName = 'helloworld1';
    let triggeredLoadunit = 'snapshot1';
    let datasourceContext = {
      eventParams: {
        installationName   : installationName,
        datasourceId: sliceName,
        loadunit: triggeredLoadunit,
        startTimestamp: '2018-07-11 09:00 +00:00',
        endTimestamp  : '2018-07-11 10:00 +00:00',
        useEndTimestamp: false,
        offset: 0,
        recordCount: 0,
        timelabel: 2018071109000000
      },
      datasourceParams: {
        datasourceId: sliceName,
        schedule    : '0 0 * * *',
        loadunits: {
          snapshot1: {
            schemaName: 'public',
            tableName: 'snapshot1'
          }
        }
      }
    };
    it(`testing ds-lambda.init with simple params`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      dsLambda.init(datasourceContext, lambdaContext, done);
    });

    it(`testing ds-lambda.getDataStream`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      dsLambda.getDataStream(datasourceContext, lambdaContext, done);
      //TODO: Add more assertation for data validation
    });

    it(`testing ds-lambda.finalize`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      let result = {};
      dsLambda.finalize(datasourceContext, lambdaContext, result, done);
      //TODO: Add more assertation for data validation
    });
  });

  describe('testing ds-lambda megative workflow, with unsupported loadunit', () => {
    let installationName = 'secure';
    let sliceName = 'helloworld1';
    let triggeredLoadunit = 'unsupported';
    let datasourceContext = {
      eventParams: {
        installationName   : installationName,
        datasourceId: sliceName,
        loadunit: triggeredLoadunit,
        startTimestamp: '2018-07-11 09:00 +00:00',
        endTimestamp  : '2018-07-11 10:00 +00:00',
        useEndTimestamp: false,
        offset: 0,
        recordCount: 0,
        timelabel: 2018071109000000
      },
      datasourceParams: {
        datasourceId: sliceName,
        schedule    : '0 0 * * *',
        loadunits: {
          snapshot1: {
            schemaName: 'public',
            tableName: 'snapshot1'
          }
        }
      }
    };
    it(`testing ds-lambda.init with invalid loadunit params`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      dsLambda.init(datasourceContext, lambdaContext, done);
    });

    it(`testing ds-lambda.getDataStream with invalid loadunit params`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      dsLambda.getDataStream(datasourceContext, lambdaContext,
       function (err, result) {
        if (err) {
          logger.error(tag + `error - `, err);
          done();
        } else {
          done(new Error('negative cased passed'));
        }
      });
    });

    it(`testing ds-lambda.finalize with invalid loadunit params`, function (done) {
      this.timeout(LAMBDA_TIMEOUT);
      let result = {};
      dsLambda.finalize(datasourceContext, lambdaContext, result, done);
    });
  });

});

