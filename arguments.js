const https = require('https');
const fs = require('fs');
let candidateid= process.argv[2];
    var options = {
        host: 'harvest.greenhouse.io',
        port: 443,
        path: '/v1/candidates/' + candidateid,
        // authentication headers
        headers: {
            'Authorization': 'Basic ' + Buffer.from('717a599f84436a8c467378bdcbc2c639-4' + ':').toString('base64')
        }
    };
    request = https.get(options, function (request) {
        var body = '';
        request.on('data', function(chunk){
            body += chunk;
        });

        request.on('end', function(){
            var candidate = JSON.parse(body);
            id=candidate.id;
            first_name=candidate.first_name;
            last_name=candidate.last_name;
            filename=id+'.'+last_name + '.'+ first_name+ '.json';
            directory='./'+id+'.'+last_name + '.'+ first_name;
            fs.mkdir(directory, function(err) {
                if (err) {
                    console.log(err)
                } else {
                   // console.log("New directory successfully created.")
                }
            })
            saveCandidateData(directory,candidate,body);
            getAttachments(directory,candidate)
        })
        request.on('error', error => {
            console.error(error)
        })
    })


function getAttachments(directory,candidate) {

    for (let j = 0; j < candidate.attachments.length; j++) {
        let attachment = candidate.attachments[j];
        //   console.log(candidate);
        let filename = attachment.filename;
        let url = attachment.url;
        https.get(url, (res) => {
            // Image will be stored at this path
            const path = directory+'/'+filename;
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish', () => {
                filePath.close();
              //  console.log('Download Completed');
            })
        })


    }}
function saveCandidateData(directory, candidate,body){
        id=candidate.id;
        first_name=candidate.first_name;
        last_name=candidate.last_name;
        completefilename=directory + '/' +id+'.'+last_name + '.'+ first_name+ '.json';
        filePath = fs.createWriteStream(completefilename);
    fs.writeFile(completefilename, body, err => {
        if (err) {

            console.LOG.error(err);
            console.log(completefilename)
        }else {
            console.log('Saved:  '+ completefilename )
        }

    })
}







