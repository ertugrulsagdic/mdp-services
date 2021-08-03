import PasswordController from '../controller/PasswordController';
import express from 'express';

const app = express();

app.post('/Forgot', PasswordController.forgotPassword);
app.post('/Reset/:token', PasswordController.resetPassword);

module.exports = app;