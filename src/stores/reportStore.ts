import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportStore {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "createdAt" | "updatedAt">) => void;
  updateReport: (id: string, updates: Partial<Omit<Report, "id">>) => void;
  deleteReport: (id: string) => void;
  reorderReports: (startIndex: number, endIndex: number) => void;
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: [],
      addReport: (report) =>
        set((state) => ({
          reports: [
            ...state.reports,
            {
              ...report,
              id: Math.random().toString(36).substring(2, 9),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateReport: (id, updates) =>
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? {
                  ...report,
                  ...updates,
                  updatedAt: new Date(),
                }
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
    }),
    {
      name: "report-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
