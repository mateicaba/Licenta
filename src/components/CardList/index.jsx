import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import React, { useState, useEffect } from "react";
import { getPhotoUrl } from "../../api/awsConnection";

export default function CardList({ list, onCardClick }) {
  function PlaceCard({ place }) {
    const [cityName, setCityName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
      async function fetchCityName() {
        // Fetch the city name based on the city id stored in the place data
        const response = await fetch(
          `http://localhost:3001/cities/${place.city_id}`
        );
        const city = await response.json();
        setCityName(city.name);
      }
      fetchCityName();
    }, [place.city_id]);

    useEffect(() => {
      async function fetchPhotoUrl() {
        // Get the S3 object URL based on the S3 object key stored in the place data
        const url = await getPhotoUrl(place.picture);
        setPhotoUrl(url);
      }
      fetchPhotoUrl();
    }, [place.picture]);

    return (
      <Card
        hoverable
        onClick={() => onCardClick(place)}
        style={{ width: 240 }}
        cover={<img alt={place.company} src={photoUrl} />} // Use the photoUrl state variable
      >
        <Card.Meta
          title={place.company}
          description={cityName || "Loading..."}
          avatar={<CheckCircleOutlined style={{ color: "green" }} />}
        />
      </Card>
    );
  }

  return list.map((place) => (
    <Col key={place.id}>
      <PlaceCard place={place} />
    </Col>
  ));
}
