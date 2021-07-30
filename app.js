const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const routes = require('./routes/index.js')
const csrfMiddleware = csrf({ cookie: true });
app.use(bodyParser.json())
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert:fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)
sslServer.listen(3000, console.log('listening'))
//app.listen(3000, console.log('listening'))