const express = require("express");

const router = express.Router();

const auth = require("../Middleware/auth");
const isManager = require("../Middleware/isManager");
const isTrainingManager = require("../Middleware/isTrainingManager");

const addTraining = require("../Controllers/Training/addTraining");
const addMandatoryCourse = require("../Controllers/Training/addMandatoryCourse");
const addOptionalCourse = require("../Controllers/Training/addOptionalCourse");
const displayTraining = require("../Controllers/Training/displayTraining");
const assignLearner = require("../Controllers/Training/assignLearner");
const assignTrainingManager = require("../Controllers/Training/assignTrainingManager");
const removeCourse = require("../Controllers/Training/removeCourse");
const updateTitle = require("../Controllers/Training/updateTitle");
const updateDescription = require("../Controllers/Training/updateDescription");
const updateSpeciality = require("../Controllers/Training/updateSpeciality");
const updateDate = require("../Controllers/Training/updateDate");

router.post(
  "/addTraining",
  auth,
  (isManager, isTrainingManager),
  addTraining.addTraining
);

router.put(
  "/addMandatoryCourse/:trainingId/:courseId",
  auth,
  (isManager, isTrainingManager),
  addMandatoryCourse.addMandatoryCourse
);

router.put(
  "/addOptionalCourse/:trainingId/:courseId",
  auth,
  (isManager, isTrainingManager),
  addOptionalCourse.addOptionalCourse
);

router.put(
  "/removeCourse/:trainingId/:courseId",
  auth,
  (isManager, isTrainingManager),
  removeCourse.removeCourse
);

router.put(
  "/assignLearner/:trainingId/:userId",
  auth,
  (isManager, isTrainingManager),
  assignLearner.assignLearner
);

router.put(
  "/assignTrainingManager/:trainingId/:userId",
  auth,
  (isManager, isTrainingManager),
  assignTrainingManager.assignTrainingManager
);

router.put(
  "/updateTitle/:id",
  auth,
  (isManager, isTrainingManager),
  updateTitle.updateTitle
);

router.put(
  "/updateDescription/:id",
  auth,
  (isManager, isTrainingManager),
  updateDescription.updateDescription
);

router.put(
  "/updateSpeciality/:id",
  auth,
  (isManager, isTrainingManager),
  updateSpeciality.updateSpeciality
);

router.put(
  "/updateDate/:id",
  auth,
  (isManager, isTrainingManager),
  updateDate.updateDate
);

router.get("/displayTraining", auth, displayTraining.displayTraining);

module.exports = router;
