/** @module bootstrap/configurator */

/**
 * @file
 * The bootstrap configurator is optional for a datasource and is an advanced feature. Generally
 * some datasources have a static list of parameters such as the loadunit/table list and their
 * schemas that can be provided beforehand as they do not change. But for other datasources this
 * information can be inferred from the datasource itself. e.g. In a database, you can determine the
 * list of tables that need to be synced along with their schemas by querying the db itself.
 * Similarly for SaaS datasources which expose object metadata via API endpoints, you can call the
 * API and get the metadata of the objects.
 */

/**
 * This function is invoked during the deployment process of a datasource slice, Use this function
 * to get the metadata about the datasource that will be used to create redshift artefacts.Once this
 * metadata is obtained, you can construct the DDL statements that will be used to create the
 * necessary redshift schemas and the tables for the datasource slice. Note that the convention
 * followed by datacoral is to have the schema name be the same as the datasourceId specified in
 * deployParams.js. The tablenames are the names of the loadunits specified in deployParams.js
 *
 * Once all the DDLs have been generated, store them in deployEnv.datasource.redshiftDDLs and invoke
 * the callback. The datacoral deployment framework will take care of running the statements in your
 * redshift cluster. Note that the statements will be executed as the datacoral user. So you will
 * need to grant privileges on those schemas, tables to other users that need to access them.

<pre><code>
 var exampleDeployEnv =
 {
   "disableBootstrap": true,
   "parentVPC": "vpc-0c9c1234",
   "parentSubNet": "subnet-22d65678",
   "datasource": {
     "type": "helloworld",
     "id": "helloworld",
     "inputParams": <DEPLOY_PARAMS>
   },
   "awsRegion": "us-west-2",
   "awsZone": "us-west-2a",
   "crossRoleArn": "<DEPLOYMENT_ROLE_ARN>
   "installationName": "sampleInstallation",
   "s3DataBucket": "sampleInstallation.datacoral",
   "tagName": "datacoral",
   "slice": "datacoral-slice-datasource-helloworld",
   "localDeploy": true,
   "sliceVersion": "1.0.0",
   "crossRoleArnPresent": true,
   "basePath": "/some/path",
   "dataSourceId": "helloworld",
   "runtimeConfigParams": {Same as inputParams in deployParams.js>},
   "loaderConfigParams": { <Same as deployParams.js> },
   "connectionInfoParams": {
     "RSClusterEndPoint": "<REDSHIFT CLUSTER ENDPOINT>
     "RSClusterDBPort": "5439",
     "RSClusterDB": "<REDSHIFT_DB_NAME>",
     "copyCreds": "<REDSHIFT_COPY_ROLE_ARN>",
     "RSClusterDBUser": "redhift_user",
     "RSClusterDBPass": "redshift_password"
   },
   "AWS": <AWS SERVICE INSTANCE>,
 }
 </code></pre>
 *
 * @param {object} deployEnv Contains the static configuration parameters of the datasource lambda
 *                           that were specified in deployParams.js. Also includes other parameters
 *                           specific to the deployment such as the installatioName, the awsRegion
 *                           in which the datasource slice is being deployed etc. Parameters
 *                           specific to the datasource such as database credentials can be looked
 *                           up from here.
 */
exports.performBootstrap = function (deployEnv, callback) {
  callback(null);
};
