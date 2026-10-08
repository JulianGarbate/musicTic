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

const crearCancion = async (req = request, res = response) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'Falta nombre' });
    }
    try{
        const cancion = await authService.crearCancion(nombre);
        res.status(201).json({ cancion });
    }
    catch (error) {
        console.error('Error al crear canción:', error);
        res.status(500).json({ message: 'Error al crear canción' });
    }
}

const escucho = async (req = request, res = response) => {
    const { token, cancionId } = req.body;
    if (!token || !cancionId) {
        return res.status(400).json({ message: 'Faltan token o cancionId' });
    }
    const userId = authService.verificarToken(token);
    if (!userId) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    try{
        const escucha = await authService.registrarEscucha(userId, cancionId);
        res.json({ escucha });
    }
    catch(error) {
        console.error('Error al registrar escucha:', error);
        res.status(500).json({ message: 'Error al registrar escucha' });
    }
}

export { crearUsuario, login, crearCancion, escucho };
