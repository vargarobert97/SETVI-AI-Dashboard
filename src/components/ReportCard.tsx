import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Menu,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  DragHandle as DragHandleIcon,
} from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useReportStore } from "../stores/reportStore.ts";
import ReportEditor from "./ReportEditor.tsx";
import AIAssistant from "./AIAssistant.tsx";
import React from "react";

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const ReportCard = ({ report }: ReportCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteReport } = useReportStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: report.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: 2,
    cursor: "grab",
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    deleteReport(report.id);
    handleMenuClose();
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        mb: 2,
        borderLeft: "4px solid",
        borderColor: "primary.main",
      }}
    >
      <CardHeader
        title={report.title}
        subheader={
          <>
            <Typography variant="caption" component="div">
              Created: {new Date(report.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="caption" component="div">
              Last updated: {new Date(report.updatedAt).toLocaleString()}
            </Typography>
          </>
        }
        action={
          <>
            <IconButton
              aria-label="drag"
              {...listeners}
              sx={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <DragHandleIcon />
            </IconButton>
            <IconButton
              aria-label="more"
              aria-controls="report-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="report-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon sx={{ mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteIcon sx={{ mr: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </>
        }
      />

      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ExpandMoreIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <AIAssistant reportId={report.id} mode="generate" />
        <AIAssistant reportId={report.id} mode="summarize" />
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {editing ? (
            <ReportEditor reportId={report.id} onSave={handleSave} />
          ) : (
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: report.content || "<i>No content</i>",
              }}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ReportCard;
