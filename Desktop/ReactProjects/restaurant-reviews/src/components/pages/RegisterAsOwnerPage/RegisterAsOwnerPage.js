import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "antd/dist/antd.css";
import "./RegisterAsOwnerPage.css";
import { Form, Input, Button } from "antd";
import { registerUserAsOwner } from "../../../actions/actions";
import { useDispatch } from "react-redux";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

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

function RegisterPage(props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        restaurantName: "",
        restaurantAddress: "",
        restaurantDescription: ""
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
          .required("Confirm Password is required"),
        restaurantName: Yup.string().required("Restaurant name is required"),
        restaurantDescription: Yup.string().required(
          "Restaurant description is required"
        )
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            restaurant_name: values.restaurantName,
            restaurant_address: values.restaurantAddress,
            restaurant_description: values.restaurantDescription
          };

          dispatch(registerUserAsOwner(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
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
            <h2>Register As Restaurant Owner</h2>
            <Form
              style={{ maxWidth: "375px" }}
              {...formItemLayout}
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

              <Form.Item required label="Restaurant">
                <Input
                  id="restaurantName"
                  placeholder="Enter your restaurant name"
                  type="text"
                  value={values.restaurantName}
                  onChange={handleChange}
                  className={
                    errors.restaurantName && touched.restaurantName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.restaurantName && touched.restaurantName && (
                  <div className="input-feedback">{errors.restaurantName}</div>
                )}
              </Form.Item>

              <Form.Item label="Address">
                <Input
                  id="restaurantAddress"
                  placeholder="Enter your restaurant address"
                  type="text"
                  value={values.restaurantAddress}
                  onChange={handleChange}
                  className={
                    errors.restaurantAddress && touched.restaurantAddress
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.restaurantAddress && touched.restaurantAddress && (
                  <div className="input-feedback">
                    {errors.restaurantAddress}
                  </div>
                )}
              </Form.Item>

              <Form.Item required label="Description">
                <Input
                  id="restaurantDescription"
                  placeholder="Describe your restaurant"
                  type="text"
                  value={values.restaurantDescription}
                  onChange={handleChange}
                  className={
                    errors.restaurantDescription &&
                    touched.restaurantDescription
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.restaurantDescription &&
                  touched.restaurantDescription && (
                    <div className="input-feedback">
                      {errors.restaurantDescription}
                    </div>
                  )}
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

export default RegisterPage;
