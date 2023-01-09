import appActions from "../actions";

const InitialState = {
  stations: [],
  selectedStation: {},
  currentStationStatistics: {},
  selectedStation: {
    latitude: 34.002000163044286,
    longitude: -6.835341840296296,
  },
  selectedDate: { start: "", end: "" },
  accidentDetails: {
    id: "0",
    severity: "fatal",
    victims: 0,
    injured: 0,
    dead: 0,
    casualities: [],
    vehicules: [],
  },
  person: {
    name: "",
    cin: "",
    phone: "",
    address: "",
    relatives: "",
    email: "",
    insurance: "",
  },
  selectedStationAccidents: [],
  rightSectionTab: 0,
};

const mainReducer = (state = InitialState, action) => {
  switch (action.type) {
    // -------------------------------------
    case appActions.SET_STATIONS: {
      return { ...state, stations: action.payload };
    }

    case appActions.REMOVE_STATIONS: {
      return { ...state, stations: [] };
    }
    case appActions.SET_CURRENT_STATION_STATISTICS: {
      return { ...state, currentStationStatistics: action.payload };
    }

    case appActions.REMOVE_CURRENT_STATION_STATISTICS: {
      return { ...state, currentStationStatistics: {} };
    }
    case appActions.SET_SELECTED_DATE: {
      return { ...state, selectedDate: action.payload };
    }
    case appActions.SET_SELECTED_STATION: {
      return { ...state, selectedStation: action.payload };
    }
    case appActions.SET_ACCIDENT_DETAILS: {
      return { ...state, accidentDetails: action.payload };
    }

    case appActions.SET_SELECTED_ACCIDENT: {
      return { ...state, selectedAccident: action.payload };
    }
    case appActions.SET_SELECTED_STATION_ACCIDENTS: {
      return { ...state, selectedStationAccidents: action.payload };
    }
    case appActions.SET_PERSON: {
      return { ...state, person: action.payload };
    }
    case appActions.SET_RIGHT_SECTION_TAP: {
      return { ...state, rightSectionTab: action.payload };
    }
    default:
      return state;
  }
};

export default mainReducer;
