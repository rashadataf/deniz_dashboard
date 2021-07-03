import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

// Arabic Support
import { create } from "jss";
import rtl from "jss-rtl";
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import AdminServices from "../../services/admin.services";

function DIR(props) {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const rtlTheme = createMuiTheme({
    typography: { useNextVariants: true },
    direction: "rtl",
  });

  const ltrTheme = createMuiTheme({
    typography: { useNextVariants: true },
    direction: "ltr",
  });

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={ltrTheme}>
        {props.ltrInput}
        <ThemeProvider theme={rtlTheme}>{props.rtlInput}</ThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

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
    title: this.props.title || "",
    arTitle: this.props.arTitle || "",
    selectedState: this.props.state,
    selectedStateError: "",
    states: [],
    titleError: "",
    arTitleError: "",
  };

  componentDidMount() {
    const fetchStates = async () => {
      const result = await AdminServices.statesServices.fetchAll();
      this.setState({
        states: result,
      });
    };
    fetchStates();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: "",
    });
  };

  validateInput = () => {
    let titleError = "",
      arTitleError = "",
      selectedStateError = "";
    if (this.state.title === "") titleError = "This field can't be empty!";
    if (this.state.arTitle === "")
      arTitleError = "هذا الحقل لايمكن أن يبقى فارغا!";
    if (this.state.selectedCountry === "" || this.state.selectedCountry === "0")
      selectedStateError = "This field can't be empty!";
    if (
      titleError.length > 0 ||
      arTitleError.length > 0 ||
      selectedStateError.length > 0
    ) {
      this.setState({
        titleError: titleError,
        arTitleError: arTitleError,
        selectedStateError: selectedStateError,
      });
      return false;
    }
    return true;
  };

  handleUpdate = async () => {
    if (this.validateInput()) {
      const result = await AdminServices.areasServices.updateArea(
        this.state._id,
        this.state.title,
        this.state.arTitle,
        this.state.selectedState
      );
      if (result) {
        this.setState({
          title: "",
          arTitle: "",
          titleError: "",
          arTitleError: "",
          selectedState: "",
          selectedStateError: "",
        });
        this.props.handleSuccess();
      }
    }
  };
  render() {
    return (
      <Container>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.title}>
            <DIR
              rtlInput={
                <TextField
                  id="arTitle"
                  name="arTitle"
                  label="الاسم"
                  value={this.state.arTitle}
                  onChange={this.handleChange}
                  onBlur={this.validateInput}
                  dir="rtl"
                  className={this.props.classes.textField}
                  variant="outlined"
                  helperText={
                    this.state.arTitleError
                      ? `${this.state.arTitleError}`
                      : `رجاء قم بإدخال اسم المنطقة`
                  }
                  FormHelperTextProps={{
                    style: {
                      marginTop: "1rem",
                    },
                  }}
                  error={this.state.arTitleError ? true : false}
                />
              }
              ltrInput={
                <TextField
                  id="title"
                  name="title"
                  label="Name"
                  value={this.state.title}
                  onChange={this.handleChange}
                  onBlur={this.validateInput}
                  className={this.props.classes.textField}
                  variant="outlined"
                  helperText={
                    this.state.titleError
                      ? `${this.state.titleError}`
                      : `Please Enter Area Name.`
                  }
                  FormHelperTextProps={{
                    style: {
                      marginTop: "1rem",
                    },
                  }}
                  error={this.state.titleError ? true : false}
                />
              }
            />
          </div>
          <div style={{ marginTop: "2rem", width: "100%" }}>
            <TextField
              id="state"
              name="selectedState"
              select
              required
              label="State"
              value={this.state.selectedState}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              style={{ width: "50%" }}
              InputLabelProps={{
                classes: {
                  asterisk: this.props.classes.labelAsterisk,
                },
              }}
              SelectProps={{
                native: true,
              }}
              helperText={
                this.state.selectedStateError
                  ? `${this.state.selectedStateError}`
                  : `Please select State.`
              }
              error={this.state.selectedStateError ? true : false}
              variant="outlined"
            >
              <option value="0">Please Select</option>
              {this.state.states.map((option) => (
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
