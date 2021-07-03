import axios from "axios";

const API = "/api/admin";

const fetchAll = async () => {
  try {
    const response = await axios.get(`${API}/countries`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCountryStates = async (_id) => {
  try {
    const response = await axios.get(`${API}/countries/${_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createNewCountry = async (title, arTitle) => {
  try {
    const response = await axios.post(`${API}/countries`, { title, arTitle });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const updateCountry = async (_id, title, arTitle) => {
  try {
    const response = await axios.put(`${API}/countries/${_id}`, {
      title,
      arTitle,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const deleteCountry = async (_id) => {
  try {
    const response = await axios.delete(`${API}/countries/${_id}`);
    return true;
  } catch (error) {}
};

const countriesServices = {
  fetchAll,
  getCountryStates,
  createNewCountry,
  updateCountry,
  deleteCountry,
};

export default countriesServices;
