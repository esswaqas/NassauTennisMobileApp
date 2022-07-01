import authReducers from "./authReducers";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
 auth: authReducers
})
export default rootReducers