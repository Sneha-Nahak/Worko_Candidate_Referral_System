// src/components/CandidateCard.jsx
import React from "react";
import CandidateStatusDropdown from "./CandidateStatusDropdown";

export default function CandidateCard({ candidate, onStatusChange, onDelete }) {
  const { name, jobTitle, status, email, phone, resumeUrl, createdAt } = candidate;

  return (
    <article className="card">
      <div className="card-left">
        <h3 className="card-name">{name}</h3>
        <p className="card-job">{jobTitle}</p>
        <p className="card-meta">
          <span>{email}</span> · <span>{phone}</span>
        </p>
        <p className="card-time">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <div className="card-right">
        <div className="card-actions">
          <CandidateStatusDropdown
            current={status}
            onChange={(s) => onStatusChange(candidate._id, s)}
          />
          <a
            href={resumeUrl ? `/${resumeUrl}` : "#"}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-outline ${!resumeUrl ? "disabled" : ""}`}
          >
            View Resume
          </a>
        </div>

        <button className="btn btn-danger" onClick={() => onDelete(candidate._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
