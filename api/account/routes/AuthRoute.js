import AuthController from '../controller/AuthController';
import express from 'express';

const app = express();

app.post('/Signup', AuthController.signupUser);
app.post('/Login', AuthController.loginUser);

module.exports = app;