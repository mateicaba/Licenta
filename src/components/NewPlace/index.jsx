import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Select } from "antd";
import "./style.css";
import { uploadPhoto } from "../../api/awsConnection";

const { Option } = Select;

const NewPlace = ({ onCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const file = fileList[0];
      const key = await uploadPhoto(file);
      console.log("Uploaded file with key:", key);
      // Add the key to the form values before submitting
      values.picture = key;
      // TODO: Submit the form values to your backend
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  useEffect(() => {
    async function fetchCityName() {
      // Fetch the city name based on the city id stored in the place data
      const response = await fetch(`http://localhost:3001/cities/${cityId}`);
      const city = await response.json();
      setCityName(city.name);
    }
    fetchCityName();
  }, [cityId]);

  useEffect(() => {
    async function fetchCitiesData() {
      const response = await fetch(`http://localhost:3001/cities`);
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

  return (
    <div className="new-place">
      <h1>Add your place</h1>

      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input the name of your place!" },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="picture"
          valuePropName="fileList"
          getValueFromEvent={onFileChange}
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
