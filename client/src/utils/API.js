import axios from "axios";

export default {
  getData: function(username) {
    return axios.get(`/api/fitness/${username}`);
  },
  deleteData: function(username) {
    return axios.delete(`/api/fitness/${username}`);
  },
  saveData: function(data) {
    return axios.post("/api/fitness/", data);
  },
  updateData: function(username, data) {
    return axios.put(`/api/fitness/${username}`, data);
  }
};
