import "./App.css";

import "maplibre-gl/dist/maplibre-gl.css";
import { Divider, Grid, Paper } from "@mui/material";
import RightSection from "./components/RightSection";
import StationsMaps from "./components/StationsMaps";

const App = () => {
  return (
    <div className="App">
      <Divider sx={{ margin: 4 }} />
      <Grid container s>
        <Grid xs={7} item>
          <StationsMaps />
        </Grid>
        <Grid xs={5} item>
          <Paper>
            <RightSection />
          </Paper>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default App;
