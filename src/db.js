import pkg from 'pg'
import dotenv from 'dotenv';
const { Pool } = pkg

dotenv.config();

export const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    PGSSLMODE: process.env.PGSSLMODE,
    database: process.env.DATABASE,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: process.env.SSL_REJECT_UNAUTHORIZED === 'true',
    },
    channelBiding: process.env.CHANNEL_BINDING,
});

export const dbControler = {
    pool: pool,
}

const query = async (text, params = []) => {
    const client = await dbControler.pool.connect();
    try{
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
};

export default query;