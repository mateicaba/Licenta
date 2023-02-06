import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import React from "react";

export default function CardList({ list, onCardClick }) {
  return list.map((place) => (
    <Col key={place.id}>
      <Card
        hoverable
        onClick={() => onCardClick(place)}
        style={{ width: 240 }}
        cover={<img alt={place.company} src={place.picture} />}
      >
        <Card.Meta
          title={place.company}
          description={place.price}
          avatar={<CheckCircleOutlined style={{ color: "green" }} />}
        />
      </Card>
    </Col>
  ));
}
