var express = require('express');
const multer = require('multer');
const {PythonShell} = require('python-shell');

var router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
});
var upload = multer({ storage: storage }).single('file');

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.post('/upload', function(req, res, next) {
    console.log('****************************************', req.file)
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }


        let options = {
            mode: 'text',
            pythonPath: '/Users/adarsh.pala/Library/Python/3.7/bin',
            // pythonPath: '/usr/bin/python3.7',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: '../recyclerModelTraining/',
            args: [req.file]
          };
        console.log('******************************here')
           
          PythonShell.run('recycler.py', options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results);
          });
        console.log('******************************here2')
        return res.status(200).send(req.file)
 })
});

module.exports = router;