const fs = require('fs');

fs.readFile('./tests/testCSV.csv', 'utf8', (err, data) => {
  if (err) throw err;

  let arr = data.split('\n')
  let firstModelId = arr[1][0];
  let lastModelId = arr[arr.length - 2][0];

  let lastUrl = arr[arr.length - 2].split(',')[1]

  //console.log(data);
  //console.log(arr);
  console.log(firstModelId === '1');
  console.log(lastModelId);
  console.log(lastUrl);


  // expect(firstModelId).toEqual('1');
  // expect(firstModelId).toEqual('10');
  // expect(lastUrl).toBeOneOf(urlList);
});