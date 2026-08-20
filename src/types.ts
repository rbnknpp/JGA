export interface EventConfig {
  participants: string[];
  groomIndex: number;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Progress {
  status: SubmissionStatus;
  photoUrl?: string;
  note?: string;
  submittedBy?: string;
  approvedBy?: string;
  updatedAt?: number;
}

export type ProgressMap = Record<string, Progress>;
