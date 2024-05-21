import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  HeartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import logo from "./components/assets/img/logo-beige-cropped.svg";

const { Header, Content, Sider } = Layout;

const App = () => {
  const user = {
    name: "Leonel Bustamante",
    image: "https://media1.tenor.com/m/NVwxxoyoyGgAAAAd/racoon-pedro.gif",
    description: "Administrador de sistemas",
    joinDate: "1/1/2024",
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Obtener la ubicación actual
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  // Calcular la clave seleccionada del menú según la ubicación actual
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            fontFamilyCode: "'Manrope'",
            colorLink: "rgb(43, 62, 76)",
          },
          Layout: {
            algorithm: true,
            headerBg: "rgb(43, 62, 76)",
            bodyBg: "rgb(244, 223, 185,0.1)",
            headerHeight: 80
          },
          Menu: {
            darkItemBg: "rgb(43, 62, 76)",
          },
          Card: {
            "headerBg": "rgb(135, 184, 103)",
            "colorTextHeading": "rgb(43, 62, 76)",
            "colorText": "rgb(43, 62, 76)"
          },
        },
        token: {
          colorPrimary: "#87b867",
          colorInfo: "#87b867",
        },
      }}
    >
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img src={logo} height={64} alt="Logo" style={{ marginTop: 25 }} />
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{
              marginLeft: "10px",
              flex: 1,
              minWidth: 0,
            }}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Inicio</Link>
            </Menu.Item>
            <Menu.Item key="#" icon={<UserOutlined />}>
              <Link to="#">Prueba1</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={selectedKeys}
              style={{
                height: "100vh",
                borderRight: 0,
                paddingTop: "30px",
              }}
            >
              <Menu.Item key="/perfil" icon={<UserOutlined />}>
                <Link to="/perfil">Perfil</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="sub1"
                icon={<AppstoreOutlined />}
                title="Aplicaciones"
              >
                <Menu.Item key="21">App 1</Menu.Item>
                <Menu.Item key="22">App 2</Menu.Item>
                <Menu.Item key="23">App 3</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub2"
                icon={<HeartOutlined />}
                title="Favoritos"
              >
                <Menu.Item key="31">Favorito 1</Menu.Item>
                <Menu.Item key="32">Favorito 2</Menu.Item>
                <Menu.Item key="33">Favorito 3</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Inicio</Link>
              </Breadcrumb.Item>
              {pathnames.map((value, index) => {
                const url = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                  <Breadcrumb.Item key={url}>
                    <Link to={url}>{value}</Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/perfil" element={<Profile user={user} />} />
                <Route path="/" element={<div>Inicio</div>} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
