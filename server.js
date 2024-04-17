const express = require("express");
const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();

// Env 
require('dotenv').config({
    path: "./env"
});

app.use(express.json())
app.use(cookieParser())

// save uploaded image as a name
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../client/public/upload")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({storage})

app.post('/api/upload', upload.single('file'), function (req, res){
    const file = req.file;
res.status(200).json(file.filename)
})
app.use('api/auth',authRoutes)
app.use('api/user',usersRoutes)
app.use('api/posts',postRoutes)




app.listen(8080, () => {
    console.log("Connected");
})