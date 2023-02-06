import { Row, Space, Typography } from "antd";
import React from "react";
import CardList from "../CardList";
import { CardListLoader } from "../Loader";

export default function DashboardView({
  dashboard: { places = [], isLoading } = {},
  onCardClick,
  title,
}) {
  if (isLoading) {
    return <CardListLoader />;
  }

  return (
    <Space direction="vertical">
      <Typography.Title>{title}</Typography.Title>
      {(places?.length > 0 && (
        <Row gutter={[16, 16]}>
          <CardList list={places} onCardClick={onCardClick} />
        </Row>
      )) ||
        "No data available !"}
    </Space>
  );
}
