import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useStore } from "../store/store";

type Props = {
  id: number;
  description: string;
  createdAt: number;
};

const EntryCard = ({ id, description, createdAt }: Props) => {
  const navigate = useNavigate();
  const setIsDragging = useStore((state) => state.setIsDragging);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", id.toString());
    setIsDragging(true);
  };

  return (
    <Card
      sx={{ mb: 2 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      onDoubleClick={() => navigate(`/task/${id}`)}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2">hace {createdAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
