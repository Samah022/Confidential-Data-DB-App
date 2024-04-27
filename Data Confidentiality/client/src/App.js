import Axios from "axios";
import React, { useState, useEffect } from 'react';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ListGroup } from 'react-bootstrap'

export default function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/users")
      .then(res => {
        setUsers(res.data);
      });
  }, [users]);

  return (
    <Container>
      <div className="result">
        {users.map(user => (
          <ListGroup key={user.id}>
          <ListGroup.Item variant="dark" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Author Name: {user.name}</div> Memoirs: {user.message}
            </div>
          </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    </Container >
  );
}
