import React from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Row,Col } from "antd";

const { Meta } = Card;

const Profile = ({ user }) => {
  const gridStyle = {
    width: "100%",
    textAlign: 'center',
  };

  return (
    <Row gutter={16}>
      <Col span={9}>
          <Card
          style={{ width: 350 }}
          cover={<img alt="example" src={user.image} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title={user.name}
          />
        </Card>
        </Col>      
        <Col span={15}>
        <Card title="Detalles" >
          <Card.Grid hoverable={false} style={gridStyle}>
            <p><b>Nombre y Apellido: </b> {user.name} </p>
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <p><b>Descripcion: </b> {user.description} </p>
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <p><b>Fecha de Nacimiento: </b> {user.joinDate} </p>
          </Card.Grid>
        </Card>
        </Col>
    </Row>
  );
};

export default Profile;
