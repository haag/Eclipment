import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import notesReducer from "./notes/Reducer";

const Reducers = combineReducers({
  settings,
  notesReducer,
});

export default Reducers;
