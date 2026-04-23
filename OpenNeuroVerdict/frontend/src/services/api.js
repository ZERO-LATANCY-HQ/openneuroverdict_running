import axios from "axios";

const API = axios.create({ baseURL: "https://openneuroverdict-running.onrender.com" });

export const analyzeCandidate = (resume, job_description) =>
  API.post("/analyze", { resume, job_description });
