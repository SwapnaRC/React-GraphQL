const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors =require('cors');


const app= express();

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://graphql-db:swapna55@cluster0-sdktk.mongodb.net/test');
mongoose.connection.once('open', ()=>{
console.log('connected to DB');
});

// bind express with graphql
app.use('/graphql',graphqlHTTP({
    schema,
    // to use graphiql tool
    graphiql: true
}));

app.listen(4000,()=>{
console.log('listening the port request port 4000')
});

