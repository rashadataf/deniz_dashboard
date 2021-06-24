import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

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
    email: this.props.email || "",
    phone: this.props.phone || "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: "",
    });
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
              helperText={"The Name Of Contact"}
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
              id="phone"
              label="Phone"
              value={this.state.phone}
              onChange={this.handleChange}
              onBlur={this.validateInput}
              className={this.props.classes.textField}
              style={{ width: "100%" }}
              variant="outlined"
              helperText={"The Phone Of Contact"}
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
              helperText={"The Email Of Contact"}
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
        </div>
      </Container>
    );
  }
}

export default withMyHook(Area);
