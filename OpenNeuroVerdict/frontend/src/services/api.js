import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const analyzeCandidate = (resume, job_description) =>
  API.post("/analyze", { resume, job_description });
