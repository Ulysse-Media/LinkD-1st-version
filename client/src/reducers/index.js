import { combineReducers } from "redux";
import  { authReducer }  from "./authReducer";
import  { actionsReducer }  from "./actionsReducer";
import  { doctorsReducer }  from "./doctorsReducer";
import  { localisationsReducer }  from "./localisationsReducer";
import  { notificationsReducer }  from "./notificationsReducer";
import  { notesReducer }  from "./notesReducer";
import  { agenciesReducer }  from "./agenciesReducer";
import  { servicesReducer }  from "./servicesReducer";
import  { filesReducer }  from "./filesReducer";
import  { invoicesReducer }  from "./invoicesReducer";


const RootReducer = combineReducers({
  actionsReducer,
  authReducer,
  doctorsReducer,
  localisationsReducer,
  notificationsReducer,
  notesReducer,
  agenciesReducer,
  servicesReducer,
  filesReducer,
  invoicesReducer
});

export default RootReducer;
