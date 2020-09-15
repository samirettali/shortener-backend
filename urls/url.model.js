const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type: String,
    required: false,
  },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Url", schema);
