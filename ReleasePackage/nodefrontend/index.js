const express = require('express');
const path = require('path');
const app = express();

const staticRoot = __dirname + 'website';

const port = process.env.PORT || 8080;
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.jpg',
    '.pdf',
];

app.get('/*', function(req, res, next) {
    if ((req.headers.host.match(/^www/) !== null ) || (req.headers.host.match(/com/) !== null )) {
      console.log('Redirect');
      res.redirect('https://' + process.env.WEBSITE + req.url);
    } else {
      next();     
    }
  });
app.get('*', (req,res) => {
    if(req.path === '/sitemap')
    {
        console.log(staticRoot +'/'+ req.get('host') + '/sitemap.xml');
        res.sendFile(staticRoot +'/'+ req.get('host') + '/sitemap.xml');
    }
    else
    {
        if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            console.info("Sending file "+staticRoot + req.url);
            res.sendFile(path.resolve(staticRoot + req.url.replace('?v=4.7.0','')));
        } 
        else {
            console.info("Sending app "+staticRoot+"/index.html");
            res.sendFile(path.resolve(staticRoot + '/index.html'));
        }
    }
});

app.listen(port, () => console.info('Node serving app listening on port '+port+'!'));