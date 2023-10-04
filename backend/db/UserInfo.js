const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    user_id:String,
    meta_key:String,
    meta_value:String
 })

 module.exports = mongoose.model("userinfos", userInfoSchema)