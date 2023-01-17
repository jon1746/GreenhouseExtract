
const https = require('https')

var options = {
    host: 'harvest.greenhouse.io',
    port: 443,
    path: '/v1/candidates/?per_page=500',
    // authentication headers
    headers: {
        'Authorization': 'Basic ' + new Buffer('717a599f84436a8c467378bdcbc2c639-4:').toString('base64')
    }
};

//this is the call
request = https.get(options, function(request){
    console.log(`statusCode: ${request.statusCode}`)

    request.on('data', d => {
        process.stdout.write(d)
    })
})

request.on('error', error => {
    console.error(error)
})

request.end()