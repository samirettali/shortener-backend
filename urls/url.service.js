const db = require("helpers/db");
const Url = db.Url;

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 8);

module.exports = {
  create,
  getAll,
  getById,
  delete: _delete,
};

async function create(data) {
  const url = new Url(data);
  url.id = nanoid();
  return await url.save();
}

async function getAll(owner) {
  return await Url.find({ owner: owner });
}

async function getById(id) {
  return await Url.findOneAndUpdate({ id: id }, { $inc: { clicks: 1 } });
}

async function _delete(id) {
  await Url.deleteOne({ id: id });
}
