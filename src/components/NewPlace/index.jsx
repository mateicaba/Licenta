import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Select } from "antd";
import "./style.css";
import { uploadPhoto, blobToBuffer } from "../../api/awsConnection";
import { API_URL } from "../../api/constants";

const { Option } = Select;
const uuid = require("uuid");

const NewPlace = ({ onCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  const onFinish = async (values) => {
  console.log("Received values of form: ", values);
  console.log("onFinish function called");

  // Retrieve user data from sessionStorage
  const username = sessionStorage.getItem('currentUsername');
  let userId;

  // Fetch user id based on username
  try {
    const response = await fetch(`${API_URL}/users?username=${username}`);
    const data = await response.json();
    userId = data[0].id;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return;
  }

  try {
    const file = fileList[0];
    const buffer = await blobToBuffer(file.originFileObj);
    const key = await uploadPhoto({
      ...file,
      buffer,
      mimetype: file.type,
    });
    console.log("Uploaded file with key:", key);

    // Map form data to match existing data structure
    const formData = {
      id: uuid.v4(), // Generate a new ID for this place
      available: true,
      picture: key,
      city_id: values.city,
      user_id: userId,
      company: values.title,
      email: values.email,
      phone: values.phone,
      about: values.description,
      reserved: ""
    };

    // Submit the form data to your backend
    const response = await fetch(`${API_URL}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Handle success, e.g. show success message, redirect, etc.
      console.log("Form data submitted successfully:", formData);
    } else {
      // Handle error, e.g. show error message, etc.
      console.error("Failed to submit form data:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to upload file:", error);
  }
};


  useEffect(() => {
    async function fetchCityName() {
      // Fetch the city name based on the city id stored in the place data
      const response = await fetch(`${API_URL}/cities/${cityId}`);
      const city = await response.json();
      setCityName(city.name);
    }
    fetchCityName();
  }, [cityId]);

  useEffect(() => {
    async function fetchCitiesData() {
      const response = await fetch(`${API_URL}/cities`);
      const data = await response.json();
      setCities(data);
    }
    fetchCitiesData();
  }, []);

  const onRemove = (file) => {
    setFileList([]);
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onCityChange = (value) => {
    setCityId(value);
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="new-place">
      <h1>Add your place</h1>

      <Form onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Please input the name of your place!" },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="picture"
          valuePropName="fileList"
          getValueFromEvent={getFile}
          rules={[
            {
              required: true,
              message: "Please upload a picture for your place!",
            },
          ]}
        >
          <Upload
            accept=".jpg,.jpeg,.png"
            listType="picture-card"
            fileList={fileList}
            onRemove={onRemove}
            onChange={onFileChange}
            beforeUpload={() => false} // prevent automatic upload
          >
            {fileList.length === 0 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input type="tel" placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input type="email" placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[{ required: true, message: "Please select a city!" }]}
        >
          <Select
            placeholder="Select a city"
            onChange={onCityChange}
            value={cityId}
          >
            {cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Place
          </Button>
        </Form.Item>
        <Button type="primary" onClick={onCancel}>
          Back
        </Button>
      </Form>
    </div>
  );
};

export default NewPlace;
