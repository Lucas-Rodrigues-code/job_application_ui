import {
  Application,
  count,
  countProgress,
  JobApplicationGetAllResponse,
} from "@/types/application";
import api from "./api";

export async function getApplications(
  skip: number,
  take: number
): Promise<JobApplicationGetAllResponse> {
  const response = await api.get<JobApplicationGetAllResponse>(
    `/job-application?skip=${skip}&take=${take}`
  );
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

export async function updateApplication(
  body: Omit<Application, "id">,
  id: string
): Promise<Application> {
  const response = await api.put<Application>(`/job-application/${id}`, body);
  return response.data;
}

export async function deleteApplication(id: string): Promise<void> {
  await api.delete<void>(`/job-application/${id}`);
}
