const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signUp,
  signIn,
  getUniqueData,
  getAllData,
  updateUserData,
  deleteUserData
} = require("../Controller/userController");

//Auth and Profile Related
router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.get(
  "/getUniqueData",
  passport.authenticate("jwt", { session: false }),
  getUniqueData
);

router.get(
  "/getAllData",
  passport.authenticate("jwt", { session: false }),
  getAllData
);

router.put(
  "/updateUserData",
  passport.authenticate("jwt", { session: false }),
  updateUserData
);

router.delete(
  "/deleteUserData",
  passport.authenticate("jwt", { session: false }),
  deleteUserData
);

module.exports = router;
