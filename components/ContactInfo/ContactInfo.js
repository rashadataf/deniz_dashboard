import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

import AdminServices from "../../services/admin.services";

export default function WebSiteInfo() {
  const [state, setState] = useState({
    email: "",
    phone: "",
    fax: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    youtube: "",
    linkedn: "",
  });

  useEffect(() => {
    async function getContactInfo() {
      const result = await AdminServices.contactInfoServices.getContactInfo();
      if (result.length > 0) {
        setState({
          ...state,
          email: result[0].email || "",
          phone: result[0].phone || "",
          fax: result[0].fax || "",
          whatsapp: result[0].whatsapp || "",
          facebook: result[0].facebook || "",
          twitter: result[0].twitter || "",
          youtube: result[0].youtube || "",
          linkedn: result[0].linkedn || "",
        });
      }
    }
    getContactInfo();
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    const result = await AdminServices.contactInfoServices.saveContactInfo(
      state.email,
      state.fax,
      state.phone,
      state.whatsapp,
      state.facebook,
      state.twitter,
      state.youtube,
      state.linkedin
    );
    if (result) {
      alert("Info Saved Successfully!");
      async function getContactInfo() {
        const result = await AdminServices.contactInfoServices.getContactInfo();
        if (result.length > 0) {
          setState({
            ...state,
            email: result[0].email || "",
            phone: result[0].phone || "",
            fax: result[0].fax || "",
            whatsapp: result[0].whatsapp || "",
            facebook: result[0].facebook || "",
            twitter: result[0].twitter || "",
            youtube: result[0].youtube || "",
            linkedn: result[0].linkedn || "",
          });
        }
      }
      getContactInfo();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="email"
        name="email"
        multiline
        label="email"
        style={{ width: "100%" }}
        value={state.email}
        onChange={handleChange}
        variant="outlined"
        helperText="The email of the website"
      />
      <TextField
        id="phone"
        name="phone"
        multiline
        label="phone"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.phone}
        onChange={handleChange}
        variant="outlined"
        helperText="The phone of the website"
      />
      <TextField
        id="fax"
        name="fax"
        multiline
        label="fax"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.fax}
        onChange={handleChange}
        variant="outlined"
        helperText="The fax of the website"
      />
      <TextField
        id="whatsapp"
        name="whatsapp"
        multiline
        label="whatsapp"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.whatsapp}
        onChange={handleChange}
        variant="outlined"
        helperText="The whatsapp of the website"
      />
      <TextField
        id="facebook"
        name="facebook"
        multiline
        label="facebook"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.facebook}
        onChange={handleChange}
        variant="outlined"
        helperText="The facebook of the website"
      />
      <TextField
        id="twitter"
        name="twitter"
        multiline
        label="twitter"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.twitter}
        onChange={handleChange}
        variant="outlined"
        helperText="The twitter of the website"
      />
      <TextField
        id="youtube"
        name="youtube"
        multiline
        label="youtube"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.youtube}
        onChange={handleChange}
        variant="outlined"
        helperText="The youtube of the website"
      />
      <TextField
        id="linkedn"
        name="linkedn"
        multiline
        label="linkedn"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.linkedn}
        onChange={handleChange}
        variant="outlined"
        helperText="The linkedn of the website"
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "5rem", backgroundColor: "#00BF00" }}
        startIcon={<SaveIcon />}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
}
