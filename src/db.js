import pkg from 'pg'
import dotenv from 'dotenv';
const { Pool } = pkg

dotenv.config();

export const pool = new Pool();

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
