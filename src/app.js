import authRoutes from './routes/authRoutes.js';
import express from "express";

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API');
});
export default app;