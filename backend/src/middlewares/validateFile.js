module.exports = (req, res, next) => {
  if (req.file && req.file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF resumes accepted"
    });
  }
  next();
};
