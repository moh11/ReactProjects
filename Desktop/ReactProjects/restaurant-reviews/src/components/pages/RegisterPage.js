import "antd/dist/antd.css";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { API } from "../../../utils/config.js";
import { registerUser } from "../../state/authActions.js";
import { Form, Input, Button } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    },
    formControl: {
      margin: "1px",
      minWidth: 120
    },
    selectEmpty: {
      marginTop: "2px"
    }
  }
}));

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export default function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "user"
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            role: values.role
          };

          console.log(dataToSubmit);

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.user && response.payload.token) {
              localStorage.setItem("token", response.payload.token);
              if(response.payload.user && response.payload.user.role === "user") {
                props.history.push("/home/user");
              } else if(response.payload.user && response.payload.user.role === "owner") {
                props.history.push("/home/owner");
              }
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleSubmit
        } = props;
        return (
          <div className="root_container">
            <h1>Register Your Account</h1>
            <Form
              style={{ maxWidth: "375px" }}
              classes={classes.formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item required label="Role">
                <Select
                  value={values.role}
                  onChange={handleChange}
                  label="Age"
                  name="role"
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"owner"}>Owner</MenuItem>
                </Select>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
