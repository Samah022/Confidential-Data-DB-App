import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3001/createusers", { username, password, message });
        alert(username);
    };

    return (
        <AuthForm2
            label="Start writing down your Diary ✒️"
            username={username}
            setUsername={setUsername}
            setPassword={setPassword}
            password={password}
            onSubmit={onSubmit}
            message={message}
            setMessage={setMessage}
        />
    );
};

const AuthForm2 = ({ label, username, setUsername, setPassword, password, message, setMessage, onSubmit }) => {
    return (
        <Container>
            <Form className="form" onSubmit={onSubmit}>
                <h3 className="text-white">{label}</h3>
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
                <Form.Control
                    type="text"
                    placeholder="Memoirs ...."
                    id="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="success" type="submit">
                    Done!
                </Button>
            </Form>
        </Container>
    );
};


