// src/context/CandidateContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CandidateContext = createContext();

export const useCandidates = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch candidates
  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/candidates");
      if (res.data && res.data.candidates) {
        setCandidates(res.data.candidates);
      } else {
        setCandidates([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // add a candidate (formData to allow file)
  const addCandidate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/candidates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCandidates((prev) => [res.data.candidate, ...prev]);
      return { success: true };
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // update status
  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/candidates/${id}/status`, { status });
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? res.data.candidate : c))
      );
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // delete candidate
  const deleteCandidate = async (id) => {
    try {
      await api.delete(`/candidates/${id}`);
      setCandidates((prev) => prev.filter((c) => c._id !== id));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        error,
        fetchCandidates,
        addCandidate,
        updateStatus,
        deleteCandidate,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
