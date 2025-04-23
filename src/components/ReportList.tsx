import React from "react";
import { useReportStore } from "../stores/reportStore.ts";
import ReportCard from "./ReportCard.tsx";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

const ReportList = () => {
  const { reports, reorderReports } = useReportStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = reports.findIndex((r) => r.id === active.id);
      const newIndex = reports.findIndex((r) => r.id === over.id);
      reorderReports(oldIndex, newIndex);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={reports}>
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ReportList;
