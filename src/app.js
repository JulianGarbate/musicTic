import express from "express";
import authRoutes from './routes/authRoutes.js';
import cancionRoutes from './routes/cancionRoutes.js';
import escuchoRoutes from './routes/escuchoRoutes.js';

const app = express();

app.use(express.json());
app.use('/', authRoutes);
app.use('/cancion', cancionRoutes);
app.use('/escucho', escuchoRoutes);
app.get('/', (req, res) => {
    res.send('API');
});
export default app;
