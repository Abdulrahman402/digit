const multer = require("multer");
const express = require("express");

const { Module, validateTextContent } = require("../../Models/Module");

const router = express.Router();

const auth = require("../../Middleware/auth");
const isAdmin = require("../../Middleware/isAdmin");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "Image");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPic = multer(
  {
    storage: imageStorage,
    limits: {
      fileSize: 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/addPic/:id",
  auth,
  isAdmin,
  uploadPic.single("upload"),
  async (req, res) => {
    const module = await Module.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { content: req.file.path } },
      { new: true }
    );

    res.send(module);
  }
);

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "File");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadFile = multer(
  {
    storage: fileStorage,
    limits: {
      fileSize: 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("Please upload a pdf"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/addFile/:id",
  auth,
  isAdmin,
  uploadFile.single("upload"),
  async (req, res) => {
    const module = await Module.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { content: req.file.path } },
      { new: true }
    );

    res.send(module);
  }
);

router.post("/addText/:id", auth, isAdmin, async (req, res) => {
  const { error } = validateTextContent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const module = await Module.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { textContent: req.body.text } },
    { new: true }
  );

  res.send(module);
});

module.exports = router;