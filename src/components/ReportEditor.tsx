// components/ReportEditor.tsx
import { Editor } from "@tinymce/tinymce-react";
import { useReportStore } from "../stores/reportStore.ts";
import React from "react";

const ReportEditor = ({ reportId }) => {
  const { reports, updateReport } = useReportStore();
  const report = reports.find((r) => r.id === reportId);

  const handleEditorChange = (content) => {
    updateReport(reportId, { content });
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      value={report?.content || ""}
      init={{
        height: 500,
        menubar: true,
        plugins: ["lists", "link", "image", "table", "code"],
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | code",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default ReportEditor;
