import axios from "axios";

const instance = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/"
  baseURL: "https://my-react-todo-app-7b9f9.firebaseio.com/"
});

export default instance;
