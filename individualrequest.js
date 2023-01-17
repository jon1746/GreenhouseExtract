const https = require('https')
const fs = require('fs');
const {execSync} = require('child_process');
let rawdata = fs.readFileSync('Candidateids.json');
let candidates = JSON.parse(rawdata);
//console.log(candidates);




/*
//this is the call
request = https.get(options, function(res){
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

request.on('error', error => {
    console.error(error)
})

request.end()

*/



    var options = {
        host: 'harvest.greenhouse.io',
        port: 443,
        path: '/v1/candidates/' + candidates[i].CandidateID,
        // authentication headers
        headers: {
            'Authorization': 'Basic ' + new Buffer('717a599f84436a8c467378bdcbc2c639-4' + ':').toString('base64')
        }
    };

    request = https.get(options, function (res) {

      //  console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d);

        })
    })

    request.on('error', error => {
        console.error(error)
    })
    /*
        for (let j = 0; j < candidates[i].attachments.length; j++) {
            let candidate=candidates[i].attachments[j];
            //   console.log(candidate);
            let filename=candidate.filename;
            let url=candidate.url;

            console.log("url=",url);
            console.log("filename=",filename);


            https.get(url,(res) => {
                // Image will be stored at this path
                const path = filename;
                const filePath = fs.createWriteStream(path);
                res.pipe(filePath);
                filePath.on('finish',() => {
                    filePath.close();
                    console.log('Download Completed');
                })
            })



     */
}
