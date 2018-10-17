var productSchema = new Schema({
    id: {type:Integer , unique : true},
    name: {type:String , required : true},
    image: {type:String , required : true},
    description: {type:String, required : true},
    info: { type:String, required: false },
    price: { type: Double, required: false },
    brand: {type:String, default: 'none'}
  }, { collection: 'products' });
  
var product = mongoose.model('product', productSchema);

app.post('/api/createproduct', newProduct);
app.post('/api/getproduct', getProduct);

function validateProduct(store)
{
  if(store.Name && store.Image && store.Description)
  {
    return true;
  }
  return false;
}

function newProduct(req, res)
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
      console.log("Could Not Parse JSON data");
      res.send("Could Not Parse JSON data")
    }
   // if( validateProduct(store))
    var prod = new product();
    prod.name = store.name;
    prod.image = store.image;
    prod.description = store.description;
    prod.info = store.info;
    prod.price = store.price;
    prod.brand = store.brand;

    prod.save(function(error) {
      if(error)
      {
        console.log(parseError(error));
        res.send(parseError(error));
      }
      else
      {
        console.log("Success: Product data created");
        res.send({"Success":"Product data created"});
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
      job.findById(store.id, function(err, result){
        if(err) throw err;
        console.log(result);
        if(result){
          var productx = {};
          productx.name = result.name;
          productx.image = result.image;
          productx.description = result.description;
          productx.info = result.info;
          productx.price = result.price;
          productx.brand = result.brand;
          res.send(productx);
        }
        else
        {
          console.log("Error: The id was not found");
          res.send({"Error": "The id was not found"});
        }
      });
    });
  }