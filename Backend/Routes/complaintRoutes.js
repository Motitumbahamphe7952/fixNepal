const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  toogleVote,
} = require("../Controllers/complaintController");
const { isAuthenticated } = require("../Middlewares/isAuthenticated");
const { isAuthorized } = require("../Middlewares/isAuthorized");
const upload = require("../Config/multerConfig");

// Create a new complaint
router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  createComplaint,
);
router.get("/allcomplaints", getAllComplaints);
router.get("/mycomplaints", isAuthenticated, getMyComplaints);
router.get("/:id", getComplaintById);

router.put("/:id/status", isAuthenticated, isAuthorized, updateComplaintStatus);
router.delete("/:id/delete", isAuthenticated, deleteComplaint);

router.post("/:id/vote", isAuthenticated,toogleVote);

module.exports = router;
