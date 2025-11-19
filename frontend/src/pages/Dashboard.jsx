// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import CandidateCard from "../components/CandidateCard";

export default function Dashboard() {
  const { candidates, loading, error, updateStatus, deleteCandidate } = useCandidates();
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // derived filtered list
  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesQuery =
        c.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = filterStatus === "All" ? true : c.status === filterStatus;
      return matchesQuery && matchesStatus;
    });
  }, [candidates, query, filterStatus]);

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this candidate?")) return;
    await deleteCandidate(id);
  };

  // Metrics
  const total = candidates.length;
  const byStatus = {
    Pending: candidates.filter((c) => c.status === "Pending").length,
    Reviewed: candidates.filter((c) => c.status === "Reviewed").length,
    Hired: candidates.filter((c) => c.status === "Hired").length,
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <div className="metrics">
          <div className="metric">
            <div className="metric-value">{total}</div>
            <div className="metric-label">Total</div>
          </div>
          <div className="metric">
            <div className="metric-value">{byStatus.Pending}</div>
            <div className="metric-label">Pending</div>
          </div>
          <div className="metric">
            <div className="metric-value">{byStatus.Reviewed}</div>
            <div className="metric-label">Reviewed</div>
          </div>
          <div className="metric">
            <div className="metric-value">{byStatus.Hired}</div>
            <div className="metric-label">Hired</div>
          </div>
        </div>
      </header>

      <div className="filters">
        <input
          type="search"
          className="search"
          placeholder="Search by name, job title or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      <div className="list">
        {loading && <div className="empty">Loading candidates...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && filtered.length === 0 && (
          <div className="empty">No candidates found — try different filters.</div>
        )}

        {filtered.map((c) => (
          <CandidateCard
            key={c._id}
            candidate={c}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
