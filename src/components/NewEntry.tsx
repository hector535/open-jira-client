import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useStore } from "../store/store";
import { useCreateTask } from "../hooks";
import { Task } from "../type";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const mutation = useCreateTask();

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isAddingEntry = useStore((state) => state.isAddingEntry);
  const setIsAddingEntry = useStore((state) => state.setIsAddingEntry);

  const inputValueError =
    inputValue.trim().length === 0 || inputValue.trim().length > 500;
  const showInputError = inputValueError && touched;

  const onTextFieldChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTouched(true);
    setInputValue(e.target.value);
  };

  const onSave = () => {
    setTouched(true);

    if (inputValueError) return;

    mutation.mutate({
      description: inputValue,
    } as Task);

    reset();
  };

  const reset = () => {
    setTouched(false);
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box display="grid" gap="1rem">
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            placeholder="Type here your task"
            autoFocus
            multiline
            label="Task"
            helperText={
              showInputError &&
              (inputValue.trim().length === 0
                ? "Required"
                : "Must be between 5 - 500 chars long")
            }
            error={showInputError}
            value={inputValue}
            onChange={onTextFieldChanges}
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={reset}>
              Cancel
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => setIsAddingEntry(true)}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
