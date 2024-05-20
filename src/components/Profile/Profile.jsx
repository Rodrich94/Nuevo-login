import React from 'react';
import { Card } from 'react-bootstrap';
import {Button} from 'antd';
import './Profile.css'
const Profile = ({ user }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.image} alt={`${user.name}'s profile picture`} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          {user.description}
        </Card.Text>
        <Button type="primary">Ver al HDP</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Creo que nacio en: {user.joinDate}</small>
      </Card.Footer>
    </Card>
  );
};

export default Profile;
