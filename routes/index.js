var express = require('express');
var router = express.Router();
const { exec } = require('child_process');

// Post request made by universal search to this api to return a files permissions groups
router.post('/', function(req, res, next) {
    //Target drive file exists in is provided in request body as "source"
    let drive = req.body.source;
    exec(`Get-Acl "${drive}" | select access | % { $_.Access } | ConvertTo-Json`, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
        //Return files permission groups to universal search
        return res.json({ message: stdout })
    })
});



module.exports = router;