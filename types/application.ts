export type Application = {
  id: string;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
  notes: string;
};

export type count = {
  month: string;
  count: number;
};

export type countProgress = {
  name: string;
  data: number[];
};
