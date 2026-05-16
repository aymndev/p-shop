

const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"shop_p"
});

db.connect((err)=>{
    if(err){
        console.log("DB connection error !",err);

    }else{
        console.log("DB connected")

    }

});
module.exports = db;