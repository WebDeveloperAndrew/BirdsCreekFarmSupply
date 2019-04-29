module.exports = function (app) {

  /*logging setup
  "none": no logs
  "runtime": status/error logs
  "debug": full logs
  */
  const logging = "runtime";

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var dburl = process.env.MONGO_URI;


  var fs = require("fs");
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  var settings;
  const config = {
    autoIndex: false,
    useNewUrlParser: true,
  };
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.connect(dburl, config);

  var productSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    info: { type: String, required: false },
    price: { type: Number, required: false },
    brand: { type: String, default: 'none' }
  }, { collection: 'products' });

  var brandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    info: { type: String, required: false },
    link: { type: String, required: true }
  }, { collection: 'brands' });

  getSettings();
  var brand = mongoose.model('brand', brandSchema);
  var product = mongoose.model('product', productSchema);

  app.post('/api/createproduct', createProduct);
  app.post('/api/getproduct', getProduct);
  app.post('/api/updateproduct', updateProduct);
  app.post('/api/searchproduct', searchProduct);
  app.post('/api/deletedatabase', deleteDatabase);
  app.post('/api/deleteproduct', deleteProduct);
  app.post('/api/deletebrand', deleteBrand);
  app.post('/api/searchbrand', searchBrand);
  app.post('/api/getbrand', getBrand);
  app.post('/api/createbrand', createBrand);
  app.post('/api/updatebrand', updateBrand);
  app.get('/api/gethomesettings', getHomeSettings);
  app.post('/api/sethomesettings', setHomeSettings);
  app.get('/api/getpromotions', getPromotion);
  app.post('/api/setpromotion', setPromotion);

  function setPromotion(req, res) {
    if (logging === "debug") { console.log("Attempting to Set Promotion"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);
      }
      catch (e) {
        if (logging != "none") {
          console.log(e);
          console.error("Could Not Parse JSON data");
        }
        res.send("Could Not Parse JSON data")
      }
      settings.promotion = store.promotion;
      saveSettings();
      if (logging != "none") {
        console.log("Promotion set to " + settings.promotion);
      }
      res.send({ "Status": "Promotion set to " + settings.promotion });

    });
  }
  function saveSettings() {
    if (logging === "debug") { console.log("Attempting to Save Settings"); }

    fs.writeFile('settings/settings.json', settings, (error) => { if (error) { console.log(error) } else if (logging === "debug") { console.log("Settings File Saved"); } });
  }
  function getPromotion(req, res) {
    if (logging === "debug") { console.log("Attempting to Send Promotion"); }

    if (logging != "none") { console.log({ "promotion": settings.promotion }); }
    res.send({ "promotion": settings.promotion });
  }

  function getSettings() {
    if (logging === "debug") { console.log("Attempting to Get Settings"); }

    settings = JSON.parse(fs.readFileSync('settings/settings.json', (error) => { if (error) { console.log(error); } else if (logging === "debug") { console.log("Settings File Recieved"); } }));
  }
  function setHomeSettings(req, res) {
    if (logging === "debug") { console.log("Attempting to Set Home Settings"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);
      }
      catch (e) {
        if (logging != "none") {
          console.log(e);
          console.error("Could Not Parse JSON data");
        }
        res.send("Could Not Parse JSON data")
      }

      settings.products = store.products;
      saveSettings();

      if (logging != "none") { console.log("Home Settings Saved"); }

      res.send({ "message": "products set to " + settings.products });
    });
  }
  function getHomeSettings(req, res) {
    if (logging != "none") { console.log("Home Settings Sent"); }
    res.send({ "products": settings.products });
  }

  function createProduct(req, res) {
    if (logging === "debug") { console.log("Attempting to Set Create Product"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);

        var prod = new product();

        if (logging === "debug") { console.log(store); }

        prod.title = store.title;
        prod.subtitle = store.subtitle;
        prod.image = store.image;
        prod.description = store.description;
        prod.info = store.info;
        prod.price = store.price;
        prod.brand = store.brand;

        if (logging === "debug") { console.log(prod); }

        prod.save(function (error) {
          if (error) {
            if (logging != "none") {
              console.error('Error saving data');
              console.log(prod);
              console.log(error);
            }
            res.send({ prod, error });
          }
          else {
            if (logging != "none") { console.log("Success: Product data created"); }
            res.send({ "Success": "Product data created" });
          }
        });
        }
        catch (e) {
          if (logging != "none") {
            console.log(e);
            console.error("Could Not Parse JSON data");
          }
          res.send("Could Not Parse JSON data")
        }
    });
  }

  function updateProduct(req, res) {
    if (logging === "debug") { console.log("Attempting to Update Product"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);
      }
      catch (e) {
        if (logging != "none") {
          console.log(e);
          console.error("Could Not Parse JSON data");
        }
        res.send("Could Not Parse JSON data")
      }
      var updates = {};
      if (store.id) {
        updates.id = store.id;
      }
      if (store.title) {
        updates.title = store.title;
      }
      if (store.subtitle) {
        updates.subtitle = store.subtitle;
      }
      if (store.image) {
        updates.image = store.image;
      }
      if (store.description) {
        updates.description = store.description;
      }
      if (store.info) {
        updates.info = store.info;
      }
      if (store.price) {
        updates.price = store.price;
      }
      if (store.brand) {
        updates.brand = store.brand;
      }

      if (logging === "debug") {
        console.log("DATA TO UPDATE updated");
        console.log(updates);
      }

      product.findOneAndUpdate({ "_id": updates.id }, updates, function (error, prod) {
        if (error) {
          if (logging != "none") {
            console.error('Error updating data');
          }
          res.send({ updates, error });
        }
        else {
          if (logging != "none") {
            console.log({ "Success": "Product data updated"});
          }
          if (logging === "debug"){
            console.log({"Data": updates}); 
          }
          res.send({ "Success": "Product data updated", "Data": updates });
        }

      });
    });
  }

  function createBrand(req, res) {
    if (logging === "debug") { console.log("Attempting to Create Brand"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);
      }
      catch (e) {
        if (logging != "none") {
          console.log(e);
          console.error("Could Not Parse JSON data");
        }
        res.send("Could Not Parse JSON data")
      }
      var bran = new brand();
      bran.name = store.name;
      bran.image = store.image;
      bran.description = store.description;
      bran.info = store.info;
      bran.link = store.link;

      bran.save(function (error, brand) {
        if (error) {
          if (logging != "none") {
            console.error('Error saving data');
            console.log(error);
          }
          res.send(error);
        }
        else {
          if (logging != "none") {
            console.log({ "Success": "Brand data created"});
          }
          if (logging === "debug"){
            console.log({"Data": brand}); 
          }
          res.send({ "Success": "Brand data created", brand });
        }
      });
    });
  }

  function updateBrand(req, res) {
    if (logging === "debug") { console.log("Attempting to Update Brand"); }

    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      try {
        store = JSON.parse(store);
      }
      catch (e) {
        if (logging != "none") {
          console.log(e);
          console.error("Could Not Parse JSON data");
        }
        res.send("Could Not Parse JSON data")
      }
      var updates = {};

      if (store.name) {
        updates.name = store.name;
      }
      if (store.image) {
        updates.image = store.image;
      }
      if (store.description) {
        updates.description = store.description;
      }
      if (store.info) {
        updates.info = store.info;
      }
      if (store.link) {
        updates.link = store.link;
      }
      if (logging === "debug") {
        console.log(updates);
      }

      brand.findOneAndUpdate({ "name": updates.name }, updates, function (error, bran) {
        if (error) {
          if (logging != "none") {
            console.error('Error updating data');
            res.send(error);
          }
        }
        else {
          if (logging != "none") {
            console.log({ "Success": "Brand data updated"});
          }
          if (logging === "debug"){
            console.log({"Data": updates}); 
          }
          res.send({ "Success": "Brand data updated", "Data": updates });
        }

      });
    });
  }


  function getBrand(req, res) {
    if (logging === "debug") { console.log("Attempting to Get Brand"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      var search;
      store = JSON.parse(store);
      if (store.name) {
        search = store.name;
      if (logging === "debug") {
        console.log({ "name": search });
      }
      brand.find({ "name": search }, function (err, result) {
        if (err) { if (logging != "none") { console.log(err); } }
        if (logging === "debug") {
          console.log(result);
        }
        if (result) {
          var brandx = {};
          brandx.name = result[0].name;
          brandx.image = result[0].image;
          brandx.description = result[0].description;
          brandx.info = result[0].info;
          brandx.link = result[0].link;
          if (logging != "none") {
            console.log("Brand Data Sent: "+ brandx.name);
          }
          if (logging === "debug") 
          {
            console.log(brandx);
          }
          res.send(brandx);
        }
        else {
          if (logging != "none") {
            console.error("Error: The id was not found");
          }
          res.send({ "Error": "The id was not found" });
        }
      });
    }
    else
    {
      if (logging != "none") {
        console.error({"Error": "No Brand Name was Provided"});
      }
      res.send({"Error": "No Brand Name was Provided"});
      
    }
    });
  }

  function getProduct(req, res) {
    if (logging === "debug") { console.log("Attempting to Get Product"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      store = JSON.parse(store);
      if (logging === "debug") {
        console.log(store);
      }
      product.findById(store.id, function (err, result) {
        if (err) throw err;
        if (logging === "debug") {
          console.log(result);
        }
        if (result) {
          var productx = {};
          productx.title = result.title;
          productx.subtitle = result.subtitle;
          productx.image = result.image;
          productx.description = result.description;
          productx.info = result.info;
          productx.price = result.price;
          productx.brand = result.brand;
          if (logging != "none") {
            console.log("Product Data Sent: "+ productx.title);
          }
          if (logging === "debug") {
            console.log(productx);
          }
          res.send(productx);
        }
        else {
          console.error("Error: The id was not found");
          res.send({ "Error": "The id was not found" });
        }
      });
    });
  }

  function searchProduct(req, res) {
    if (logging === "debug") { console.log("Attempting to Search Product"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      store = JSON.parse(store);
      query = new RegExp(store.query, "i");
      if (logging === "debug") {
        console.log(store);
      }
      product.find({ $or: [{ 'title': query }, { 'subtitle': query }, { 'image': query }, { 'description': query }, { 'info': query }, { 'brand': query }] }, function (err, result) {
        if (err) {
          if (logging != "none") {
            console.error('search error')
            console.error(err);
          }
          throw err;
        }
        if (result) {
          if (logging != "none") {
            console.log('List of Products Sent');
          }
          if (logging === "debug") {
            console.log(result);
          }
          res.send(result);
        }
        else {
          if (logging != "none") {
            console.error("Error: The id was not found");
          }
          res.send({ "Error": "The id was not found" });
        }
      });
    });
  }

  function searchBrand(req, res) {
    if (logging === "debug") { console.log("Attempting to Search Brand"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      store = JSON.parse(store);
      query = new RegExp(store.query, "i");
      if (logging === "debug") {
        console.log(store);
      }
      brand.find({ $or: [{ 'name': query }, { 'description': query }, { 'image': query }, { 'link': query }, { 'info': query }] }, function (err, result) {
        if (err) {
          if (logging != "none") {
            console.error('search error')
            console.error(err);
          }
          throw err;
        }
        if (result) {
          if (logging != "none") {
            console.log('List of Brands Sent');
          }
          if (logging === "debug") {
            console.log(result);
          }
          res.send(result);
        }
        else {
          if (logging != "none") {
            console.error("Error: No brand was not found");
          }
          res.send({ "Error": "No brand was not found" });
        }
      });
    });
  }
  function deleteProduct(req, res) {
    if (logging === "debug") { console.log("Attempting to Delete Product"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      store = JSON.parse(store);

      if (logging === "debug") {
        console.log(store);
      }
      product.findByIdAndRemove(store.id, function (err) {
        if (err) {
          console.error('search error')
          console.error(err);
          throw err;
        }
        else {
          if (logging != "none") {
            console.log("Removed: " + store.title);
          }
          res.send({ "Removed": store.title });
        }
      });
    });
  }
  function deleteBrand(req, res) {
    if (logging === "debug") { console.log("Attempting to Delete Brand"); }
    var store = '';
    req.on('data', function (data) {
      store += data;
    });
    req.on('end', function () {
      store = JSON.parse(store);
      if (logging === "debug") {
        console.log(store);
      }
      brand.findOneAndRemove({ 'name': store.name }, function (err) {
        if (err) {
          if (logging != "none") {
            console.error('search error')
            console.error(err);
          }
          throw err;
        }
        else {
          if (logging != "none") {
            console.log("Removed: " + store.name);
          }
          res.send({ "Removed": store.name });
        }
      });
    });
  }

  function deleteDatabase(req, res) {
    if (logging === "debug") { console.log("Attempting to Delete Database"); }
    product.deleteMany({}, function (err) {
      if (err) {
        if (logging != "none") {
          console.error('Delete error')
          console.error(err);
        }
        throw err;
      }
      else {
        if (logging != "none") {
          console.log("Database Deleted");
        }
        res.send({ "Removed": "Database" });
      }
    });
  }
}