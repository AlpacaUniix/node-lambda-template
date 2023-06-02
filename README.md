### Create Lambda Function

Write code in index.js to config env and add function create database to and check data base to inserTable

1. Create function name 'summer-test-1'
<img src="image/AWSlambda.png">

2. Configuration with VPC (default)
<img src="image/VpcLambda.png">

3. Config ENV 
     * RDS_DATABASE
     * RDS_HOSTNAME
     * RDS_PASSWORD
     * RDS_PORT
     * RDS_USERNAME	
<img src="image/ConfigLambda.png">

4. add triggers API Gateway


### Create API Gateway
* Create resource '/myapi'
* Create method post
* connect to lamdafunction name 'summer-test-1'
<img src="image/APIGateway.png">

### Create Security group rules
* Add Inbound rules setting subnet 0.0.0.0/0 because my pc used this ip to connect DB
<img src="image/SecurityGroups.png">
<img src="image/YoutVPC.png">

### Create RDS

* Create database name 'db-summer-1'
* Add Security group rules to default 
* Add IAM role

<img src="image/ConfigRDS.png">