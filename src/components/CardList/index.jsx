import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import React, { useState, useEffect } from "react";

export default function CardList({ list, onCardClick }) {
  function PlaceCard({ place }) {
    const [cityName, setCityName] = useState("");

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

    return (
      <Card
        hoverable
        onClick={() => onCardClick(place)}
        style={{ width: 240 }}
        cover={<img alt={place.company} src={place.picture} />}
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
