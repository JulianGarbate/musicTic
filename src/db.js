import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
    host: 'ep-calm-water-aczyziwa-pooler.sa-east-1.aws.neon.tech',
    user: 'neondb_owner',
    password: 'npg_XW4xqibJIAD8',
    PGSSLMODE: 'require',
    database: 'neondb',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
    channelBiding: 'require',
});

export const dbControler = {
    pool: pool,
}

export const query = async (text, params = []) => {
    const client = await dbControler.pool.connect();
    try{
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
};