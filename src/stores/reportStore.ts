// stores/reportStore.ts
import { create } from "zustand";

interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportStore {
  reports: Report[];
  setReports: (reports: Report[]) => void;
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  reorderReports: (startIndex: number, endIndex: number) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  setReports: (reports) => set({ reports }),
  addReport: (report) =>
    set((state) => ({ reports: [...state.reports, report] })),
  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id
          ? { ...report, ...updates, updatedAt: new Date() }
          : report
      ),
    })),
  deleteReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    })),
  reorderReports: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.reports);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { reports: result };
    }),
}));
