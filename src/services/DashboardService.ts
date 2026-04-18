import { http } from "../lib/fetcher";

export interface DashboardStats {
    totalStudents?: number;
    totalGeneralLetters?: number;
    totalStudentLettersAccepted?: number;
    totalOfficials?: number;
    totalLetterTypes?: number;
}

export interface ChartData {
    date: string;
    general: number;
    student: number;
}

export interface RecentLetter {
    id: number;
    name: string;
    createdAt: string;
    student: {
        fullname: string;
        nim: string;
    };
    letter: {
        letterName: string;
    };
}

export interface RecentSignature {
    id: number;
    verifiedAt: string;
    official: {
        name: string;
        occupation: string;
        nip: string;
    };
    studentLetterSubmission?: {
        name: string;
        letter: {
            letterName: string;
        };
    } | null;
    generalLetterSubmission?: {
        name: string;
        letter: {
            letterName: string;
        };
    } | null;
}

export const dashboardService = {
  async getStats() {
    return await http<{ data: DashboardStats }>("dashboard/stats", {
      method: "GET",
      auth: true,
    });
  },

  async getCharts() {
    return await http<{ data: ChartData[] }>("dashboard/charts", {
      method: "GET",
      auth: true,
    });
  },

  async getRecentPending() {
    return await http<{ data: RecentLetter[] }>("dashboard/recent-pending", {
      method: "GET",
      auth: true,
    });
  },

  async getRecentSignatures() {
    return await http<{ data: RecentSignature[] }>("dashboard/recent-signatures", {
      method: "GET",
      auth: true,
    });
  },
};
