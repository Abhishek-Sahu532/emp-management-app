import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetails,
  getAllUsers,
  deleteEmpDetails
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

let router = express.Router();

router.route("/sign-up").post(registerUser);
router.route("/sign-in").post(loginUser);
router.route("/sign-out").get(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/emp-details").get(verifyJWT, getAllUsers);
router.route("/update-emp-details/:employeeID").put(verifyJWT, updateAccountDetails);


router.route("/delete-emp-details/:employeeID").delete(verifyJWT, deleteEmpDetails);
export default router;
