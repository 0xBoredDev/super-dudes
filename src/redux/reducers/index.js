import { combineReducers } from "redux";
import dataProgress from "./dataReducer";
import blockchainCallsInProgress from "./blockchainReducer";

const rootReducer = combineReducers({
  dataProgress,
  blockchainCallsInProgress,
});

export default rootReducer;
