### Create Lambda Function

Create function name 'summer-test-1'
Configuration with VPC (default)
Config ENV 
     * RDS_DATABASE
     * RDS_HOSTNAME
     * RDS_PASSWORD
     * RDS_PORT
     * RDS_USERNAME	
add triggers API Gateway

### Create API Gateway
* Create resource '/myapi'
* Create method post
* connect to lamdafunction name 'summer-test-1'

### Create Security group rules
* Add Inbound rules setting subnet 0.0.0.0/0 because my pc used this ip to connect DB

![securityg](https://ibb.co/p10xL48)

### Create RDS

* Create database name 'db-summer-1'
* Add Security group rules to default 
* Add IAM role
