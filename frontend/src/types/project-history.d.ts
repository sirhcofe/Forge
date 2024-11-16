interface ProjectAttempts {
  score: number;
  attestationLink?: string;
  date: number;
}

export type ProjectHistoryType = {
  projectTItle: string;
  attempts: ProjectAttempts[];
};
