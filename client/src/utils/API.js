import axios from "axios";

export default {
  // Gets the book with the given id
  getData: function(id, date) {
    return axios.get(`/api/fitness/${id}/${date}`);
  },
  // Deletes the book with the given id
  deleteData: function(id, date) {
    return axios.delete(`/api/fitness/${id}/${date}`);
  },
  // Saves a book to the database
  saveData: function(fitnessData) {
    return axios.post("/api/fitness/", fitnessData);
  }
};
