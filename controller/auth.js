const db = require("../client/pg.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (res, req) => {
    // check existing user
    const queries = "SELECT * FROM users WHERE email ? OR username = ?"
    db.query(queries, [req.body.email, req.body.name], (err,data) => {
        if(err) return res.json(err)

        if(data.length) return res.status(409).json('user is already exist');

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const queries = "INSERT INTO users('username', 'email','password') values (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(queries, [values], (err, data) => {
            if(err) return res.json(err); //show error
            return res.status(200).json('user has been created.');
            
        })
    })
}
const login = (res, req) => {

//check user

const queries = "SELECT * FROM users where username = ? "

db.query(queries, [req.body.username], (err,data) => {
    if (err) return res.json(err);
    if(data.length == 0) return res.status(404).json("user not found!")

    //check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if(!isPasswordCorrect) return res.status(400).json("wrong username password")
    const token = jwt.sign({id:data[0].id}, "it's secret")
    const {password, ...other} = data[0]
    res.cookie("response_token", token , {
        httpOnly:true
    }).status(200).json(...other)
})
}
const logout = (res, req) => {
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("user has been logout")
}

exports.module = {
    register,
    login,
    logout
}