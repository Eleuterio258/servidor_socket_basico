const express = require("express");

const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controller/auth");
const { validateInput}  = require("../middleware/valitate-input");
const { validarJWT } = require("../middleware/validar-jwt");


const router = express.Router();
router.post(
  "/create",
  [
    check("username", "username é obrigatório").not().isEmpty(),
    check("password", "senha é obrigatório").not().isEmpty(),
    check("fullname", "nome completo é obrigatório").not().isEmpty(),
    check("email", "email é obrigatório").isEmail(),
    validateInput,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("password", "senha é obrigatório").not().isEmpty(),
    check("email", "email é obrigatório").isEmail(),
    validateInput,
  ],
  login
);

router.get("/renew", validarJWT, renewToken);
module.exports = router;
