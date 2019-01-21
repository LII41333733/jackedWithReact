import axios from "axios";

export default {
  getData: function(username, date) {
    return axios.get(`/api/fitness/${username}/${date}`);
  },
  deleteData: function(username, date) {
    return axios.delete(`/api/fitness/${username}/${date}`);
  },
  saveData: function(fitnessData) {
    return axios.post("/api/fitness/", fitnessData);
  },
  updateData: function(username, date, data) {
    return axios.put(`/api/fitness/${username}/${date}`, data);
  }
};
