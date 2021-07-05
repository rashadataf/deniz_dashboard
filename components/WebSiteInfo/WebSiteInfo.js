import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

import AdminServices from "../../services/admin.services";

export default function WebSiteInfo() {
  const [state, setState] = useState({
    vision: "",
    location: "",
  });

  useEffect(() => {
    async function getWebSiteInfo() {
      const result = await AdminServices.webSiteInfoServices.getWebSiteInfo();
      if (result.length > 0) {
        setState({
          ...state,
          vision: result[0].vision || "",
          location: result[0].location || "",
        });
      }
    }
    getWebSiteInfo();
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    const result = await AdminServices.webSiteInfoServices.saveWebSiteInfo(
      state
    );
    if (result) {
      alert("Info Saved Successfully!");
      async function getWebSiteInfo() {
        const result = await AdminServices.webSiteInfoServices.getWebSiteInfo();
        if (result.length > 0) {
          setState({
            ...state,
            vision: result[0].vision || "",
            location: result[0].location || "",
          });
        }
      }
      getWebSiteInfo();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="vision"
        name="vision"
        multiline
        label="Vision"
        style={{ width: "100%" }}
        value={state.vision}
        onChange={handleChange}
        variant="outlined"
        helperText="The vision of the website"
      />
      <TextField
        id="location"
        name="location"
        multiline
        label="Location"
        style={{ width: "100%", marginTop: "2rem" }}
        value={state.location}
        onChange={handleChange}
        variant="outlined"
        helperText="The location of the website"
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
