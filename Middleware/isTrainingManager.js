module.exports = (req, res, next) => {
  if (!req.user.isTrainingManager)
    return res.status(401).send("Authorization failed");
  next();
};
