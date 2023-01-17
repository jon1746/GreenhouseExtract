'use strict';

const fs = require('fs');
const https = require('https');
let rawdata = fs.readFileSync('17889073004.json');
let candidate = JSON.parse(rawdata);

console.log(candidate.length);
console.log(candidate.attachments[0].url);



    for (let j = 0; j < candidate.attachments.length; j++) {
        let attachment=candidate.attachments[j];
        //   console.log(candidate);
        let filename=attachment.filename;
        let url=attachment.url;

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
