import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import AdminServices from "../../services/admin.services";

function withMyHook(MyComponent) {
  return function WrappedComponent(props) {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
      },
      title: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      },
      textField: {
        width: "49%",
      },
    }));
    const classes = useStyles();
    return <MyComponent {...props} classes={classes} />;
  };
}

class Area extends React.Component {
  state = {
    _id: this.props._id || "",
    name: this.props.name || "",
    fatherName: this.props.fatherName || "",
    motherName: this.props.motherName || "",
    sex: this.props.sex || "",
    birthDate: this.props.birthDate || "",
    nationality: this.props.nationality || "",
    residenceCountry: this.props.residenceCountry || "",
    email: this.props.email || "",
    phone: this.props.phone || "",
    hearedAboutUs: this.props.hearedAboutUs || "",
    scientificDegree: this.props.scientificDegree || "",
    university: this.props.university || "",
    otherUniversities: this.props.otherUniversities || [],
    specialization: this.props.specialization || "",
    otherSpecializations: this.props.otherSpecializations || [],
    language: this.props.language || "",
    description: this.props.description || "",
    status: this.props.status || "",
    statuses: [],
  };

  componentDidMount() {
    const fetchStatuses = async () => {
      const statuses = await AdminServices.statusesServices.fetchAll();
      this.setState({ statuses: statuses });
    };
    fetchStatuses();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: "",
    });
  };

  handleStatusChange = (event) => {
    if (event.target.value !== 0) this.setState({ status: event.target.value });
    else this.setState({ status: "" });
  };

  handleUpdate = async () => {
    const result = await AdminServices.applicationsServices.updateApplication(
      this.state._id,
      this.state.status
    );
    if (result) {
      this.setState({
        status: "",
      });
      this.props.handleSuccess();
    }
  };
  render() {
    return (
      <Container>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.title}>
            <TextField
              id="name"
              label="Full Name"
              value={this.state.name}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              variant="outlined"
              style={{ width: "100%" }}
              helperText={"The Name Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="fatherName"
              label="Father Name"
              value={this.state.fatherName}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Name Of Applicant's Father"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="motherName"
              label="Mother Name"
              value={this.state.motherName}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Name Of Applicant's Mother"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <hr style={{ marginTop: "2rem", width: "100vw" }} />
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="sex"
              label="Sex"
              value={this.state.sex}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Sex Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="birthDate"
              label="Birth Date"
              type="date"
              value={this.state.birthDate}
              // value="2017-05-24"
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Birth Date Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="nationality"
              label="Nationality"
              value={this.state.nationality}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Nationality Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="residenceCountry"
              label="Residence Country"
              value={this.state.residenceCountry}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Residence Country Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <hr style={{ marginTop: "2rem", width: "100vw" }} />
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="phone"
              label="Phone"
              value={this.state.phone}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              className={this.props.classes.textField}
              style={{ width: "100%" }}
              variant="outlined"
              helperText={"The Phone Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              className={this.props.classes.textField}
              style={{ width: "100%" }}
              variant="outlined"
              helperText={"The Email Of Applicant"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="hearedAboutUs"
              label="Where did you heare about us"
              value={this.state.hearedAboutUs}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              className={this.props.classes.textField}
              style={{ width: "100%" }}
              variant="outlined"
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <hr style={{ marginTop: "2rem", width: "100vw" }} />
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="scientificDegree"
              label="Scientific Degree"
              value={this.state.scientificDegree}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "100%" }}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Scientific Degree"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="university"
              label="University"
              value={this.state.university}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "100%" }}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The University To Study"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <h6>Other Universities</h6>
            <div style={{ marginTop: "-2rem" }}>
              {this.state.otherUniversities.length > 0 ? (
                <List>
                  {this.state.otherUniversities.map((university, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={university} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p style={{ fontSize: "0.8rem" }}>There Is No Universities</p>
              )}
            </div>
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="specialization"
              label="Specialization"
              value={this.state.specialization}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "100%" }}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Specialization To Study"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <h6>Other Specializations</h6>
            <div style={{ marginTop: "-2rem" }}>
              {this.state.otherSpecializations.length > 0 ? (
                <List>
                  {this.state.otherSpecializations.map(
                    (specialization, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={specialization} />
                      </ListItem>
                    )
                  )}
                </List>
              ) : (
                <p style={{ fontSize: "0.8rem" }}>
                  There Is No Specializations
                </p>
              )}
            </div>
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="language"
              label="Language"
              value={this.state.language}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "100%" }}
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"The Language To Study"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="description"
              label="Message"
              value={this.state.description}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "100%" }}
              multiline
              className={this.props.classes.textField}
              variant="outlined"
              helperText={"Message To Us"}
              FormHelperTextProps={{
                style: {
                  marginTop: "0.5rem",
                },
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            className={this.props.classes.title}
            style={{ marginTop: "2rem" }}
          >
            <TextField
              id="status"
              select
              label="Status"
              style={{ width: "50%" }}
              value={this.state.status}
              onChange={this.handleStatusChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select Status"
              variant="outlined"
            >
              <option value="0">Please Select</option>
              {this.state.statuses.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.title}
                </option>
              ))}
            </TextField>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "2rem", backgroundColor: "#00BF00" }}
            startIcon={<SaveIcon />}
            onClick={this.handleUpdate}
          >
            Update
          </Button>
        </div>
      </Container>
    );
  }
}

export default withMyHook(Area);
