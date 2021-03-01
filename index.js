const express = require("express");
const mongoose = require("mongoose");
const regiter = require("./router/router");
const path = require("path");
require("dotenv").config();

//App express
const app = express();


app.use(express.json());

try {
  mongoose.connect("mongodb://localhost:27017/restchatjwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log("CONECTADO A BASE DE DADOS");
} catch (error) {
  console.log(error);

  throw new Error("ERRO NA CONXACAO COM BANCO DE DADOS");
}

app.use(regiter);
//Node serve
const serve = require("http").createServer(app);
module.exports.io = require("socket.io")(serve);
require("./socket/socket");
//messagens

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

serve.listen(process.env.PORT, process.env.IP, (err) => {
  if (err) throw new Error(err);
  console.log("servidor iniciado na porta", process.env.PORT, process.env.IP);
});
