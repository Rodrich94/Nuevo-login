import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  HeartOutlined,
  HomeOutlined,
  CalendarOutlined,
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
import Mail from "./components/Mail/Mail";
import Calendar from "./components/Calendar/Calendar";
import logo from "./components/assets/img/logo-beige-cropped.svg";
import { Envelope } from "react-bootstrap-icons";

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
            headerHeight: "10vh",
          },
          Menu: {
            darkItemBg: "rgb(43, 62, 76)",
          },
          Card: {
            headerBg: "rgb(135, 184, 103)",
            colorTextHeading: "rgb(43, 62, 76)",
            colorText: "rgb(43, 62, 76)",
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
            <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
              <Link to="/calendar">Calendario</Link>
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
                height: "90vh",
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
                <Menu.Item key="/mail" icon={<Envelope />}>
                  <Link to="/mail">Correo</Link>
                </Menu.Item>
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
              height: "90vh",
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
                <Route path="/" element={<div>Inicio</div>} />
                <Route path="/perfil" element={<Profile user={user} />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/mail" element={<Mail user={user} />} />
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
