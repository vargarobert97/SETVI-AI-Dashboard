import { useEffect } from "react";
import { useReportStore } from "../stores/reportStore.ts";

const useLocalStorage = () => {
  const { reports, setReports } = useReportStore();

  useEffect(() => {
    const saved = localStorage.getItem("reports");
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved reports", e);
      }
    }
  }, [setReports]);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);
};

export default useLocalStorage;
