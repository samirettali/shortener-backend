const express = require("express");
const router = express.Router();
const urlService = require("./url.service");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  urlService
    .create({ url: req.body.url, owner: req.user.sub })
    .then((url) => res.json(url))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  urlService
    .getAll(req.user.sub)
    .then((urls) => res.json(urls))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  urlService
    .getById(req.params.id)
    .then((url) => (url ? res.redirect(url.url) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  urlService
    .delete(req.params.id, req.user.sub)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
