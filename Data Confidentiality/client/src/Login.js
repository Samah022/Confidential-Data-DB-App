import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookies] = useCookies(["access_token"]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:3001/login", { username, password });
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.adminID);
        window.location.reload(false)
    };

    return (
        <AuthForm
            label="Welcome to your Diary ✒️"
            username={username}
            setUsername={setUsername}
            setPassword={setPassword}
            password={password}
            onSubmit={onSubmit}
        />
    );
};

const AuthForm = ({ label, username, setUsername, setPassword, password, onSubmit }) => {
    return (
        <Container>
            <Form className="form" onSubmit={onSubmit}>
                <h3 className="text-white">
                    {label}
                    <h6>Just to make sure insert Diary's key 👀</h6>
                </h3>
                <Form.Control
                    type="text"
                    placeholder="Author Name"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control
                    type="password"
                    placeholder="Key"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="success" type="submit">
                    Open!
                </Button>
            </Form>
        </Container>
    );
};
