import axios from "axios";

export default {
    /* 
   loginCreds = {username: "alex", "password": 12345Password!}
 */
login: function (loginCreds) {
  return axios.post('/api/users/login', loginCreds)
},
  /* Path to check if user is logged in */
  loginCheck: function () {
    return axios.get('/api/users/login')
  },
  // Gets the book with the given id
  getData: function (username) {
    return axios.get(`/api/fitness/${username}`);
  },
  // Deletes the book with the given id
  deleteData: function (id, date) {
    return axios.delete(`/api/fitness/${id}/${date}`);
  },
  // Saves a book to the database
  saveData: function (fitnessData) {
    return axios.post("/api/fitness/", fitnessData);
  },
  updateData: function (id, date, data) {
    return axios.put(`/api/fitness/${id}/${date}`, data);
  },


  /* 
    Path to log out
  */
  logout: function () {
    return axios.get('/api/users/logout')
  },
  /* 
    Path to register new user, you can have more fields than this but "username" and "password" must exist
    userInfo = {
      username: "alex",
      password: 12345Password!
    }
  */
  register: function (userInfo) {
    return axios.post("/api/users/register", userInfo)
  }

};
