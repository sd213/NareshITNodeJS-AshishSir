#

## To Install mongodb :-  npm install mongodb

## mongodb+srv://<db_username>:<db_password>@cluster0.djcrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

### Use this connection string in your application

View full code sample

`mongodb+srv://<db_username>:<db_password>@cluster0.djcrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

Replace <db_password> with the password for the <db_username> database user. Ensure any option params are
URL encoded
.

## Code Sample for Connection with Cloud :-

### Node JS  Code

```nodejs
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.djcrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

## Normal Searching For data

### To Find all Data In given collection(Restaurants..)

db.restaurants.find({})

### To Find all Data in given collection(Restaurants..) based on condition and show data based on projection

db.restaurants.find({condition},{projection})

projection value is either 1 or 0

### In MongoDB, the find() method allows you to query the database for documents in a collection. You can filter documents using a condition (filter) and return only specific fields using a projection'.'

### Syntax

db.collection.find({<condition>}, {<projection>})

### condition: This specifies the filter criteria for retrieving documents'.'

### projection: This specifies which fields should be included or excluded in the result'.'

1: Include the field.
0: Exclude the field.

## projection

### To find documents in the restaurants collection and project (select) only the restaurant_name field

db.restaurants.find({},{restaurant_name:1})

### To give results on with only restaurants and cost

 db.restaurants.find({},{restaurant_name:1,cost:1}) //by default comes with _id

### MongoServerError[Location31254]: Cannot do exclusion on field cost in inclusion projection

 db.restaurants.find({},{restaurant_name:1,cost:0}) 

### To Hide _id Which is allowed display automatically . fort aht MongoServerError won't show

db.restaurants.find({},{restaurant_name:1,cost:1,_id:0}) //here it is allowed because by default '_id' is allowed in projection.

### projection with condition

 db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0})

## Sorting (use sort({fieldtobeSorted:valueusedtochoosesortedmanner}))

  for sorting value is either 1 , -1;
  
### Sorting based on ascending order of cost

db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0}).sort({cost:1}) :-  .

### Sorting based on ascending order of restaurant_name
  
db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0}).sort({restaurant_name:1})

### Sorting based on descending order of cost

db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0}).sort({cost:-1}) :-  .

### MongoInvalidArgumentError: Invalid sort direction: 0

db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0}).sort({cost:0})


## Limiting Upto Some Row

### gives only first 2 records

  db.restaurants.find({state_id:1},{ state_id:1,restaurant_name:1,cost:1,_id:0}).sort({restaurant_name:1}).limit(2)
                 <!--   conditions -->  <!--Projections       ->                   <!--Sorting Condition-->  <!--limiting ->
## skipping some row(Using Skipping)

### gives only first 2 records  without skipping

db.restaurants.find({state_id:1},{restaurant_name:1,cost:1,_id:0}).sort({restaurant_name:1}).limit(2)

### Gives only first five records without skipping

  db.restaurants.find({},{restaurant_name:1}).sort({}).limit(5)

### with skipping

 db.restaurants.find({},{restaurant_name:1}).sort({}).skip(3).limit(5) : gives only 5 records after skipping 3

db.restaurants.find({},{restaurant_name:1}).sort({}).skip(0).limit(5) :- 0-4

 db.restaurants.find({},{restaurant_name:1}).sort({}).skip(5).limit(5) :- 5-9

  db.restaurants.find({},{restaurant_name:1}).sort({}).skip(10).limit(5) 10-14

## update

  db.${collection}.update({condition},{values})
  db.users.find({_name:"somit"},{set:"msom"});

  db.users.update({"name":"somit"},{$set:{"name":"msom"}});

new syntax :

db.users.updateMany({ someField: 'someValue' }, { $set: { fieldToUpdate: 'newValue' } });  :- for updating many values at a time.
db.users.updateOne({ name : 'msom' }, { $set: { name: 'som' } }); :- for updating some values .

### here set have 2 functions if column exist in document then it will update and if not exist then add as a new column.

### here remove particular column

   db.users.update({"name":"somit"},{$unset:{"name":1}});

   db.users.updateOne({"name":"smith"},{$unset:{name:0}});
in both case it just remove name column.

### to do update multiple data traditional way

 db.users.update({"name":null},{$unset:{city:0},$set:{district:"Khordha"}},{multi:true});

## Delete

### To Delete All

db.${collection}.remove({})

### To Delete Particular

db.${collection}.remove({"name":"som"})
