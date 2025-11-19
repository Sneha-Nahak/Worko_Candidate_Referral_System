// src/pages/ReferralForm.jsx
import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import { useNavigate } from "react-router-dom";

export default function ReferralForm() {
  const { addCandidate } = useCandidates();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return setResume(null);
    // restrict pdf only
    if (f.type !== "application/pdf") {
      setFeedback({ type: "error", message: "Resume must be a PDF file." });
      e.target.value = "";
      return;
    }
    setFeedback(null);
    setResume(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    // basic front validation
    if (!form.name || !form.email || !form.phone || !form.jobTitle) {
      setFeedback({ type: "error", message: "Please fill all required fields." });
      setSubmitting(false);
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("jobTitle", form.jobTitle);
    if (resume) fd.append("resume", resume);

    const res = await addCandidate(fd);
    if (res.success) {
      setFeedback({ type: "success", message: "Candidate referred successfully." });
      // clear form
      setForm({ name: "", email: "", phone: "", jobTitle: "" });
      setResume(null);
      // redirect to dashboard after small delay
      setTimeout(() => navigate("/"), 800);
    } else {
      setFeedback({ type: "error", message: res.message || "Failed to add candidate." });
    }
    setSubmitting(false);
  };

  return (
    <section className="page narrow">
      <header className="page-header">
        <h1>Refer a Candidate</h1>
        <p className="muted">Fill candidate details and attach resume (optional .pdf)</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">Full name</span>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="input"
            placeholder="Jane Doe"
          />
        </label>

        <label className="label">
          <span className="label-text">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="input"
            placeholder="jane@example.com"
          />
        </label>

        <label className="label">
          <span className="label-text">Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            className="input"
            placeholder="+91 98765 43210"
          />
        </label>

        <label className="label">
          <span className="label-text">Job Title</span>
          <input
            name="jobTitle"
            value={form.jobTitle}
            onChange={onChange}
            required
            className="input"
            placeholder="Frontend Developer"
          />
        </label>

        <label className="label">
          <span className="label-text">Resume (.pdf only)</span>
          <input type="file" accept="application/pdf" onChange={onFile} className="file" />
          {resume && <div className="file-name">{resume.name}</div>}
        </label>

        {feedback && (
          <div className={`alert ${feedback.type === "error" ? "alert-error" : "alert-success"}`}>
            {feedback.message}
          </div>
        )}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Refer Candidate"}
          </button>
        </div>
      </form>
    </section>
  );
}
