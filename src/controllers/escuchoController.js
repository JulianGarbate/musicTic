import { request, response } from "express";
import * as escuchoService from "../services/escuchoService.js";

export const escucho = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Falta id de la canción' });
    try {
        const { error, escucha, fan } = await escuchoService.registrarEscucha(req.user.userId, id);
        if (error) return res.status(404).json({ message: error });
        res.json({ escucha, fan });
    } catch (error) {
        console.error('Error al registrar escucha:', error);
        res.status(500).json({ message: 'Error al registrar escucha' });
    }
};
