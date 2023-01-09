import { useDispatch, useSelector } from "react-redux";
import Map, { Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import appActions from "../store/actions";
import stationMarkers from "../data/markers";
import { useEffect } from "react";

const StationsMaps = () => {
  const URL = `${process.env.REACT_APP_BACKEND_SERVER}/accident/node/date`;

  const stations = useSelector((state) => state.AppState.stations);
  const selectedDate = useSelector((state) => state.AppState.selectedDate);
  const selectedStation = useSelector(
    (state) => state.AppState.selectedStation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ payload: stationMarkers, type: appActions.SET_STATIONS });
    dispatch({
      payload: stationMarkers[0],
      type: appActions.SET_SELECTED_STATION,
    });
  }, []);

  const fetchStationStatistics = (marker) => {
    dispatch({ payload: marker, type: appActions.SET_SELECTED_STATION });

    const data = {
      latitude: selectedStation.latitude,
      longitude: selectedStation.longitude,
      startDate: selectedDate.start,
      endDate: selectedDate.end,
    };

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        dispatch({
          type: appActions.SET_CURRENT_STATION_STATISTICS,
          payload: resData,
        });
      });
  };

  return (
    <Map
      initialViewState={{
        latitude: 33.9692139,
        longitude: -6.8922822,
        zoom: 13,
      }}
      mapLib={maplibregl}
      // mapStyle= 'https://demotiles.maplibre.org/style.json'
      style={{ height: 800 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      {stations.map((marker, index) => (
        <Marker
          key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
          color="red"
          onClick={() => fetchStationStatistics(marker)}
        />
      ))}
    </Map>
  );
};

export default StationsMaps;
