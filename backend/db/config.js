const mongoose = require('mongoose')
const dbName = 'react-app'
const dbUri = `mongodb://0.0.0.0:27017/${dbName}`
mongoose.connect(dbUri).then(()=>{
    console.log("Connected to Database");
  }).catch((err)=>{
    console.log("Not Connected to Database ERROR! ", err);
  });