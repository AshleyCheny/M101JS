# M101JS
[A MongoDB course for Node.js Developers](https://university.mongodb.com/courses/M101JS/about)

## Week 1
### What is MongoDB?
1. scaling out vs. scaling up
2. Design data models

### Install MongoDB(Mac)
1. `mongo` is the MongoDB shell
2. `mongod` is the actual server
3. the mongodb server puts its data in `/data/db` by default
  - go back to the root `sudo bash`
  - `mkdir -p /data/db`
  - `chmod 777 /data`
  - `chmod 777 /data/db`
  - `ls -ld /data/db` to check the write&read permission
4. run the server
  - go back to the /bin, run `.mongod` if use the default file to store data
  - run `./mongod --dbpath /User/username/appname/data`
5. add the server to the usr/bin
  - `cp * /usr/local/bin`

### [JSON Data Format](http://www.json.org/)
1. key/value pairs
  - the value can be object, array, number, string
  - nesting

### [BSON](http://bsonspec.org/)
- A binary format
- `document`

### Intro to Creating and Reading Documents
#### CRUDs
 - Create
 - Read
 - Update
 - Delete
#### mongo shell
- run `./mongo`
- `help` to check the commands
- command `show dbs`
- command `use xxx`(switch to xxx database)
- `db.movies.insertOne()` to insert a record into the movie collection
- `db.movies.find().pretty()` to show all the objects in the collection
- pass query to `find()`

### Intro to [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- library for node app to connect to mongodb

### Homeworks
#### Homework 1
- `mongorestore`

## Week 2 CRUD
### Creating Documents
- `db.collectionName.insertOne({})`
- `db.collectionName.insertMany([document, document, ...], {ordered: false})`
- `db.collectionName.drop()`
- update commands ("upserts")

### The `_id` Field
- ObjectId: Date + mac address + pid + counter (12 byte hex string)

### Reading Documents - return documents match the query
- `db.collectionName.find({}).pretty()`
- `db.collectionName.find({"tomato.meter": 100}).count()` - use . for nested properties(quotes are required for dot notation)
- Equality matches on array
  - on the entire array (order of elements in the query array matters!)
    -  `db.collectionName.find({"": ["", ""]}).count()`
    -  `db.collectionName.find({"xx.0": ""}).count()` - the first element of an array
  - based on any element
  - based on special element
  - more complex matches using operators
  - `cursor` - `find()` return cursors
  - `projection`- reduce the fields returned - second argument(object) for the find()
    -  `db.collectionName.find({"xx.0": ""}, { title: 1, _d: 0}).count()`
    - `0` exclude fields, `1` include fields

### [Comparison Operators](https://docs.mongodb.com/manual/reference/operator/query/)
- `db.collectionName.find({ runtime: { $gt: 90, $lt: 150 }}).pretty()`
- query based on the value of properties

### Element Operators
- `db.collectionName.find({ "tamato.meter": { $exists: true }}).pretty()`
- `db.collectionName.find({"_id": { $type: "string"}})`
- query based on the value of properties

### Logical Operators
- `db.collectionName.find({ $or: [{"tomato.meter": { $gt: 95}}, { "metacritic": { $gt: 88 }}]})`
- `db.collectionName.find({ $and: [{"metacritic": { $ne: null}}, { "metacritic": { $exists: true} }]})` - useful when the query fields are the same

### Regex Operators
- `db.collectionName.find({ "awards.text": { $regex: /^Won\s.*/ }})`
- `^`: begin with
- `\s`: space
- `.*`: all afterwards
- query based on the value of properties

### Array Operators
- `db.collectionName.find({ genres: { $all: ["xxx", "xxx", "xxx"]}}).pretty()`
- `db.collectionName.find({ genres: { $size: 1}}).pretty()` - check the length of an array
- `db.collectionName.find({ boxOffice: { $elemMatch: { country: "UK", revenue: { $gt: 15 }}}})`

### [Updating Documents](https://docs.mongodb.com/manual/reference/operator/update/)
- `db.collectionName.updateOne({ title: " The Martian"}, { $set: { poster: "xxxxxxxx"}})` - the first parameter select the document and the second parameter passes the fields and value to be updated
- `db.collectionName.updateOne({title: "The Martian"}, { $inc: { "tomato.reviews": 3, "tomato.userReviews": 25 }})` - increment by 3/25
- `db.collectionName.updateOne({title: "The Martian"}, { $push: { xxx, xxx}})`
- `db.collectionName.updateMany()`
- `db.collectionName.find({}, {upsert: true})`
- `db.collectionName.replaceOne()`
