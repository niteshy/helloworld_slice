/** @module lambda/datasource */
/*
eslint-disable no-console
*/
const stream = require('stream');
const logger = require('datacoral-utils-logger');

/**
 * @file
 * The interfaces implemented here will be invoked by the datacoral framework to extract data from
 * a datasource and upload it to s3.
 *
 * Ensure that the three functions together init(), getDataStream() and finalize() do not exceed
 * 5 minutes to complete execution. This limitation is necessary because the datasource execution
 * is happening inside a lambda. More importantly this ensures that we are dealing with micro
 * batches of data and makes data load operations a lot more manageable.
 */

/**
 * This function is invoked first for every lambda instance.
 *
 * Initialize any resources needed for the datasource such as database connections here and store
 * them inside the datasourceContext object. The datasourceContext object will be available to other
 * functions in the datasource lambda
 *
 *
 * @param {object} datasourceContext - Contains the lambda's eventParams (dynamic) and
 *                                     datasourceParams (static) parameters
 */
exports.init = function (datasourceContext, callback) {
  let tag = `datasource::init:`;
  logger.info(`${tag} Initializing datasource`);
  /******************************************************
                   YOUR CODE GOES HERE
  *******************************************************/
  logger.info(`${tag} Finished initialization`);
  callback(null, datasourceContext);
};

/**
 * This function is invoked once init() callback returns and the lambda is initialized.
 *
 * This is where all the work to collect data happens. Make the call to a SaaS API here or query a
 * database and create a readable stream. Return the readableStream in the callback. Currently only
 * JSON data is supported so ensure that the datastream contains properly formatted json data.
 *
 * Additionally if you want to capture the raw data (untransformed), return that also as a separate
 * stream with the callback.
 *
 *
 * @param {object} datasourceContext - Contains the lambda's eventParams (dynamic) and
 *                                     datasourceParams (static) parameters
 *
 */
exports.getDataStream = function (datasourceContext, callback) {
  let tag = `datasource::getDataStream:`;
  switch (datasourceContext.eventParams.loadunit) {
    case 'snapshot1':
      logger.info(`${tag} Creating a datastream for snapshots`);
      var dataStream = new stream.Readable();
      dataStream._read = function () {};
      var rawDataStream = new stream.Readable();
      rawDataStream._read = function () {};
      // Pipe data from external API into streams

      // once data is pushed, push null into stream to mark end of the data
      dataStream.push(null);
      rawDataStream.push(null);
      break;
    default:
      var msg = 'Unsupported loadunit';
      logger.error(tag, msg);
      return callback(new Error(msg));
  }
  callback(null, dataStream, rawDataStream);
};

/**
 * This function is invoked once the datastream has finished processing. Cleanup any resources
 * such as database or socket connections here. To use datacoral features like fanout or pagination
 * for more advanced usecases, you need to set a few parameters which indicate to the datacoral
 * framework that the lambda procesing should continue. The next section gives more specific details
 * about these parameters
 *
 * ### Pagination:
 * If you have to pull a lot of data within a lambda, then you will need to break down the fetching
 * phase into multiple pages. To break up the procesing into multiple pages and process each page
 * in a lambda, you need to set the following parameters within the finalize() method.
   - ```result.continueProcessing```
   If set to true, the framework will trigger the same lambda for the next page. Once all pages are
   processed, make sure it is set to false as not doing so may result in run-away lambda invocations
   - ```datasourceContext.eventParams.offsetValue```
   Used to pass information such as start-index, url, page offset etc about the next page. The
   subsequent lambda invocation can retrieve this value from event parameters and use it to process
   the next page
 *
 * ### Fanout:
 * For datasources where data is retrieved in two or more phases e.g in cases where you first call
 * an api endpoint to retrive the metadata and then call another endpoint with this metadata to get
 * the actual data, fanout it a useful feature. For example if you were calling a marketing API
 * to first determine the list of active user ids and then called another API to get information for
 * each of those ids, you can split the processing into two phases. In the first phase, a single
 * lambda runs and needs to set the following parameters.
   - ``datasourceContext.fanout``
   Set this to true to enable fanout processing for the lambda
   - ``datasourceContext.splits``
   Fetch all the ids that you need and save them in datasourceContext.splits as an array.
   The datacoral framework processes this array and triggers the same lambda once per split in the
   array. The lambda that is triggered can retrieve the value of the split from inside
   datasourceContext.eventParams.split and use that to continue processing. If there is no more
   fanout it should set datasourceContext.fanout to false and unset the splits to finish processing.
   If there is an additional level of nesting and more fanout is needed, then set
   datasourceContext.fanout to true and set datasourceContext.splits to hold the new splits.
   - ``datasourceContext.nextLoadUnit``
   Used to specify the next lambda that needs to be invoked after the fanout is complete
 *
 * @param {object} datasourceContext - Contains the lambda's event (dynamic) and deploy (static)
 *                                     parameters
 <pre><code>
  var exampleDatasourceContext =
   {
      eventParams: {}, //contains the payload with which the lambda is triggered
      datasourceParams: {}, //contains the parameters with which the lambda was deployed
   }
 </code></pre>
 * @param {object} result - pass metadata back to the executing framework about whether there is
                            more data to fetch
 */
exports.finalize = function (datasourceContext, result, callback) {
  let tag = `datasource::finalize:`;
  logger.info(`${tag} starting finalize`);
  result.continueProcessing = false;
  callback(null, result);
};
