import authRoutes from './routes/authRoutes';

const app = express();

app.use('/auth', authRoutes);

export default app;