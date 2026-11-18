import { request, response } from "express";
import * as authService from "../services/authService.js";

const crearUsuario = async (req = request, res = response) => {
    const { nombre, password } = req.body;
    if (!nombre || !password) {
        return res.status(400).json({ message: 'Faltan nombre o password' });
    }
    try{
        await authService.crearUsuario(nombre, password);
        res.status(201).json({ message: 'Usuario creado exitosamente'});
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
}

const login = async (req = request, res = response) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'Faltan userId o password' });
    }
    try{
        const { token, error } = await authService.login(userId, password);
        if (error) {
            return res.status(401).json({ message: error });
        }
        res.json({ token });
    }
    catch(error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

export { crearUsuario, login };
