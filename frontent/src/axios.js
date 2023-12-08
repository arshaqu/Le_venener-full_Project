import axios from "axios";

console.log("hii");
const user = axios

export const userRequest = ({ ...options }) => {
  user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
  const onSuccess = (response) => response
  const onError = (error) => {
      return error
  }
  return user(options).then(onSuccess).catch(onError)
}
