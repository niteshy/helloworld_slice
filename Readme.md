## Datasource Helloworld Slice

## Description
This is an example datasource slice ``Helloworld``, which is used as demo for datasouce slice development cycle.

Slice developer need to provide an interface for following operations:

- init: In init or preprocessing stub, whenever we need to implement the pre-processing steps like database connections creation, counter etc.
- getDataStream: This is the method, where datasource extract the data from source and write to an output stream.
- finalize: In the finalize stub, we should cleanup the resources and store the metadata for the data processing.

Depending upon the slice, each of these method have different implementation.

Above interface will be used the datacoral framework to run these stub inside the lambda and capture meta-data, record book-keeping etc.

## Directory structure

The following directory structure should be followed for slice code.

```
slice
|- ds-lambda/
|- boostrap-lambda/
|- conf/
|- sample-params/
|- test/
```
- ``ds-lambda`` contains logic for how to fetch data from the datasource. This will be executed inside lambda.
- ``bootstrap-lambda`` contain implementation of how to setup the slice configuration. This will be executed inside bootstrap lambda
- ``conf`` contains pre-requisite set of configuration metadata for slice
- ``sample-params`` contain sample of configuration for the slice
- ``test`` contain the unit-test for testing the stub methods implementation locally.


## Workflow

Slice developer need to provide the implementation of the stub methods and unit-test for validating the data.

We can run the unit-test locally using flow using following command.
```
$ npm install
$ npm test
```
When the implementation is finished, they need to push the artifact to s3 for the slice using the following grunt commands:

```
$ npm install
$ ./node_modules/grunt/bin/grunt --DATACORAL_ENV=dev
```

Once the standalone artifact is release, we can publish the  bundled (framework + standalone) artifact to s3. Which will be used to deploy on the given installation.

