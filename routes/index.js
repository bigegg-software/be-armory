var fs = require('fs');
var express = require('express');
var tempfile = require('tempfile');
var router = express.Router();

const SdEdit = require('sdedit').SdEdit;
// const sdFile = '/Users/xiaopingfeng/workspace/armory/test.sd';
// new SdEdit(['-o', '/Users/xiaopingfeng/workspace/armory/test.png', '-t', 'png', sdFile])
//     .run()

/* GET home page. */
router.post('/sdedit', function (req, res, next) {
    let sd = req.body.sd;
    let file = tempfile('.png');
    let sdFile = tempfile('.sd');

    // sd = 'user:actor\n' +
    //     'stryker:Stryker[a]\n' +
    //     '\n' +
    //     'user:stryker.runMutationTest(options)\n';

    fs.writeFileSync(sdFile, sd);
    console.log('sd', sd, file);
    new SdEdit(['-o', file, '-t', 'png', sdFile])
        .run()

    let resultFile = fs.createReadStream(file);
    resultFile.on('end', function () {
        fs.unlinkSync(sdFile);
        fs.unlinkSync(file);
    });
    resultFile.pipe(res);
});

module.exports = router;
