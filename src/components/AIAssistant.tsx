import { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { useReportStore } from "../stores/reportStore.ts";
import { generateDraft, summarizeContent } from "../utils/api.ts";
import React from "react";

const AIAssistant = ({
  reportId,
  mode,
}: {
  reportId: string;
  mode: "generate" | "summarize";
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { reports, updateReport } = useReportStore();

  const handleAIAction = async () => {
    setLoading(true);
    setError("");

    try {
      let result;
      const report = reports.find((r) => r.id === reportId);

      if (!report) {
        throw new Error("Report not found");
      }

      if (mode === "generate") {
        if (!report.title.trim()) {
          throw new Error("Please add a title to generate a draft");
        }
        result = await generateDraft(report.title);
      } else {
        if (!report.content.trim()) {
          throw new Error("Please add content to summarize");
        }
        result = await summarizeContent(report.content);
      }

      updateReport(reportId, {
        content: result,
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "AI service error. Please try again."
      );
      console.error("AI action failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleAIAction}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{ mx: 1 }}
      >
        {mode === "generate" ? "Generate Draft" : "Summarize Content"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default AIAssistant;
