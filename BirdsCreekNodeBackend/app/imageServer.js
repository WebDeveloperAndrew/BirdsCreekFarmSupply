module.exports = function(app, express) {
    const shortid = require('shortid');
    const fs = require('fs');
    const mime = require('mime-types');
    
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    app.use('/api/imageserver', express.static('./images'));
    var multer  = require('multer');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './images')
        },
        filename: function (req, file, cb) {
          cb(null, shortid.generate() + '.' + mime.extension(file.mimetype))
        }
      })
      const upload = multer({storage: storage})
      app.post('/api/imageserver/upload', upload.single('image'), function(req,res){
        console.log('image uploaded to: /api/imageserver/'+req.file.filename);
        if(req.body.oldimage)  
          deleteImage(req.body.oldimage);
        res.send({'image':'/api/imageserver/'+req.file.filename, 'filename': req.file.filename});
      });

    function deleteImage(image)
    {
      fs.unlink('./images/' + image ,function(err){
            if(err) return console.log(err);
            console.log(image + ' deleted successfully');
      });  
    }
}

