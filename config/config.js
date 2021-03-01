const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/restchatjwt", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("CONECTADO A BASE DE DADOS")
  } catch (error) {
    console.log(error);

    throw new Error("ERRO NA CONXACAO COM BANCO DE DADOS");
  }
};

module.exports = { dbConnection };
