const https = require('https');
console.log(process.argv[2]);
const fs = require('fs');
let candidateid= process.argv[2];

    var options = {
        host: 'harvest.greenhouse.io',
        port: 443,
        path: '/v1/candidates/' + candidateid,
        // authentication headers
        headers: {
            'Authorization': 'Basic ' + new Buffer('717a599f84436a8c467378bdcbc2c639-4' + ':').toString('base64')
        }
    };
    request = https.get(options, function (request) {
        console.log(`statusCode: ${request.statusCode}`)
        var body = '';

        request.on('data', function(chunk){
            body += chunk;
        });

        request.on('end', function(){
            var candidate = JSON.parse(body);
            console.log("Got a response: ", candidate);
            getAttachments(candidate)
        })
        request.on('error', error => {
            console.error(error)
        })
    })


function getAttachments(candidate) {

    for (let j = 0; j < candidate.attachments.length; j++) {
        let attachment = candidate.attachments[j];
        //   console.log(candidate);
        let filename = attachment.filename;
        let url = attachment.url;

        console.log("url=", url);
        console.log("filename=", filename);


        https.get(url, (res) => {
            // Image will be stored at this path
            const path = filename;
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish', () => {
                filePath.close();
                console.log('Download Completed');
            })
        })


    }}
