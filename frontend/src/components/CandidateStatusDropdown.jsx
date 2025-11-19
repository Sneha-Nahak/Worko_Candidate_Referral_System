// src/components/CandidateStatusDropdown.jsx
import React, { useState } from "react";

const STATUSES = ["Pending", "Reviewed", "Hired"];

export default function CandidateStatusDropdown({ current, onChange }) {
  const [value, setValue] = useState(current || "Pending");
  const handle = async (e) => {
    const v = e.target.value;
    setValue(v);
    if (onChange) await onChange(v);
  };

  return (
    <select
      className="status-select"
      value={value}
      onChange={handle}
      aria-label="Update status"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
