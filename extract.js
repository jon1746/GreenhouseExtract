'use strict';

const fs = require('fs');
const https = require('https');
let rawdata = fs.readFileSync('TrexinCandiates.json');
let candidates = JSON.parse(rawdata);

console.log(candidates.length);
//console.log(candidates[0].attachments[0].url);


for (let i = 0; i < candidates.length; i++) {
 //   console.log(candidates[i].attachments.length);

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







    }
}
