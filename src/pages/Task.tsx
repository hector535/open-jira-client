import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import capitalize from "@mui/material/utils/capitalize";

import { useDeleteTask, useTask, useUpdateTask } from "../hooks";
import { Task } from "../type";

import { TaskStatus } from "../type";

const validStatus: TaskStatus[] = [
  { id: 1, name: "pending" },
  { id: 2, name: "in-progress" },
  { id: 3, name: "finished" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  p: 4,
};

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: task, isLoading, isError } = useTask(+id!);

  const { mutate: mutateUpdate, isSuccess: isUpdateMutationSuccess } =
    useUpdateTask();
  const { mutate: mutateDelete, isSuccess: isDeleteMutationSuccess } =
    useDeleteTask();

  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState(validStatus[0].id);
  const [touchedInputValue, setTouchedInputValue] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const isInputValueValid =
    inputValue.trim().length > 0 && inputValue.trim().length < 500;
  const isInputFieldValid = !touchedInputValue || isInputValueValid;

  useEffect(() => {
    if (task) {
      setInputValue(task.description);
      setStatus(task.status_id as TaskStatus["id"]);
    }
  }, [task]);

  if (isError || (!isLoading && !task)) {
    return <Navigate to="/" />;
  }

  if (isUpdateMutationSuccess || isDeleteMutationSuccess) {
    return <Navigate to="/" />;
  }

  const handleSave = () => {
    setTouchedInputValue(true);

    if (!isInputValueValid) return;

    mutateUpdate({
      task_id: +id!,
      description: inputValue,
      status_id: status,
    } as Task);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTouchedInputValue(true);
    setInputValue(e.target.value);
  };

  return (
    <>
      <Link href="#" underline="hover" onClick={() => navigate("/")}>
        Go back
      </Link>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          {isLoading ? (
            <Typography variant="h1">Loading...</Typography>
          ) : (
            <Card sx={{ paddingBlock: 1.5, paddingInline: 1 }}>
              <CardHeader
                title={`Task: ${inputValue}`}
                subheader={`created ...minutes ago`}
              />
              <CardContent sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Type here your task"
                  autoFocus
                  multiline
                  label="Task"
                  sx={{ mb: 2 }}
                  value={inputValue}
                  error={!isInputFieldValid}
                  helperText={
                    !isInputFieldValid &&
                    (inputValue.trim().length === 0
                      ? "Required"
                      : "Must be between 5 - 500 chars long")
                  }
                  onChange={handleTextFieldChange}
                />

                <FormControl>
                  <FormLabel>Status:</FormLabel>
                  <RadioGroup
                    row
                    value={status}
                    onChange={(r) =>
                      setStatus(+r.target.value as TaskStatus["id"])
                    }
                  >
                    {validStatus.map((v) => (
                      <FormControlLabel
                        key={v.id}
                        label={capitalize(v.name)}
                        value={v.id}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>

              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete the task with ID {id}?
            </Typography>
            <Box
              display="flex"
              gap="1rem"
              justifyContent="flex-end"
              marginTop={2}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={() => mutateDelete(+id!)}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <IconButton
        size="large"
        sx={{
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          backgroundColor: "red",
        }}
        onClick={() => setOpenDeleteModal(true)}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </>
  );
};

export default TaskPage;
