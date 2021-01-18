const express = require('express')
const path = require('path')
require('dotenv').config();


//App express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//Node serve
const serve = require('http').createServer(app);
module.exports.io = require('socket.io')(serve);
require('./socket/socket')
//messagens

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


serve.listen(process.env.PORT, process.env.IP,(err) => {
    if (err) throw new Error(err);
    console.log('servidor iniciado na porta', process.env.PORT,process.env.IP);
});