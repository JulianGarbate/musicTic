import { request, response } from "express";
import query from "../db.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'clave-secreta';

const crearUsuario = async (req = request, res = response) => {
    const { userId, nombre, password } = req.body;
    try{
        const hashedPassword = await bycrypt.hash(password, 10);
        await query('INSERT INTO usuarios (userId, nombre, password) VALUES ($1, $2, $3)', [userId, nombre, hashedPassword]);
        res.status(201).json({ message: 'Usuario creado exitosamente'});
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
}

const login = async (req = request, res = response) => {
    const { userId, password } = req.body;
    try{
        const result = await query('SELECT * FROM usuarios WHERE userId = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const user = result.rows[0];
        const compararPasword = await bycrypt.compare(password, user.password);
        if (!compararPasword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch(error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

const escucho = async (req = request, res = response) => {
    const { token } = req.body;
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const result = await query('UPDATE escucha SET reproducciones = reproducciones + 1 WHERE userId = $1 RETURNING *', [userId]);
        res.json({ canciones: result.rows });
    }
    catch(error) {
        console.error('Error al obtener canciones:', error);
        res.status(500).json({ message: 'Error al obtener canciones' });
    }
}

export { crearUsuario, login, escucho };