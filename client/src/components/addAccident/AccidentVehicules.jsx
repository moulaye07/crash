import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../store/actions";

function AccidentVehicules(props) {
  const [systemVehicules, setSystemVehicules] = useState();
  const dispatch = useDispatch();
  const accidentDetails = useSelector(
    (state) => state.AppState.accidentDetails
  );
  const onChangeHandler = (event, mvehicules) => {
    console.log("-----", mvehicules);
    dispatch({
      type: appActions.SET_ACCIDENT_DETAILS,
      payload: {
        ...accidentDetails,
        vehicules: mvehicules,
      },
    });
  };

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_SERVER}/car`;
    fetch(URL)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        setSystemVehicules(resData.vehicules);
      });
  }, []);

  return systemVehicules ? (
    <Autocomplete
      multiple
      id="tags-standard"
      options={systemVehicules}
      getOptionLabel={(option) => option.title}
      onChange={onChangeHandler}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Vehicules"
          placeholder="vehicules"
        />
      )}
    />
  ) : null;
}

export default AccidentVehicules;
