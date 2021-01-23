# somebirds-product-images

> A replica of the Allbirds product detail page.
- https://www.allbirds.com/

Highlighted Technologies: React, Express, MySQL, Sequelize, Jest, Webpack, AWS S3 + EC2

## Table of Contents
1. [Getting Started](#Getting)
2. [Testing](#Testing)
3. [Related Projects](#Related)
4. [CRUD Operations](#CRUD)

## Getting Started
From within the root directory
```
npm install
```

Seed the database
```
npm run db:seed
```

Start webpack
```
npm run build
```

Start express server
```
npm start
```

## Testing
```
npm run test
```

## Related Projects
https://github.com/RPT24TurkishDelight/somebirdsColorAndSizeSelection
https://github.com/RPT24TurkishDelight/somebirds-product-accordion
https://github.com/RPT24TurkishDelight/somebirdsReviews
https://github.com/RPT24TurkishDelight/somebirds-product-images-proxy

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
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined",
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined",
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined",
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined",
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined",
    "https://sb-gallery1.s3-us-west-1.amazonaws.com/undefined"
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