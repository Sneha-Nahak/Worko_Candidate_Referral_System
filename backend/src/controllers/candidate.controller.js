const Candidate = require("../models/candidate.model");

// POST - create candidate
exports.createCandidate = async (req, res) => {
  try {
    const resumeUrl = req.file ? req.file.path : null;

    const candidate = await Candidate.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      jobTitle: req.body.jobTitle,
      resumeUrl
    });

    res.status(201).json({
      success: true,
      message: "Candidate added successfully",
      candidate
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET - all candidates
exports.getCandidates = async (req, res) => {
  const candidates = await Candidate.find().sort({ createdAt: -1 });
  res.json({ success: true, candidates });
};

// PUT - update candidate status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({
    success: true,
    message: "Status updated",
    candidate
  });
};

// DELETE - remove candidate
exports.deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Candidate deleted" });
};
