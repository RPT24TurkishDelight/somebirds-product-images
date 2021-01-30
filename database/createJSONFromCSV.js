const csvtojson = require('csvtojson');

//Read CSV file using csvtojson or fast-csv module

csvtojson()
  .fromFile('/Users/sunitmody/Documents/RPT-24/rpt24-sdc/somebirds-product-images/database/images.csv')
  .then(csvData => {
    console.log(csvData);
  })

//Import CSV data to MongoDB Database using mongodb module