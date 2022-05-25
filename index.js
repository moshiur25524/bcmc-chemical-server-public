const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// middleWare
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pha5pic.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const chemicalCollection = client.db('BCMC_Chemicals').collection('chemicals');

    app.get('/chemicals', async(req, res)=>{
      const chemicals = await chemicalCollection.find({}).toArray()
      res.send(chemicals)
      console.log('working');
    })

  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('BCMC Chemical Server')
})

app.listen(port, () => {
  console.log('listening', port);
})