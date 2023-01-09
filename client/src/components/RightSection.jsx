import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccindentsStatistics from "./AccindentsStatistics";
import AddAccident from "./addAccident/AddAccident";
import StationAccidentsList from "./StationAccidentsList";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../store/actions";
import { Divider } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RightSection(props) {
  const rightSectionTab = useSelector(
    (state) => state.AppState.rightSectionTab
  );
  const selectedStation = useSelector(
    (state) => state.AppState.selectedStation
  );
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch({ type: appActions.SET_RIGHT_SECTION_TAP, payload: newValue });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={rightSectionTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Statistics" {...a11yProps(0)} />
          <Tab label="Register Accident" {...a11yProps(1)} />{" "}
          <Tab label="Recent Accidents" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={rightSectionTab} index={0}>
        <AccindentsStatistics />
      </TabPanel>
      <TabPanel value={rightSectionTab} index={1}>
        <AddAccident />
      </TabPanel>
      <TabPanel value={rightSectionTab} index={2}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", m: 3 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Localization : <br />{" "}
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
            longitude :
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "red" }}>
            {selectedStation.longitude}
          </Typography>
          <br />
          <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
            latitude :{" "}
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "red" }}>
            {selectedStation.latitude}
          </Typography>
        </Box>
        <Divider sx={{ m: 2 }} />
        <StationAccidentsList />
      </TabPanel>
    </Box>
  );
}
