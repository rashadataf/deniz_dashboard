import axios from "axios";

const API = "/api/admin";

const fetchAll = async () => {
  try {
    const response = await axios.get(`${API}/states`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getStateAreas = async (id) => {
  try {
    const response = await axios.get(`${API}/states/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createNewState = async (title, arTitle, selectedCountry) => {
  try {
    const response = await axios.post(`${API}/states`, {
      title,
      arTitle,
      country: selectedCountry,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const updateState = async (_id, title, arTitle, selectedCountry) => {
  try {
    const response = await axios.put(`${API}/states/${_id}`, {
      title,
      arTitle,
      country: selectedCountry,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const deleteState = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/states/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {}
};

const statesServices = {
  fetchAll,
  getStateAreas,
  createNewState,
  updateState,
  deleteState,
};

export default statesServices;
