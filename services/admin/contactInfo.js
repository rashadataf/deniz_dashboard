import axios from "axios";

const API = "/api/admin";

const saveContactInfo = async (
  email,
  fax,
  phone,
  whatsapp,
  facebook,
  twitter,
  youtube,
  linkedin
) => {
  try {
    const response = await axios.post(`${API}/contactInfo`, {
      email,
      fax,
      phone,
      whatsapp,
      facebook,
      twitter,
      youtube,
      linkedin,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const getContactInfo = async () => {
  try {
    const response = await axios.get(`${API}/contactInfo`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const contactInfoServices = {
  saveContactInfo,
  getContactInfo,
};

export default contactInfoServices;
