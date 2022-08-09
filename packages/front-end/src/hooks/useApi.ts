import axios from "axios";
import { getUserLocalStorage } from "../contexts/Auth/util";

const user = getUserLocalStorage();

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-type": "application/json",
    "Authorization": `${user.token}`
  }
});