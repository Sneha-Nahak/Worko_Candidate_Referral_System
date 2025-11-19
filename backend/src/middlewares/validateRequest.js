module.exports = (req, res, next) => {
  const { name, email, phone, jobTitle } = req.body;

  if (!name || !email || !phone || !jobTitle) {
    return res.status(400).json({
      success: false,
      message: "All fields except resume are required"
    });
  }

  // Email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  // Phone Format (basic)
  if (phone.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number"
    });
  }

  next();
};
