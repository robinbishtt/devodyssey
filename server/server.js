import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.db.js';
import cookieParser from 'cookie-parser';

connectDB();
const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

// Import routes
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blogs.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});