# M101JS
[A MongoDB course for Node.js Developers](https://university.mongodb.com/courses/M101JS/about)

## What is MongoDB?
1. scaling out vs. scaling up
2. Design data models

## Install MongoDB(Mac)
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

## [JSON Data Format](http://www.json.org/)
1. key/value pairs
  - the value can be object, array, number, string
  - nesting

## [BSON](http://bsonspec.org/)
- A binary format
- `document`

## Intro to Creating and Reading Documents
### CRUDs
 - Create
 - Read
 - Update
 - Delete
### mongo shell
- run `./mongo`
- `help` to check the commands
- command `show dbs`
- command `use xxx`(switch to xxx database)
- `db.movies.insertOne()` to insert a record into the movie collection
- `db.movies.find().pretty()` to show all the objects in the collection
- pass query to `find()`

## Intro to [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- library for node app to connect to mongodb

## Homeworks
### Homework 1
- `mongorestore`
