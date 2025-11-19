const express = require("express");
const router = express.Router();

const upload = require("../utils/upload");
const validateRequest = require("../middlewares/validateRequest");
const { createCandidate, getCandidates, updateStatus, deleteCandidate } =
  require("../controllers/candidate.controller");

// Create Candidate
router.post(
  "/",
  upload.single("resume"),
  validateRequest,
  createCandidate
);

// Get All
router.get("/", getCandidates);

// Update Status
router.put("/:id/status", updateStatus);

// Delete
router.delete("/:id", deleteCandidate);

module.exports = router;
