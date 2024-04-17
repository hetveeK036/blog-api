//1.38 add category post table in database
//1.42 change in database
//1.57 add post in database
//1.59 add category in posts database
const db = require('../client/pg.js')
const jwt = require('jsonwebtoken')


export const getPosts = (res, req) =>{
    // res.json("this is from controller auth")
    const quires = req.query.cat ? "SELECT *FROM posts where cat = ? ": "SELECT * FROM posts";

    db.query(quires, [req.query.cat], (err, data) => {
        if(err) return res.status(500)``.send(err);

        return res.status(200).json(data)
    })
}


export const getPost = (res, req) =>{
const queries = "SELECT p.id ,`username`, `title`, `description`, `img`, `cat`, `date` FROM users u JOIN posts p ON u.id === p.uid WHERE p.id = ?"};

db.query(queries, [req.params.id], (err, data) => {
    if(err) return res.status(500).json(err)

    return res.status(200).json(data)
})


export const addPost = (res, req) =>{
    const token = res.cookies.access_token;

    if(!token) return res.status(401).json("not authenticated!")  

    jwt.verify(token,"jwtkey", (err, userInfo) => {
       if(err) return res.status(403).json("token is not valid!"); 
        
       const queries = "INSERT INTO posts (`title`, `description`, `img` ,`cat`,`date`, `uid`) VALUES (?) "
        
       const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
       ]
       db.query(queries, [values], (err, res) => {
            if(err) return res.status(500).json(err)
            return res.json("post has been created.")
       });
    })
   
};


export const deletePost = (res, req) =>{
 const token = res.cookies.access_token
 if(!token) return res.status(401).json("not authenticated!")   
 jwt.verify(token,"jwtkey", (err, userInfo) => {
    if(err) return res.status(403).json("token is not valid!")

    const postId = req.params.id

    const queries = "SELECT FROM posts WHERE `id` = ? AND `uid` =? "

    db.query(queries, [postId,userInfo.id], (err,data) => {
        if(err) return res.status(403).json("You can delete only ")
        return res.json("post has been deleted!")
    })
})
}


export const updatePost = (res, req) =>{
    const token = res.cookies.access_token;

    if(!token) return res.status(401).json("not authenticated!")  

    jwt.verify(token,"jwtkey", (err, userInfo) => {
       if(err) return res.status(403).json("token is not valid!"); 
        
       const postId = req.params.id
       const queries = "UPDATE posts SET `title` = ?,`description` = ?,`img` =? ,`cat` = ? WHERE `id` = ? AND `uid` = ? "
        
       const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
     ,
       ]
       db.query(queries, [...values, postId, userInfo.id], (err, res) => {
            if(err) return res.status(500).json(err)
            return res.json("post has been updated.")
       });
    })
   
}
