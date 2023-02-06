import { Card, Col, Row } from "antd";
import React from "react";

export default function CardListLoader() {
  return (
    <Row gutter={[16, 16]}>
      {new Array(16)
        .fill()
        .map((_, index) => ({ id: index }))
        .map((place) => (
          <Col key={place.id}>
            <Card
              loading
              style={{ width: 240 }}
              cover={<img alt="example" src={place.image} />}
            >
              <Card.Meta title={place.company} description={place.price} />
            </Card>
          </Col>
        ))}
    </Row>
  );
}
