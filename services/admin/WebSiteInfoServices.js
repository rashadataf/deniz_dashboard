import axios from "axios";

const API = "/api/admin";

const saveWebSiteInfo = async ({ vision, location }) => {
  try {
    const response = await axios.post(`${API}/webSiteInfo`, {
      vision,
      location,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const getWebSiteInfo = async () => {
  try {
    const response = await axios.get(`${API}/webSiteInfo`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const webSiteInfoServices = {
  saveWebSiteInfo,
  getWebSiteInfo,
};

export default webSiteInfoServices;
