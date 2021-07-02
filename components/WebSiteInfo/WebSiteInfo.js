import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function WebSiteInfo() {
  const [state, setState] = useState({
    vision: "",
  });
  return (
    <div>
      <TextField
        id="vision"
        name="vision"
        label="Visio"
        value={state.vision}
        onChange={handleChange}
        variant="outlined"
        helperText="The vision of the website"
      />
    </div>
  );
}
