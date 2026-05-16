
const express = require('express');
const cors =require('cors');
const db =require('./config/db');
//Create AUTH routes in backend
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('backend work !')
});


app.get('/test-db',(req,res)=>{
    db.query("SELECT 1",(err,result)=>{
        if (err) return res.send("DB error ");
        res.send("db connected + query work !");
    });
});

app.post('/users',(req,res)=>{
    const name=req.body.name;
    if(!name){
        return res.status(400).send("name is not found");
    }
    db.query(
        'INSERT INTO users (user_name) VALUES (?)',
        [name],
        (err,result)=>{
            if (err) return res.send(err);
            res.send({
                id:result.insertId,
                name : name
            });
        }

    );

});

app.get('/users',(req,res)=>{
    db.query("SELECT * FROM users",(err,result)=>{
        if (err) return res.status(500).send(err);

        res.send(result);
    })

    

});
app.get('/products',(req,res)=>{
    res.send("products")
})

app.listen(3000,()=>{
    console.log("the sever work !")
});