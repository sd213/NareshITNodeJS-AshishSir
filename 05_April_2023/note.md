Roll No  | Hindi | English |  Computer
  1      |  86   |         |
  2      |       |    78   | 
  3      |  69   |         |   78

NoSql
> Not a sql
> JSON
> Both structred and unstructred
> Nested Data

[
    {
        "rollNo":1,
        "Hindi":86
    },
    {
        "rollNo":2,
        "English":78
    },
    {
        "rollNo":2,
        "Hindi":69,
        "Computer":78
    }
]

SQL          MongoDB
Database     Database
Table        Collection
Row          Document
Select       Find
Insert       Insert
Delete       Remove
Update       Update

//Setup
> Local
> Download MongoDB
* https://www.mongodb.com/try/download/community

# window
> Create folder by the name of data in c drive
C:/data
> Inside data folder create db folder
> C:/data/db

# Mac/linux
> open terminal
> mkdir data/db

> Cloud
* https://www.mongodb.com/
* try free
> signup with google

* Network access
> 0.0.0.0/0
* Database access
> Create user
Built-in Role
> Atlas Admin
> Add User

mongodb+srv://test:test123@cluster0.f8vmc.mongodb.net/?retryWrites=true&w=majority

Default Port > 27017

// Start mongo server (should always running if using in app)
> open the cmd
> go inside bin folder
C:/programfile/mongodb/server/5.0.1/bin
> cd C:/programfile/mongodb/server/5.0.1/bin
> mongod
> do not close this cmd

// Start mongo Client (Need to test query)
> open the cmd
> go inside bin folder
C:/programfile/mongodb/server/5.0.1/bin
> cd C:/programfile/mongodb/server/5.0.1/bin
> mongo

///////
* See All the Databases
> show dbs

* To go inside db
> use dbname

* See All the collections
> show collections

* See data inside collection
> db.collectionname.find()

* Create Database
> use dbname


* insert data
> db.users.insert({name:"Arun","city":"Pune"})
> db.users.insert({"name":"Nikita","city":"Delhi"})
> db.users.insert({"_id":1,"name":"Rohit","city":"Mumbai"})
> db.users.insert({"_id":2,"name":"Neha","city":"Paris"})

_id 
> primary key
> Always unique
> 12 byte 
  * 5byte(random number)
  * 3byte(Series)
  * 4byte(timestamp)

 