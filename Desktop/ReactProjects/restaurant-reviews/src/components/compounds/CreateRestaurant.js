import React, { useState } from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import "antd/dist/antd.css";
import axios from "axios";
import "./styles/CreateRestaurant.css";
import { Form, Input, Button } from "antd";
import { API } from "../../utils/config";
import Auth from "../../middleware/auth";

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

export default function CreateRestaurant(props) {
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  console.log(props);

  const canEdit = props.canEdit;
  const header = props.header;
  const subHeader = props.subHeader;


  const restaurantIdFormItem = props => {
    console.log(props);
    if (canEdit) {
      return (
        <Form.Item label="Id">
          <Input
            id="restaurantId"
            placeholder="Enter your restaurant id"
            type="text"
            value={props.values.restaurantId}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            className={
              props.errors.restaurantId && props.touched.restaurantId
                ? "text-input error"
                : "text-input"
            }
          />
          {props.errors.restaurantId && props.touched.restaurantId && (
            <div className="input-feedback">{props.errors.restaurantId}</div>
          )}
        </Form.Item>
      );
    }
  };

  return (
    <Formik
      initialValues={{
        restaurantName: "",
        restaurantAddress: "",
        restaurantDescription: ""
      }}
      validationSchema={Yup.object().shape({
        restaurantName: Yup.string()
          .required("Restaurant name is required"),
        restaurantDescription: Yup.string()
          .required("Restaurant description is required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            name: values.restaurantName,
            address: values.restaurantAddress,
            description: values.restaurantDescription
          };

          console.log(dataToSubmit);

          axios.post(API.CREATE_RESTAURANT_URL, dataToSubmit, {
            headers: {
                'authorization': "Bearer " + Auth.getToken(),
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
          }).then(response => {
            if(response.data) {
              setSubmitSuccessMessage("Restaurant was created successfully!");
            } else {
              setSubmitErrorMessage("Restaurant was not created");
              alert("Restaurant wasn't created");
            }
          }, errors => {
            alert("Restaurant wasn't created");
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting
        } = props;
        return (
          <div className="root_container">
            <h1>{header}</h1>
            <h4>
              <i>{subHeader}</i>
            </h4>
            <Form>
              {restaurantIdFormItem(props)}

              <Form.Item required label="Name" hasFeedback
                validateStatus={
                  errors.restaurantName && touched.restaurantName ? "error" : "success"
                }>
                <Input
                  id="restaurantName"
                  placeholder="Enter your restaurant name"
                  type="text"
                  value={values.restaurantName}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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

              <Form.Item required styles={{width: "100%"}} label="Description" hasFeedback
                validateStatus={
                  errors.restaurantDescription && touched.restaurantDescription ? "error" : "success"
                }>
              <TextField
                id="restaurantDescription"
                label="Describe your restaurant....."
                multiline
                rows={8}
                variant="outlined"
                value={values.restaurantDescription}
                onChange={handleChange}
                onBlur={handleBlur}
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
                  type="primary"
                  className="button-submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <div styles={{color: "green"}}>{submitSuccessMessage}</div>
            <div styles={{color: "red"}}>>{submitErrorMessage}</div>
          </div>
        );
      }}
    </Formik>
  );
}
