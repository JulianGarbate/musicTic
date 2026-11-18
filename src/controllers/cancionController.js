import { request, response } from "express";
import * as cancionService from "../services/cancionService.js";

export const crearCancion = async (req = request, res = response) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Falta nombre' });
    try {
        res.status(201).json({ cancion: await cancionService.crearCancion(nombre) });
    } catch (error) {
        console.error('Error al crear canción:', error);
        res.status(500).json({ message: 'Error al crear canción' });
    }
};

export const modificarCancion = async (req = request, res = response) => {
    const { id, nombre } = req.body;
    if (!id || !nombre) return res.status(400).json({ message: 'Faltan id o nombre' });
    try {
        const cancion = await cancionService.modificarCancion(id, nombre);
        if (!cancion) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json({ cancion });
    } catch (error) {
        console.error('Error al modificar canción:', error);
        res.status(500).json({ message: 'Error al modificar canción' });
    }
};

export const borrarCancion = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Falta id' });
    try {
        const cancion = await cancionService.borrarCancion(id);
        if (!cancion) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json({ message: 'Canción borrada', cancion });
    } catch (error) {
        console.error('Error al borrar canción:', error);
        res.status(500).json({ message: 'Error al borrar canción' });
    }
};
