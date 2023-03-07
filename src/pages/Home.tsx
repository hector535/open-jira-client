import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { EntryList, NewEntry } from "../components";
import { ENTRY_STATUS } from "../constants/index.js";
import { useTasks } from "../hooks";
import { useStore } from "../store/store";

const HomePage = () => {
  const navbarHeight = useStore((state) => state.navbarHeight);
  const { data: entries = [] } = useTasks();

  const cardStyles = {
    height: `calc(100vh - ${navbarHeight}px - 4rem)`,
    display: "grid",
    gap: "1.5rem",
    gridTemplateRows: "auto auto 1fr",
    padding: "1.5rem 1rem",
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyles}>
          <Typography variant="h5" component="span">
            Pending
          </Typography>
          <NewEntry />
          <EntryList entries={entries} filterBy={ENTRY_STATUS.PENDING} />
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ ...cardStyles, gridTemplateRows: "auto 1fr" }}>
          <Typography variant="h5" component="span">
            In progress
          </Typography>
          <EntryList entries={entries} filterBy={ENTRY_STATUS.IN_PROGRESS} />
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ ...cardStyles, gridTemplateRows: "auto 1fr" }}>
          <Typography variant="h5" component="span">
            Completed
          </Typography>
          <EntryList entries={entries} filterBy={ENTRY_STATUS.FINISHED} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
