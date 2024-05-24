import React, { useState } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Row, Col, Form, Input, Button,DatePicker } from "antd";

const { Meta } = Card;

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar/deshabilitar la edición del formulario

  // Función para manejar el clic en el botón de edición
  const handleEditClick = () => {
    setIsEditing(!isEditing); // Cambia el estado de edición al contrario del estado actual
  };

  const gridStyle = {
    width: "100%",
    textAlign: 'center',
  };

  return (
    <Row gutter={16}>
      <Col span={10} align="middle">
        <Card
          style={{ width: 350 }}
          cover={<img alt="example" src={user.image} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={handleEditClick} />, // Agrega onClick handler para el botón de edición
          ]}
        >
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={user.name}
          />
        </Card>
      </Col>
      <Col span={10}>
        <Card title="Detalles">
          <Form style={{ marginTop: 16 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Nombre y Apellido" name="name" initialValue={user.name}>
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Fecha de Nacimiento" name="joinDate" initialValue={user.joinDate}>
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="Descripción" name="description" initialValue={user.description}>
              <Input disabled={!isEditing} />
            </Form.Item>
            {isEditing && (
              <Form.Item>
                <Button type="primary" style={{ marginRight: 8 }}>Guardar</Button>
                <Button onClick={handleEditClick}>Cancelar</Button>
              </Form.Item>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
