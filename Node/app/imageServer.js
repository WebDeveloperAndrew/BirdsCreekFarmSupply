module.exports = function(app, express) {
    /*logging setup
    "none": no logs
    "runtime": status/error logs
    "debug": full logs
    */
    const logging = "runtime";

    const shortid = require('shortid');
    const fs = require('fs');
    const mime = require('mime-types');
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
        if (logging === "debug") { 
          console.log('image uploaded to: /api/imageserver/'+req.file.filename);
        }
        if(req.body.oldimage)  
          deleteImage(req.body.oldimage);
        if (logging != "none")
        {
          console.log({'image':'/api/imageserver/'+req.file.filename, 'filename': req.file.filename});
        }
        res.send({'image':'/api/imageserver/'+req.file.filename, 'filename': req.file.filename});
      });

    function deleteImage(image)
    {
      fs.unlink('./images/' + image ,function(err){
            if(err) {if (logging !="none"){console.log(err);}}
            if (logging === "debug") { 
              console.log(image + ' deleted successfully');
            }
      });  
    }
}

