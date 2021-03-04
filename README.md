# somebirds-product-images

> A replica of the Allbirds product detail page.
- https://www.allbirds.com/

Highlighted Technologies:
- React (hooks)
- Express
- PostgreSql
- Sequelize
- Jest
- Webpack
- AWS S3 + EC2
- New Relic (performance metrics)
- K6 (load testing)

## Table of Contents
1. [Getting Started](#getting)
2. [Setting up New-Relic](#relic)
3. [Stress Testing](#stress)
4. [Testing](#testing)
5. [Related Projects](#related)
6. [CRUD Operations](#crud)
7. [Amazon EC2 Instance Creation](#ec2)
8. [EC2 Environment Setup](#env)
9. [EC2 Service Install and Database Setup](#service)

<a name="getting"/>

## Getting Started
From within the root directory
```
npm install
```

- Add a cloudinaryKey.js file in the ./database/cloudinary folder.
- Sign up for a cloudinary account and add the information below.
- Make sure this file is gitignored.
```
// cloudinaryKey.js
module.exports = {
  cloud_name: 'name',
  api_key: 'key',
  api_secret: 'secret',
  api_env_var: 'environment variable',
};
```

- Add a unsplashKey.js file in the ./database/unsplash folder.
- Sign up for a unsplash account and add the information below.
- Make sure this file is gitignored.
```
// unsplashKey.js
module.exports = {
  accessKey: 'access key',
  secretKey: 'secret key'
};
```

Upload 1000 images to cloudinary
- Note: The unsplash API limits a max of 30 results per request and 50 requests per hour. (As of 2021 - in demo mode. Higher limits for production mode).
```
npm run uploadImages
```

If using PostgreSQL:
- Install PostgreSQL if not already installed
- Create a user named "postgres" if doesn't already exist
- Give user "postgres" superuser permissions if not already done:
```
=# CREATE USER postgres;
=# ALTER USER postgres WITH superuser;
```

create CSV file of data
```
npm run createCSV
```

Note: Update the absolute file path of the .csv file in database/psql/seedDB.sql

Create database, table and seed the table
```
npm run psql:seed
```
- CLI command: "psql imagegallery postgres" to log into postgreSql
- Note: To improve read time, create an index (modelId_index) on modelId column
- In PSQL enter: CREATE INDEX modelId_index ON "Images" ("modelId");


Start webpack
```
npm run build
```

Start express server
```
npm start
```
<a name="relic"/>

## Setting up New-Relic
Follow the directions here:
https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent

Make sure to gitignore newrelic.js

<a name="stress"/>

## Stress Testing
Install k6
```
brew install k6
```
Modify the vus and duration values as needed in the stressTestGet.js and stressTestPost.js files.
Then run:
```
k6 run k6/stressTestGet.js
or
k6 run k6/stressTestPost.js
```

<a name="testing"/>

## Testing
```
npm run test
```

## To view the service locally
```
http://localhost:3004/?prod=1

Replace the "1" with any number 1 - 10000000 (10 Million)
```

## Related Projects
- https://github.com/RPT24TurkishDelight/somebirdsColorAndSizeSelection
- https://github.com/RPT24TurkishDelight/somebirds-product-accordion
- https://github.com/RPT24TurkishDelight/somebirdsReviews
- https://github.com/RPT24TurkishDelight/somebirds-product-images-proxy

## CRUD Operations
### Create (POST) - Add a new image
#### Input
- The shoe id and the image url are provided. A new image record will be created in the database.
```
Endpoint: '/products/:shoeId/gallery'
Request body:
{imgUrl: 'The image url as a string'}
Note: The shoe id is provided as a request paramters through the endpoint
Request body example:
{imgUrl: "www.TESTFAKEURL.com"}
```
#### Output
- If successful, 200 status code.
- If error in db query, 400 status code.

### Read (GET) - Retrieve an existing image
#### Input
- The shoe id is provided. All the images in the database associated with that shoe id are returned.
```
Endpoint: '/products/:shoeId/gallery'
Request body: none
Note: The shoe id is provided as a request paramters through the endpoint
```
#### Output
```
Response example:
[
    "https://res.cloudinary.com/some-birds-images/image/upload/v1611641830/dreftkynpuxjqcjgski4.jpg",
    "https://res.cloudinary.com/some-birds-images/image/upload/v1611641843/i0w2szd7uc7yxzxcryd6.jpg",
    "https://res.cloudinary.com/some-birds-images/image/upload/v1611641842/w2kxko0drgzghe5kfwun.jpg",
    "https://res.cloudinary.com/some-birds-images/image/upload/v1611641823/bo8by9ycyeynhuqbqc5h.jpg"
]
```
- If successful, 200 status code.
- If error in db query, 400 status code.

### Update (PUT) - Update an existing image
#### Input
- The specific image id and image url are provided. The existing image associated with that image id is replaced with the provided url.
```
Endpoint: '/products/:shoeId/gallery'
Request body:
{imgId: A number representing image id,
 imgUrl: 'The image url as a string'}
Request body example:
{imgId: 2,
 imgUrl: 'www.TESTUPDATEURL.com'}
```
#### Output
- If successful, 200 status code.
- If error in db query, 400 status code.

### Delete (DELETE) - Delete an existing image
#### Input
- The specific image id is provided. The existing image record associated with that image id is deleted.
```
Endpoint: '/products/:shoeId/gallery'
Request body:
{imgId: A number representing image id}
Request body example:
{imgId: 2}
```
#### Output
- If successful, 200 status code.
- If error in db query, 400 status code.

<a name="ec2"/>

## Amazon EC2 Instance Creation

- Go to Amazon EC2 website and launch an instnace
- Select Ubuntu Server 18.04 LTS (HVM), SSD Volume Type (or you can do Amazon Linux but the installation steps below may not work)
- T2 micro (free tier)
- In "Add Storage" section, increase size to 30gb (free up to 30gb)
- In "Configure Security Group" section, update security-group-name
- After you click "Launch", use the drop-down and select "Create a new key pair" and give it a key pair name. Then click "download key pair"
- Click "Launch Instance"
- Create a directory and save the pem file downloaded earlier
- Make sure to gitignore "*.pem"
- In the instances list, change the name
- Click "connect" and under SSH client the instructions are given on how to connect to the instance
- Open a terminal and go to the directory with the .pem file and follow the instructions mentioned above to connect
- Go to security groups and click on your instance, edit inbound rules and then "add rule"
  - Type: All Traffic, Source: Anywhere

<a name="env"/>

## EC2 Environment Setup
General Tips: https://ubuntu.com/server/docs

- Install Node on Ubuntu EC2
  - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
  - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  - . ~/.nvm/nvm.sh
  - nvm install node
  - node -e "console.log('Running Node.js ' + process.version)"

- Install Git
  - Install git in your EC2 instance:
    sudo apt-get install git
  - Check git version:
    git version

- Install PSQL
  - https://medium.com/ruralscript/install-and-setuppostgresql-on-ubuntu-amazon-ec2-5d1af79b4fca
  - Install the package:
    sudo apt install postgresql postgresql-contrib

    (Note: The installation creates a user account postgres that is associated with the default Postgres role. We will log into this account to use Postgres.)
  - Validate the service:
    sudo service postgresql status
  - Connect to Postgres Server
    sudo -u postgres psql
  - \q - Terminate from session using
  - \l - List databases
  - \c <db name> - Connect to a database
  - \dt - List tables
  - \d <table name> - Table data
  - select * from "Images" where "modelId" = 1; - Example of a query

<a name="service"/>

## EC2 Service Install and Database Setup

- git clone https://github.com/nameOfRepo.git
- Essentially go through the "Getting started" section above with the comments mentioned below:
- Note: Use VIM to make changes in files (https://opensource.com/article/19/3/getting-started-vim)
  - vim <fileName> (to open a file)
  - :insert (to go into insert mode - will be in insert mode by default initially)
  - :wq (to save a file and quit vim)
- You probably don't need to upload 1000 images to cloudinary since it has most likely already been done
- Create the csv file
- Absolute file path should likely be: /home/ubuntu/somebirds-product-images/database/psql/images.csv

### Setting up connection to remote PSQL server and Seeding it
- In your EC2 database instance with PostgreSQL running:
  - Set a password for the postgres user and use MD5 authentication with the postgres user:
    - $ sudo -u postgres psql template1
    - ALTER USER postgres with encrypted password 'your_password';
    - sudo systemctl restart postgresql.service

  - sudo vim /etc/postgresql/10/main/pg_hba.conf
    - To allow connections from absolutely any address with password authentication add this line at the very bottom:
      - host    all             all             0.0.0.0/0               md5
    - Edit the user postgres :
      - local   all         postgres                          md5

  - sudo vim /etc/postgresql/10/main/postgresql.conf
  (Note: the "10" might be a differnet version. Verify the version)
    - Under connections and authentication change listen_addresses = '*'
      - (Note: make sure the above line is not commented out with a #)

  - Restart the PostgreSQL service to initialize the new configuration
    - $ sudo systemctl restart postgresql.service

- In your EC2 service package.json modify "psql:seed"
  - "psql:seed": "psql -h 54.215.213.219 -p 5432 -U postgres < ./database/psql/createDB.sql && node ./database/psql/index.js && time psql -h 54.215.213.219 -p 5432 -U postgres imagegallery < ./database/psql/seedDB.sql"
  - REMOTE HOST: Your db EC2 instance ip address (e.g. 54.215.213.219)
  - REMOTE PORT: Your db EC2 (by default: 5432)

- In your EC2 service ./database/psql/index.js
  - Modify the database connection host to the db EC2 instance ip address mentioned above and port if differnet from 5432
```
const sequelize = new Sequelize('imagegallery', 'postgres', 'your_password', {
  host: <REMOTE HOST>,
  dialect: 'postgres'
});
```

### Extras:
- How do I leave Node.js server on EC2 running forever?
  - https://stackoverflow.com/questions/26245942/how-do-i-leave-node-js-server-on-ec2-running-forever
