## Datasource description

### DESCRIPTION
Datasource description

### Loadunits:
List of datasource loadunits

### Restrictions:
Datasouce limitations

### PREREQUISITES
Datasource prerequisites

### INPUT PARAMETERS
To get a the starting template save the output of the `describe --input-parameters` command as follows:
	
    datacoral collect describe --slice-type helloworld \
    --input-parameters > helloworld_parameters_file.json

#### Necessary input parameters:
List of necessary parameters 
 
#### Optional input parameters:
List of optional parameters

#### Example template:
```
{
	"sliceName": "helloworld",
	"username": "test",
	"secretKey": "test_pass",
	"schedule": "0 1 * * *",
	"loadunits": {
	  "loadunit1": {
      "executionMode": "incremental",
      "schedule": "0 2 * * *"
		},
    "loadunit2": {
      "executionMode": "snapshot",
      "pageSortCol": "id"
    }
  }
}
```

### OUTPUT
S3:
  
  `s3//:installation_name.datacoral/<sliceName>`

Redshift:
    
  `Schema - <sliceName>`
