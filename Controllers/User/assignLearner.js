const { User, assignManager } = require("../../Models/User");

exports.assignLearner = async function(req, res, next) {
  const { error } = assignManager(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const manager = await User.findOne({ email: req.query.email });
  if (!manager) return res.status(404).send("User is not registered");

  await User.findOneAndUpdate(
    { email: req.query.email },
    { $set: { company: req.body.company, isLearner: true } },
    { new: true }
  );
  res.send("Role added");
};
