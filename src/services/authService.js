import query from "../db.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const crearUsuario = async (nombre, password) => {
    const hashedPassword = await bycrypt.hash(password, 10);
    await query('INSERT INTO usuario (nombre, password) VALUES ($1, $2)', [nombre, hashedPassword]);
};

export const login = async (userId, password) => {
    const result = await query('SELECT * FROM usuario WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
        return { error: 'Usuario no encontrado' };
    }
    const user = result.rows[0];
    const compararPasword = await bycrypt.compare(password, user.password);
    if (!compararPasword) {
        return { error: 'Contraseña incorrecta' };
    }
    return { token: jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' }) };
};

export const crearCancion = async (nombre) => {
    const result = await query('INSERT INTO cancion (nombre) VALUES ($1) RETURNING *', [nombre]);
    return result.rows[0];
};

export const verificarToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET).userId;
    }
    catch {
        return null;
    }
};

export const registrarEscucha = async (userId, cancionId) => {
    let result = await query('UPDATE escucha SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2 RETURNING *', [userId, cancionId]);
    if (result.rows.length === 0) {
        result = await query('INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1) RETURNING *', [userId, cancionId]);
    }
    return result.rows[0];
};
