const express = require("express");
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } = require('graphql')
const path = require('path')
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const House = require('./Schema/House')
const dotenv = require("dotenv");
dotenv.config();
const { DATABASE_URL, PORT } = process.env;
const fs = require('fs/promises')


const app = express();
mongoose.connect(DATABASE_URL)

async function seedDB() {

  const client = new MongoClient(DATABASE_URL, {
    useNewUrlParser: true
  });

  try {
    await client.connect();
    console.log('db connected')

    const collection = client.db('airbnb').collection('houses');
    collection.drop();
    let houseData = []

    let data = await fs.readFile('houses.json', 'utf-8', () => data)
    data = JSON.parse(data)
    for (let i = 0; i < data.length; i++) {
      const house = {
        zipcode: data[i].zipcode,
        city: data[i].city,
        streetaddress: data[i].streetaddress,
        country: data[i].country,
        state: data[i].state,
        home_type: data[i].home_type,
        prop_type: data[i].prop_type,
        latitude: data[i].latitude,
        longitude: data[i].longitude
        }
      houseData.push(house)
    }
    collection.insertMany(houseData)

  } catch (err) {
    console.log('error:', err.stack)
  }
}
//seedDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const HouseType = new GraphQLObjectType({
  name: 'House',
  description: 'Represents an available house',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    zipcode: { type: GraphQLInt },
    city: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    home_type: { type: GraphQLString },
    prop_type: { type: GraphQLString },
    latitude: { type: GraphQLInt },
    longitude: { type: GraphQLInt },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    homes: {
      type: new GraphQLList(HouseType),
      description: 'List of houses',
      args: {
        id: { type: GraphQLList(GraphQLString) },
        country: { type: GraphQLString },
        prop_type: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const data = await House.find()
        console.log(data[0])
        if (Object.keys(args).length === 0) return data
        if ('country' in args)  return data.filter(data => args.country === data.country)
        else if ('prop_type' in args) return data.filter(data => args.prop_type === data.prop_type)
        else if ('id' in args) {
          let output = []
          for (let i = 0; i < args.id.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (args.id[i] == data[j]._id) output.push(data[j])
            }
          }          
          return output
        } 
      }
    },
    house: {
      type: HouseType,
      description: 'Single house',
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (parent, args) => await House.findById(args.id)
    },
    

  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  grapgiql: true
}))


// GET HOMES
app.get("/api/homes", async (req, res) => {
  const data = await House.find()
  res.status(200).header('application/json').send(data)
});

// GET homes by ID
app.get("/api/homes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const data = await House.findById(id)
  res.status(200).header('application/json').send(data)  
});


// GET HOMES by Country
app.get("/api/homes/country/:country", async (req, res) => {
  const country = req.params.country;
  const data = await House.find({ country: country })
  res.status(200).header('application/json').send(data) 
});

// GET HOMES by Property Type
app.get("/api/homes/type/:prop_type", async (req, res) => {
  const prop_type = req.params.prop_type;
  const data = await House.find({ prop_type: prop_type })
  res.status(200).header('application/json').send(data) 
});

//GET Wishlist
app.post('/api/wishlist', async (req,res) => {
  const wishlist = req.body.idList
  const data = await House.find({_id: wishlist})
  res.status(200).header('application/json').send(data) 
})




app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});