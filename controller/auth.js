const { response } = require("express");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const { generateJWT } = require("../util/jwt");
const bcrypt = require("bcryptjs");
const createUser = async (req, res = response) => {
  const { email, username, password } = req.body;
  try {
    const exitEmail = await User.findOne({ email });

    if (exitEmail) {
      return res.status(500).json({ ok: false, msg: "o email ja Existe" });
    }
    const exitUsername = await User.findOne({ username });
    if (exitUsername) {
      return res.status(500).json({ ok: false, msg: "o usuario ja Existe" });
    }

    const usuario = new User(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.json({ ok: true, msg: usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await User.findOne({ email });
    const passwordValida = bcrypt.compareSync(password, usuarioDB.password);
    if (!usuarioDB || !passwordValida) {
      return res
        .status(404)
        .json({ ok: false, msg: "O email ou senha está incorreto" });
    }
    const token = await generateJWT(usuarioDB.id);
    res.json({ ok: true, msg: usuarioDB, token, token });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor contacte o administrador" });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token,
  });
};
module.exports = { createUser, login, renewToken };
