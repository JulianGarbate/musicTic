import query from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const crearUsuario = async (nombre, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO usuario (nombre, password) VALUES ($1, $2)', [nombre, hashedPassword]);
};

export const login = async (userId, password) => {
    const result = await query('SELECT * FROM usuario WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
        return { error: 'Usuario no encontrado' };
    }
    const user = result.rows[0];
    if (!(await bcrypt.compare(password, user.password))) {
        return { error: 'Contraseña incorrecta' };
    }
    return { token: jwt.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' }) };
};
