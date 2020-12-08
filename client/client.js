const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology: true})
        .then(()=>("DB connection successful"))
        .catch(err=>console.error(err.message))



const client = mongoose.connection;
client.on("error",(err)=>{
    console.error(err.message);
})

module.exports = client;
