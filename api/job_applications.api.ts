import { Application, count, countProgress } from "@/types/application";
import api from "./api";

export async function getApplications(): Promise<Application[]> {
  const response = await api.get<Application[]>("/job-application");
  return response.data;
}

export async function getApplicationsCountByMonth(
  year: string
): Promise<count[]> {
  const response = await api.get<count[]>(
    `/job-application/count/by-month/${year}`
  );
  return response.data;
}

export async function getApplicationsProgress(
  year: string
): Promise<countProgress[]> {
  const response = await api.get<countProgress[]>(
    `/job-application/progress/${year}`
  );
  return response.data;
}

export async function createApplications(
  body: Omit<Application, "id">
): Promise<Application> {
  const response = await api.post<Application>(`/job-application`, body);
  return response.data;
}
