module.exports = function(app) {

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = process.env.MONGO_URI;
mongoose.connect(dburl);

var productSchema = new Schema({
    title: {type:String , required : true},
    subtitle: {type:String , required : true},
    image: {type:String , required : true},
    description: {type:String, required : true},
    info: { type:String, required: false },
    price: { type:Number, required: false },
    brand: {type:String, default: 'none'}
  }, { collection: 'products' });
  
var product = mongoose.model('product', productSchema);

app.post('/api/createproduct', createProduct);
app.post('/api/getproduct', getProduct);
app.post('/api/updateproduct', updateProduct);
app.post('/api/searchproduct', searchProduct);
app.post('/api/deletedatabase', deleteDatabase);
app.post('/api/deleteproduct', deleteProduct);

function createProduct(req, res)
{
  var store = '';
  req.on('data', function(data) 
  {
      store += data;
  });
  req.on('end', function(){
    try {
     store = JSON.parse(store);
    }
    catch(e)
    {
      console.log(e);
      console.error("Could Not Parse JSON data");
      res.send("Could Not Parse JSON data")
    }
    var prod = new product();
    prod.title = store.title;
    prod.subtitle = store.subtitle;
    prod.image = store.image;
    prod.description = store.description;
    prod.info = store.info;
    prod.price = store.price;
    prod.brand = store.brand;

    prod.save(function(error) {
      if(error)
      {
        console.error('Error saving data');
        res.send(error);
      }
      else
      {
        console.log("Success: Product data created");
        res.send({"Success":"Product data created"});
      }
    });
  });
}

function updateProduct(req, res)
{
  var store = '';
  req.on('data', function(data) 
  {
      store += data;
  });
  req.on('end', function(){
    try {
     store = JSON.parse(store);
    }
    catch(e)
    {
      console.log(e);
      console.error("Could Not Parse JSON data");
      res.send("Could Not Parse JSON data")
    }
    var updates = {};

    if(store.title)
    {
      updates.title = store.title;
    }
    if(store.subtitle)
    {
      updates.subtitle = store.subtitle;
    }
    if(store.image)
    {
      updates.image = store.image;
    }
    if(store.description)
    {
      updates.description = store.description;
    }
    if(store.info)
    {
      updates.info = store.info;
    }
    if(store.price)
    {
      updates.price = store.price;
    }
    if(store.brand)
    {
      updates.brand = store.brand;
    }


    product.findByIdAndUpdate(store.id, {$set: updates}, function (error, prod) {
      if(error)
      {
        console.error('Error updating data');
        res.send(error);
      }
      else
      {
        console.log("Success: Product data updated");
        res.send({"Success":"Product data updated", "Data": updates });
      }

    });
  });
}

function getProduct(req, res)
  {
    var store = '';
    req.on('data', function(data) 
    {
        store += data;
    });
    req.on('end', function() 
    {
      store = JSON.parse(store);
      console.log(store);
      product.findById(store.id, function(err, result){
        if(err) throw err;
        console.log(result);
        if(result){
          var productx = {};
          productx.title = result.title;
          productx.subtitle = result.subtitle;
          productx.image = result.image;
          productx.description = result.description;
          productx.info = result.info;
          productx.price = result.price;
          productx.brand = result.brand;
          res.send(productx);
        }
        else
        {
          console.error("Error: The id was not found");
          res.send({"Error": "The id was not found"});
        }
      });
    });
  }

  function searchProduct(req,res)
  {
    var store = '';
    req.on('data', function(data) 
    {
        store += data;
    });
    req.on('end', function() 
    {
      store = JSON.parse(store);
      query = new RegExp(store.query, "i");
      console.log(store);
      product.find({$or:[{'title':query},{'subtitle':query},{'image':query},{'description':query},{'info':query},{'brand':query}]}, function(err, result){
        if(err){ 
          console.error('search error')
          console.error(err);
          throw err;
        }
        if(result){
          console.log(result);
          res.send(result);
        }
        else
        {
          console.error("Error: The id was not found");
          res.send({"Error": "The id was not found"});
        }
      });
    });
  }
  function deleteProduct(req,res)
  {
    var store = '';
    req.on('data', function(data) 
    {
        store += data;
    });
    req.on('end', function() 
    {
      store = JSON.parse(store);
      console.log(store);
      product.findByIdAndRemove(store.id, function(err){
        if(err){ 
          console.error('search error')
          console.error(err);
          throw err;
        }
        else
        {
          console.log("Removed: "+store.id);
          res.send({"Removed": store.id});
        }
      });
    });
  }
  function deleteDatabase(req,res)
  {
    product.deleteMany({}, function(err){
      if(err){ 
        console.error('Delete error')
        console.error(err);
        throw err;
      }
      else
      {
        console.log("Database Deleted");
        res.send({"Removed": "Database"});
      }
    });
  }
}