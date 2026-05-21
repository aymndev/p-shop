
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
//Create AUTH routes in backend
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken=require("./middleware/authMiddleware");
const roleMiddleware =require('./middleware/roleMiddelware') ;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('backend work !')
});


app.get('/test-db', (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) return res.send("DB error ");
        res.send("db connected + query work !");
    });
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const email =req.body.email;
    const role =req.body.role;
    const password =req.body.password;
    if (!name) {
        return res.status(400).send("name is not found");
    }
    db.query(
        'INSERT INTO users (user_name,email,password,role) VALUES (?,?,?,?)',
        [name,email,password,role],
        (err, result) => {
            if (err) return res.send(err);
            res.send({
                id: result.insertId,
                name: name,
                email:email,
                password:password,
                role:role



            });
        }

    );

});
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields required");
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.send(err);
        db.query(
            "INSERT INTO users (user_name, email, password) VALUES (?,?,?)",
            [name, email, hash],
            (err, result) => {
                if (err) return res.send(err);
                res.status(201).json({
                    message: "User created",
                    id: result.insertId
                });
            }

        );
    });

});
// for products
app.post("/product",verifyToken,roleMiddleware('admin'),(req,res)=>{
    const { name, description, price, stock, image }=req.body;
    db.query("INSERT INTO products (name, description, price, stock, image) VALUES (?,?,?,?,?)",
        [name,description,price,stock,image],
        (err,result)=>{
            if (err) return res.send(err);
            res.status(201).json({
                message:"the product is being created ",
                id : result.insertId
            });
        }
    );
});
app.delete("/product/:id",verifyToken,roleMiddleware('admin'), (req,res)=>{
    const product= req.params.id;

    db.query("DELETE FROM products WHERE product_id = ? ",
        [product],
        (err,result)=>{
            if(err){
                return res.status(500).send("internal server eror ")
            }
            const e= result.affectedRows;
            if(e===1){
                return res.status(200).send("the product is being deleted !");
            }else{
                return res.status(404).send("the product not found ");
            }
        }
    )


})
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, result) => {
            if (err) return res.send(err);
            if (result.length === 0) {
                return res.status(404).send("User not found");
            }
            const user = result[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.status(401).send("Wrong password");
                }

                // create token
                const token = jwt.sign(
                    { id: user.user_id, 
                    email: user.email,
                    role:user.role
                
                },
                    "secretkey",
                    { expiresIn: "1h" }
                );

                res.json({
                    message: "Login successful",
                    token
                });
            });

        }
    )
})
app.delete('/users/:id',verifyToken,roleMiddleware('admin') ,(req, res) => {
    const user = req.params.id;


    if (req.params.id == req.user.id) {
        return res.status(403).send("You can't delete yourself");
    }


    db.query(`DELETE  FROM users WHERE user_id=?`,
        [user],

        (err, result) => {
            if (err) {
                return res.status(500).send("Internal server error");

            } else {
                const r = result.affectedRows;
                if (r === 1) {
                    return res.status(200).send("the user is deleted  ")
                } else {
                    return res.status(404).send('the user is not found ');
                }
            }

        })


})

app.get('/users',verifyToken, (req, res) => {
    db.query("SELECT user_id, user_name, email, role  FROM users", (err, result) => {
        if (err) return res.status(500).send(err);

        res.send(result);
    })



});

app.get('/products', (req, res) => {
    res.send("products")
})

app.listen(3000, () => {
    console.log("the sever work !")
});




