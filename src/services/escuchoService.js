import query from "../db.js";

export const registrarEscucha = async (userId, cancionId) => {
    const cancion = await query('SELECT id FROM cancion WHERE id = $1', [cancionId]);
    if (cancion.rows.length === 0) {
        return { error: 'Canción no encontrada' };
    }
    let result = await query(
        'UPDATE escucha SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2 RETURNING *',
        [userId, cancionId]);
    if (result.rows.length === 0) {
        result = await query(
            'INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1) RETURNING *',
            [userId, cancionId]);
    }
    await query(
        `UPDATE usuario SET fan = true
         WHERE id = $1 AND fan = false
           AND (SELECT COUNT(*) FROM escucha WHERE usuario_id = $1) > 10`,
        [userId]);
    const fan = await query('SELECT fan FROM usuario WHERE id = $1', [userId]);
    return { escucha: result.rows[0], fan: fan.rows[0]?.fan ?? false };
};
