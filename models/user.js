const { Schema, model } = require("mongoose");
const Userchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true ,unique:true},
  fullname: { type: String, required: true },
  online: { type: Boolean, default: false },
});

Userchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});
module.exports = model("User", Userchema);
