import axios from "axios";

const baseURL = "http://localhost:3033";
const instance = axios.create({ baseURL });

export const getUsers = () =>
  instance("/features").then(result => result.data.features);
