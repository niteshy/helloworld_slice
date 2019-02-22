
const tag = 'ds-lambda';

const datasource = require('./datasource');
const logger = require('datacoral-utils-logger');
const debug = require('debug')(tag);

/**
 * @file
 * The entry point into the lambda function invoked by the datasource framework.
 */

/**
 * This function is called by the datacoral datasource framework when an event
 * from a configured source (kinesis for datasource/slice) is emitted
 *
 * Control is passed to the datacoral framework which handles triggered event
 * and does the initialization and invoke the datasource init method
 * In this method, we will suppose to initialize the resources or any
 * preprocessing required before pulling the data from the source.
 *
 *
 * @param {object} datasourceContext contain raw event that the lambda was triggered with
 * @param {object} lambdaContext Context object which contains metadata about the lambda execution
 */
exports.init = function (datasourceContext, lambdaContext, callback) {
  let tag = `ds-lambda::init:`;
  logger.info(`${tag} Start:`);
  debug(`${tag} datasourceContext = `, datasourceContext);
  debug(`${tag} lambdaContext = `, lambdaContext);
  datasource.init(datasourceContext, callback);
};

/**
 * This function is called by the datacoral datasource framework when init is
 * finished and framework pass the control back to datasource to fetch the data
 * from the source.
 *
 * @param {object} datasourceContext contain raw event that the lambda was triggered with
 * @param {object} lambdaContext Context object which contains metadata about the lambda execution
 */
exports.getDataStream = function (datasourceContext, lambdaContext, callback) {
  let tag = `ds-lambda::getDataStream:`;
  logger.info(`${tag} Start:`);
  debug(`${tag} datasourceContext = `, datasourceContext);
  debug(`${tag} lambdaContext = `, lambdaContext);
  datasource.getDataStream(datasourceContext, callback);
};

/**
 * This function is called by the datacoral datasource framework when streams
 * processing is done by the framework or timeout.
 *
 * In this method, cleanup all the resource which are created and set the
 * corresponding parameters for futher processing in the next lambda.
 *
 * @param {object} datasourceContext contain raw event that the lambda was triggered with
 * @param {object} lambdaContext Context object which contains metadata about the lambda execution
 */
exports.finalize = function (datasourceContext, lambdaContext, result, callback) {
  let tag = `ds-lambda::finalize:`;
  logger.info(`${tag} Start:`);
  debug(`${tag} datasourceContext = `, datasourceContext);
  debug(`${tag} lambdaContext = `, lambdaContext);
  datasource.finalize(datasourceContext, result, callback);
};
