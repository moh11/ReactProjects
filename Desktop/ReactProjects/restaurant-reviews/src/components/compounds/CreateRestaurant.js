import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "antd/dist/antd.css";
import "./CreateOrEditRestaurant.css";
import { Form, Input, Button } from "antd";
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

export default function CreateRestaurant(props) {
  const [submitResultMessage, setSubmitResultMessage] = useState("");
  console.log(props);

  const dispatch = useDispatch();

  const canEdit = props.canEdit;
  const header = props.header;
  const subHeader = props.subHeader;

  const handleCreateRestaurant = values => {
    return {};
  };

  const handleEditRestaurant = values => {
    return {};
  };

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

  const validateForm = values => {
    console.log("validating");
    const errors = {};

    if (!values.restaurantId) {
      if (!values.restaurantName) {
        errors.restaurantName = "Required";
      }
      if (!values.restaurantDescription) {
        errors.restaurantDescription = "Required";
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        restaurantName: "",
        restaurantAddress: "",
        restaurantDescription: ""
      }}
      validate={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("in submit fn");
          var messageToShow = "";
          var actionFunc = () => {};
          if (values.restaurantId) {
            messageToShow = "Restaurant has been created successfully";
            actionFunc = handleEditRestaurant;
          } else {
            messageToShow = "Restaurant has been edited successfully";
            actionFunc = handleCreateRestaurant;
          }

          let dataToSubmit = {
            restaurant_id: values.restaurantId,
            restaurant_name: values.restaurantName,
            restaurant_address: values.restaurantAddress,
            restaurant_description: values.restaurantDescription
          };

          // actionFunc(dataToSubmit).then(response => {
          //   if (response.payload.success) {
          // setSubmitResultMessage(messageToShow);
          //   } else {
          alert("response.payload.err.errmsg");
          //   }
          // });

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
            <Form style={{ maxWidth: "375px" }} {...formItemLayout}>
              {restaurantIdFormItem(props)}

              <Form.Item label="Restaurant">
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

              <Form.Item label="Description">
                <Input
                  id="restaurantDescription"
                  placeholder="Describe your restaurant"
                  type="text"
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
                  className="button-details"
                  disabled={isSubmitting}
                >
                  Details
                </Button>
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
            <div>{submitResultMessage}</div>
          </div>
        );
      }}
    </Formik>
  );
}
