import axios from "axios";
import type {AuditLog} from "./types/audit-log.ts";

const baseUrl = "http://modern-store.local:8080/api/audit-logs";

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getAuditLogs(): Promise<AuditLog[]> {
  try {
    const response = await api.get(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetch audit logs failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}


