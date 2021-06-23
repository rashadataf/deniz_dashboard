import axios from "axios";

const API = "/api/admin";

const fetchAll = async () => {
  try {
    const response = await axios.get(`${API}/statuses`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createNewStatus = async (title, arTitle) => {
  try {
    const response = await axios.post(`${API}/statuses`, { title, arTitle });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (_id, title, arTitle) => {
  try {
    const response = await axios.put(`${API}/statuses/${_id}`, {
      title,
      arTitle,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const deleteStatus = async (_id) => {
  try {
    const response = await axios.delete(`${API}/statuses/${_id}`);
    return true;
  } catch (error) {}
};

const statusesServices = {
  fetchAll,
  createNewStatus,
  updateStatus,
  deleteStatus,
};

export default statusesServices;
