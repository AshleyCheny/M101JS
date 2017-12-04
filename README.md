# M101JS
[A MongoDB course for Node.js Developers](https://university.mongodb.com/courses/M101JS/about)

- db
  - collection
    - documents
      - fields(keys)
      - values

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

## Week 3: The Node.js Driver
### find() and Cursors in the Node.js Driver
- `mongodimport`
- `cursor` to describe the query instead of calling the db immediately, get batches results instead of getting the whole result at once

### Projection in the Node.js Driver
- `cursor.project({ })`
-  `projection` project out the fields we need
- `0` exclude the fields
- `1` include the fields

### Query Operators in the Node.js Driver
- `command line args module`
- `find(query, projection)`

### `$regex` operator in the Node.js Driver
- `"options": i`

### Dot Notation in the Node.js Driver
- `{ }`
- Dot notation
- `[]`

### Dot Notation on embedded Documents in Arrays

### Sort, Skip, and Limit in the Node.js Driver
- paging
- sort by single field: `cursor.sort({})`
- sort by multiple fields: `cursor.sort([[], []])` - because the sequence matters
- `cursor.skip(#)`: skip the specified number of documents. Eg. `cursor.skip(4)`: skip the first 4 documents
- `cursor.limit(#)`
- the order of sort, skip and limit methods does not matter, because mongodb will always run sort() first, then skip() and limit() at the end.

### `insertOne()` and `insertMany()` in the Node.js Driver

### `deleteOne(filter, callback)` and `deleteMany()` in the Node.js Driver

## Week 4: Schema Design
### MongoDB Schema Design
- application driven schema
- support rich documents (array, annother documents, etc)
- pre join/embedded data
- no Mongo Joins
- no constraints
- atomic operations
- no declared schema
- What is the single most important factor in designing the application schema within MongodDB
  - Matching the data access patterns of the application

### Relational Normalization
- MongodDB frees the database of modification anomalies.
- Minize redesign when extending

### Modeling a Blog in documents
-  `Post` collection
- only need to access to one collection

### Living without constraints
- relational database
  - foreign key constraint
- mongodb
  - no guarantee for foreign key constraint
  - no use embedded data to make the data consistent

### Living without transactions
- use atomic operations (avoid making changes to the same documents at the same time)
- three approaches
  - restructure
  - implement locking in software operating system
  - tolerate a little bit inconsistency
- `Update`, `findAndModify`, `$addToSet(within an update)` and `$push within an update` are all the operations operate atomically within a single document.

### One to One Relations
- Examples:
  - (one)Employee: (one)Resume
  - (one)Building: (one)Floor Plan
  - (one)Patient: (one)Medical History
- When to keep documents in separate collections
  - to reduce the working set size of the application
  - when the combined size of documents would be larger than 16MB

### One to Many Relations
- Examples:
  - (one)city: (many)person

- true linking (store info in multiple collections)
  - people collection
    `{
      name: "xxx",
      city: "NYC"
    }`
  - city collection
   `{
     "_id": "NYC"
   }`

- One to Few
  - nested the other one in one single collection

### Many to Many Relations
- Examples:
  - Books: Authors (Few to Few)
  - Students: Teachers

- Few to Few
  - one collection with nested one

### MultiKey Indexes(??)
- for complicated queries to different collections
- `ensureIndex({})`
- `explain()`

### Benefits of Embedding
- Improved Read Performance
  - It takes long time to get the first byte from the db. However, the subsequent ones won't take long times.
- One Round trip to the DB

### Representing Trees in MongoDB
- list ancestors/children as the value of the "ancestors" property for example.

### When to denormalize
- 1: 1 (embedded)
- 1: Many (embedded: from the many to the one)
- Many: Many (Link through objectID)

## Week 5: Indexes and Performance
### Storage Engines: Introduction
- `[Indexing](https://docs.mongodb.com/manual/indexes/)`
- `[Sharding](https://docs.mongodb.com/manual/sharding/)`
- `[Pluggable Storage Engines](https://docs.mongodb.com/manual/core/storage-engines/)`
  - Where the storage engine sits?
    - It sits between `disks`(hardware) and mongodb server(database)
  - the storage engine has the control of `memeory` in the computer, it decides what to take out and what to put to the `memeory`
  - change the mongodb performance based on different storage engines
  - Two Storage Engines
    - MMAP (default, provided by mongodb)
    - WiredTiger
  - What things storage engine do not handle?
  - The storage engine directly determines "The data file format" & "Format of Indexes"

### Storage Engines: MMAPv1
- `Disk`: store all the documents
- `Memory`: store documents which are needed for the working processes
- Provides collection level locking
- In place updates
- Power of two sized allocations
- MMAPv1 automatically allocates power-of-two-sized documents when new documents are inserted**
- MMAPv1 is built on top of the mmap system call that maps files into memory**

### Storage Engines: WiredTiger
- not turned on by default in mongodb (before 3.0 or older)
- faster
- Document level concurrency (lock free implementation)
- Compression
  - of data
  - of Indexes
- control its memory
- No inplace update
- invoke the WiredTiger engine
  -  `mongod --storageEngine wiredTiger`

### [Indexes](https://docs.mongodb.com/manual/indexes/)
- collections are storage in the disk
- ordered indexes
- b tree(data structure) index in real practice before 3.0(b+ tree for wiredTiger)
- index will be affected by inserting new documents
- index will be available in disks or memories
- adding an appropriate index will have a great impact on the performance of a database

### Create Indexes
- `db.students.explain().find()`
- `db.students.createIndex({ student_id: 1})`
  - create a index with student id ascending
- creating an index takes some time

### Discovering (and Deleting) Indexes
- check indexes for collections
  - `db.students.getIndexes()`
- delete indexes for collections
  - `db.students.dropIndex()`

### MultiKey Indexes**
- can not index parallel arrays

### Dot Notation and MultiKey
- create indexes based on the nested properties

### Index Creation Option, Unique
- `db.stuff.createIndex({thing: 1}, {unique: true})`
- can not create unique index if there are multiple same documents
- after creating the unique index, if inserting a document which has the same contents as the one in the collection, the mongodb will throw duplicate key error

### Index Creation, Sparse**
- use sparse option on missing key document
- `db.employees.createIndex({ cell: 1}, {unique: true, sparse: true})`

### [Index Creation, in Background](https://docs.mongodb.com/manual/core/index-creation/)
- Foreground:
  - `db.students.createIndex({'scores.score': 1});`
  - fast
  - blocks writes and reads in the database
- Background
  - `db.students.createIndex({'scores.score': 1}, {background: true});`
  - slow
  - do not block reads and writes

### Using Explain
- `explain()`
- show how the database deals with the query and which index it uses
- `db.foo.explain().find()/help()/update()/remove()/aggregate()`
- no insert operation on explain()

### [Explain: Verbosity**](https://docs.mongodb.com/v3.4/reference/method/cursor.explain/)
- Modes   
  - query planner
  - execution stats (explain("executionStats"))
  - all plans execution

### [Covered Queries**](https://docs.mongodb.com/manual/core/query-optimization/#covered-query)
- The query is covered by the index. No need to exam any documents

### When is an index used? (choosing an index)

### How Large is your index? (Index Size)
- the index should fit in the memory
- `db.students.stats()` or `db.students.totalIndexSize()` to check index size

### Number of Index Entries
- Index Cardinality
  - Regular (1:1)
  - Sparse (<= documents)
  - MultiKey (tags:(,,)) >documents

### [Geospatial Indexes: 2d](https://docs.mongodb.com/manual/geospatial-queries/)
- find documents which is near the given geo location
  - `db.stores.find({location: {$near: [50, 50]}})`

### [Geospatial Spherical: 3d/2dsphere](https://docs.mongodb.com/manual/core/2dsphere/)
-  `db.places.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [-122.1691601, 37.4276114],
        },
        $maxDistance: 2000
      }
    }
  })`
- [longitude, latitude]

### [Text Indexes(Full Text Search)](https://docs.mongodb.com/manual/core/index-text/)
- `db.sentences.createIndex({words: 'text'})`
- `db.sentences.find({$text: {$search: 'dog'}})`
- find the best match
  -  `db.sentences.find({$text: {$search: 'dog tree obsidian'}}, {score: {$meta 'textScore'}}).sort({score: {$meta: 'textScore'}})`
- `{$search: 'dog tree obsidian'}`: `dog` or `tree` or `obsidian`

### Efficiency of Index Use
- Design/Using Indexes
  - Goals
    - Efficient read/write operation
    - selectivity: minimize records scanned (primary factor)
    - other ops: how are sorts handled?
- `hint()`
- [compound indexes](https://docs.mongodb.com/v2.8/tutorial/create-a-compound-index/)
- Create compound index(??)
  - Equity fields before range fields
  - Sort fields before range fields
  - Equality fields before sort fields

### Logging Slow Queries
- check logs in mongod shell

### Profiling
- for any queries take long times
- Level 0: off
- Level 1: 10s, slow queries
- Level 2: all, my queries
- mongod shell: `mongod --dbpath /usr/local/var/mongodb --profile 1 --slowms 2`
- mongo shell: `db.system.profile.find().pretty()`
- mongo shell: `db.getProfilingLevel()`
- mongo shell: `db.getProfilingStatus()`
- mongo shell: `db.setProfilingLevel(1, 4)`
- turn if off: `db.setProfilingLevel(0)`
- db.system.profile.find({millis: {$gt: 1000}}).sort({ts: -1})

### [Mongotop](https://docs.mongodb.com/manual/reference/program/mongotop/) **
- Reviews
  - Indexes are critical to performance
  - Explain
  - Hint
  - Profiling
- High level view of how mongodb work
- a command

### [Mongostat](https://docs.mongodb.com/manual/reference/program/mongostat/) **

### [Sharding](https://docs.mongodb.com/manual/sharding/)
- put collections in multiservers
- [replica set](replica set)

## [Week 6: The Aggregation Framework](https://docs.mongodb.com/manual/aggregation/)
### Introduction to the Aggregation Framework
- A set of analyse set within mongodb
- `pipeline` works with mongodb collections
- `Stage`: data processor

### Familiar Aggregation Operations
- Stages
  - match(find)
  - project
  - sort
  - skip
  - limit
- use aggregate
  - `db.companies.aggregate([
    { $match: {
      founded_year: 2004
      }
    },
    {
      $sort: {
        name: 1
      }
    },
    {
      $skip: 10
    },
    {
      $limit: 5
    },
    {
      $project: {
        _id: 0,
        name: 1,
        founded_year: 1
      }
    }
    ])`
  - an aggregate is an array with different stages as elements
  - think about the efficiency of the pipeline
  - the order of different stages matters

### [Expression Overview](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#expressions)

### Reshaping Documents in $project Stages
- [$project](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)
- `db.companies.aggregate([
  {
    $match: {
      "funding_rounds.investments.financial_org.permalink": "greylock"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      ipo: "$ipo.pub_year",
      valuation: "$ipo.valuation_amount",
      funders: "$funding_rounds.investments.financial_org.permalink"
    }
  }
  ])`
  - `$` sign above means give me the value
  - `Promote Nested Fields`
  - can not change the data type for the $project operation

### [`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/)
- [see example](https://github.com/AshleyCheny/M101JS-CRSE/blob/master/Images/$unwind.png)
- $unwind can be placed before $match, however, $match should happen as soon as possible ($match operation can be used multiple times)

### [Array Expressions](https://docs.mongodb.com/manual/reference/operator/aggregation-array/)
- `$filter` is used for array values
- to reference a variable defined with an expression, use `$$`
- `as` define a variable
- `first_round: {$arrayElemAt: ["$funding_rounds", 0]}`
- `last_round: {$arrayElemAt: ["$funding_rounds", -1]}`
- `early_rounds: { $slice: ["$funding_rounds", 1, 3]}`
- `total_rounds: { $size: "$funding_rounds" }`

### [Accumulators Expression](https://docs.mongodb.com/manual/reference/operator/aggregation-group/)
- use accumulators in the $project stage
  - `largest_round: { $max: "$funding_rounds.raised_amount" }`

### Introduction to [$group](https://docs.mongodb.com/manual/reference/operator/aggregation/group/)
- similar to sql `groupby` command
- `db.companies.aggregate([
  {
    $group: {
      _id: {
        founded_year: "$founded_year"
      },
      average_number_of_employees: {
        $avg: "$number_of_employees"
      }
    }
  },
  {
    $sort: {
      average_number_of_employees: -1
    }
  }
  ])`

### `_id` in $group stages

### `$group` vs.`$project`
-  `$project` work on one document at a time.

### Homework 6-1
- `db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { relationships: 1, name: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        companies: { $addToSet: "$name"},
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] ).pretty()`

### Homework 6-2
- `db.grades.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$project: {
			    // specifications

			      "_id": 0,
			    	  "class_id": 1,
			    	  "scores": {
			    	    $filter: {
			               input: "$scores",
			               as: "score",
			               cond: { $ne: [ "$$score.type", "quiz" ] }
			            }
			    	  }

			}
		},

		// Stage 2
		{
			$unwind: "$scores"
		},

		// Stage 3
		{
			$group: {
				_id: "$class_id",
				count: { $sum: 1},
				aveScore: {$avg: "$scores.score"},
			}
		},

		// Stage 4
		{
			$sort: {
				aveScore: -1
			}
		},

	]

);`

- hw6-3
`db.companies.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				"founded_year": 2004,
			}
		},

		// Stage 2
		{
			$project: {
			    // specifications
			    "_id": 0,
			    "funding_rounds": 1,
			    size_of_rounds: {$size: "$funding_rounds"},
			    name: 1
			}
		},

		// Stage 3
		{
			$match: {
				size_of_rounds: {$gte: 5}
			}
		},

		// Stage 4
		{
			$project: {
				raiseAmount: "$funding_rounds.raised_amount",
				name: 1
			}
		},

		// Stage 5
		{
			$project: {
			    // specifications
			    avg: {$avg: "$raiseAmount"},
			    "name": 1
			}
		},

		// Stage 6
		{
			$sort: {
				avg : 1
			}
		},

	]


);
`

## Week 7: Application Engineering
### Intro
- Durability: How the data is persistent in the disk
- Replication
- Sharding: Distribute collections through multiple servers

### [Write Concern](https://github.com/AshleyCheny/M101JS-CRSE/blob/master/Images/Write Concern.png)
- The `Journal` may not write to the disk because of the server crash

### Network Errors
- May not receive response because of Network Error

### [Introduction to Replication](https://github.com/AshleyCheny/M101JS-CRSE/blob/master/Images/Intro to Replication.png)
- Availability
- Fault Tolerance
- Minimum sets: 3

### Replica Set Elections
- Type of Replica Set Nodes
  - Regular (no data on it)
  - Arbiter (voting) (no data on it)
  - Delayed/Regular (priority = 0)
  - Hidden (never be the primary), priority = 0
- Regular replica set members, hidden members and arbiters can participate in elections of a new primary.

### Write Consistency
- Eventual Consistency

### Creating a Replica Set
- Step 1: create the three different mongod server
  - create replica set script (create_replica_set.sh)
    - `#!/usr/bin/env bash

    mkdir -p /data/rs1 /data/rs2 /data/rs3
    mongod --replSet m101 --logpath "1.log" --dbpath /data/rs1 --port 27017 --oplogSize 64 --fork --smallfiles
    mongod --replSet m101 --logpath "2.log" --dbpath /data/rs2 --port 27018 --oplogSize 64 --smallfiles --fork
    mongod --replSet m101 --logpath "3.log" --dbpath /data/rs3 --port 27019 --oplogSize 64 --smallfiles --fork`
    - run `bash < create_replica_set.sh` to run the script
    - check contents in a file: `more 1.log`
- Step 2: connect each server together to set up the replica set (configuration)
  - the init replica script
    - `config = { _id: "m101", members:[
              { _id : 0, host : "localhost:27017"},
              { _id : 1, host : "localhost:27018"},
              { _id : 2, host : "localhost:27019"} ]
    };

    rs.initiate(config);
    rs.status();
`
  - connect to a mongo shell or switch to a different mongo shell
    - `mongo --port 27018`
  - run the init script
    - `mongo --port 27018 < init_replica.js`
  - get the replica set status
    - `rs.status()`
  - can't query secondary by default
    - `re.slaveOk()`
  - do query

### Replica Set Internals
- `oplog` (operation log)
- check the oplog `db.oplog.rs.find().pretty()`
- What if failover (E.g, kill the primary mongod shell)
  - if the primary fails, a secondary will become a primary
  - The entire dataset will be copied from the primary if a node comes back up as a secondary after a period of being offline and the oplog has looped on the primary.

### [Connecting to a Replica Set from the Node.js Driver](https://github.com/AshleyCheny/M101JS-CRSE/blob/master/Images/Connect to Replica Set via Driver.png)
- Step 1: start the 3 replica sets E.g, `mongod --port 30003 --replSet replica_set --dbpath /data/db/rs3`
- Step 2: config replica sets
  - initiate the replica set `rs.initiate()`
  - add other sets `rs.add("education.local: 30002")`
  - check the status: `rs.status()`;

## Questions
1. How to search in array of object in mongodb?
  - [Query an Array of embedded documents](https://docs.mongodb.com/manual/tutorial/query-array-of-documents/)
2. How to remove fields in a documents with specific queries?
  - ($unset)[https://docs.mongodb.com/manual/reference/operator/update/unset/]
3. How to check a field is null ?
  - [Query for null or missing fields](https://docs.mongodb.com/v3.2/tutorial/query-for-null-fields/)
4. How to understand index?
5. Why do we need aggregate method? What is the difference with mongodb queries?
