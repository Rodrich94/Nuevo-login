import React from 'react';
import { Card,Row , Col} from 'antd';
import { HeartOutlined, ExportOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Home = () => {
  // Supongamos que tienes un array llamado `data` con la información para cada tarjeta
  const data = [
    {
      id: 1,
      title: 'Ejemplo aplicacion 1',
      description: 'www.example.com/1',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEHvh09MRd11LyvN3MVU6pvbArNwMCoCh2Q&s',
    },
    {
      id: 2,
      title: 'Ejemplo aplicacion 2',
      description: 'www.example.com/2',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEHvh09MRd11LyvN3MVU6pvbArNwMCoCh2Q&s',
    },
    // Agrega más objetos de datos según sea necesario
  ];

  return (
    <Row gutter={16}>
      {data.map((item) => (
        <Col span={8}>
            <Card
            key={item.id}
            hoverable
            style={{ width: 300    }}
            cover={<img alt={item.title} src={item.image} />}
            actions={[
              <HeartOutlined key="fav"/>,
              <a href='#example' target='_blank'><ExportOutlined/></a>
            ]}
            >
            <Meta title={item.title} description={item.description} />
            </Card>
        </Col>    
      ))}
    </Row>
  );
};

export default Home;
