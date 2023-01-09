import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../store/actions";

function AccidentCasualities(props) {
  const [systemPeople, setSystemPeople] = useState();
  const dispatch = useDispatch();
  const accidentDetails = useSelector(
    (state) => state.AppState.accidentDetails
  );
  const onChangeHandler = (event, mpeople) => {
    console.log("-----", mpeople);
    dispatch({
      type: appActions.SET_ACCIDENT_DETAILS,
      payload: {
        ...accidentDetails,
        casualities: mpeople,
      },
    });
  };

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_SERVER}/people`;
    fetch(URL)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        setSystemPeople(resData);
      });
  }, []);

  return systemPeople ? (
    <Autocomplete
      multiple
      id="tags-standard"
      options={systemPeople}
      getOptionLabel={(option) => option.id}
      onChange={onChangeHandler}
      {...props}
      renderInput={(params) => (
        <TextField
          label="People"
          {...params}
          variant="outlined"
          placeholder="people"
        />
      )}
    />
  ) : null;
}

export default AccidentCasualities;
