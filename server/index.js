const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()

//middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

//MongoBd



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()

    const database = await client.db('users').collection('user')

    app.post('/add/user', async (req, res) => {
      const information = req.body

      const result = await database.insertOne(information)
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const cursor = database.find({})
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/find/user/:id', async (req, res) => {
      const id = req.params.id

      const query = { _id: new ObjectId(id) }

      const result = await database.findOne(query)
      res.send(result);
    })

    app.put('/user/update/:id' , async(req,res)=>{

      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};
      const data = req.body;
      const option = {upsert: true};
      const updateInformation = {
        $set:{
          name: data.name,
          email: data.email
        }
      }

      const result = await database.updateOne(filter, updateInformation, option);
      res.send(result);
      //console.log(data)

    });

    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id

      const query = { _id: new ObjectId(id) }

      const result = await database.deleteOne(query)
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  console.log('Server')
})

app.listen(port, (req, res) => {
  console.log(`server running in ${port}`)
})
