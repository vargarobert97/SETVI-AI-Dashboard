import { create } from "zustand";

interface Activity {
  id: string;
  type: "create" | "edit" | "ai_generate" | "ai_summarize";
  reportId: string;
  timestamp: Date;
}

interface ActivityStore {
  activities: Activity[];
  logActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
}

const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  logActivity: (activity) =>
    set((state) => ({
      activities: [
        ...state.activities,
        {
          ...activity,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date(),
        },
      ],
    })),
}));
