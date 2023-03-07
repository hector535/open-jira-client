import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import EntryCard from "./EntryCard";
import { TaskStatus } from "../type";
import { useStore } from "../store/store";
import { useUpdateTask } from "../hooks";
import { Task } from "../type";

import styles from "./EntryList.module.css";

type Props = {
  entries: Task[];
  filterBy: TaskStatus;
};

export const EntryList = ({ entries, filterBy }: Props) => {
  const mutation = useUpdateTask();

  const isDragging = useStore((state) => state.isDragging);
  const setIsDragging = useStore((state) => state.setIsDragging);

  const filteredEntries = entries.filter((e) => e.status_id === filterBy.id);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const clonedEntry = entries.find((e) => e.task_id === +id);

    if (!clonedEntry) return;

    clonedEntry.status_id = filterBy.id;

    mutation.mutate(clonedEntry);
    setIsDragging(false);
  };

  return (
    <div
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Paper
        sx={{
          background: "rgba(255,255,255,0.1)",
          height: "100%",
          overflowY: "auto",
          padding: 1,
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            padding: 0,
            transition: "all .3s",
          }}
        >
          {filteredEntries.map((e) => (
            <EntryCard
              key={e.task_id}
              id={e.task_id}
              description={e.description}
              createdAt={new Date(e.created_at).getTime()}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
};
