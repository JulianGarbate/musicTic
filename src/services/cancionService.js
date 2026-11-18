import query from "../db.js";

export const crearCancion = async (nombre) => {
    const result = await query('INSERT INTO cancion (nombre) VALUES ($1) RETURNING *', [nombre]);
    return result.rows[0];
};

export const modificarCancion = async (id, nombre) => {
    const result = await query('UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    return result.rows[0];
};

export const borrarCancion = async (id) => {
    const result = await query('DELETE FROM cancion WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
