import React, { useState } from "react";
import { Form, Input, Button, Tabs } from "antd";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [institutionPassword, setInstitutionPassword] = useState("");

  const onFinishUser = (values) => {
    console.log("User Registration Data:", values);
  };

  const onFinishInstitution = (values) => {
    console.log("Institution Registration Data:", values);
  };

  const onFinishPasswordReset = (values) => {
    console.log("Password Reset Data:", values);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(value)) {
      return Promise.reject(
        new Error(
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        )
      );
    }
    return Promise.resolve();
  };

  const handleDNIChange = (e) => {
    const dni = e.target.value;
    if (dni.length === 8) {
      // Simulación de búsqueda de nombre y apellido por DNI
      setUserData({ name: "Juan", surname: "Pérez" });
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*/";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleGenerateUserPassword = () => {
    const newPassword = generatePassword();
    setUserPassword(newPassword);
  };

  const handleGenerateInstitutionPassword = () => {
    const newPassword = generatePassword();
    console.log(newPassword);
    setInstitutionPassword(newPassword);
  };

  const items = [
    {
      key: "1",
      label: "Registro de Usuario",
      children: (
        <Form
          name="user_registration"
          onFinish={onFinishUser}
          layout="vertical"
        >
          <Form.Item
            label="DNI"
            name="dni"
            rules={[{ required: true, message: "Por favor ingrese su DNI" }]}
          >
            <Input onChange={handleDNIChange} />
          </Form.Item>
          <Form.Item label="Nombre">
            <Input value={userData.name} readOnly />
          </Form.Item>
          <Form.Item label="Apellido">
            <Input value={userData.surname} readOnly />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password value={userPassword} />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleGenerateUserPassword}>
              Generar Contraseña
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Registro de Institución",
      children: (
        <Form
          name="institution_registration"
          onFinish={onFinishInstitution}
          layout="vertical"
        >
          <Form.Item
            label="Nombre de la Organización"
            name="organizationName"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre de la organización",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CUIT"
            name="cuit"
            rules={[{ required: true, message: "Por favor ingrese el CUIT" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password value={institutionPassword} />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleGenerateInstitutionPassword}>
              Generar Contraseña
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: "Blanqueo de Clave",
      children: (
        <Form
          name="password_reset"
          onFinish={onFinishPasswordReset}
          layout="vertical"
        >
          <Form.Item
            label="DNI o CUIT"
            name="identifier"
            rules={[
              { required: true, message: "Por favor ingrese su DNI o CUIT" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre de la Cuenta"
            name="accountName"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre de la cuenta",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Blanquear Clave
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default RegistrationForm;
