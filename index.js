const express = require('express')
const app = express()

var cors = require('cors')

require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT ||  8000

app.use(express.json())
app.use(cors())


const uri = `mongodb://${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}@ac-mvazqsy-shard-00-00.hpy6sqt.mongodb.net:27017,ac-mvazqsy-shard-00-01.hpy6sqt.mongodb.net:27017,ac-mvazqsy-shard-00-02.hpy6sqt.mongodb.net:27017/?ssl=true&replicaSet=atlas-vll8ae-shard-0&authSource=admin&retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collagesCollection = client.db("collagely").collection("allcollage");

    app.get('/collages', async (req, res) => {
        const result = await collagesCollection.find().toArray();
        res.send(result);
      });



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! THIS IS COLLAGELY')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})