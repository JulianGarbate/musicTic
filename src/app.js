import authRoutes from './routes/authRoutes.js';
import express from "express";

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

export default app;