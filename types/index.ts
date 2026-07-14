export interface Profile {
  name: string;
  role: string;
  stack: string[];
  location: string;
  email: string;
  phone: string;
  summary: string;
}

export interface BoxModelStat {
  label: string;
  value: string;
  sub: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  file: string;
  lines: string[];
}

export interface Project {
  name: string;
  desc: string;
  stack: string[];
  url: string | null;
  status: "200" | "304";
  statusLabel: string;
  method: "GET";
}

export type DependencyEntry = [name: string, version: string];

export interface Dependencies {
  dependencies: DependencyEntry[];
  devDependencies: DependencyEntry[];
  competencies: string[];
}

export interface NavTab {
  id: "elements" | "sources" | "network" | "console";
  label: string;
}
