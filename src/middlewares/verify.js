import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ message: 'Falta el token' });
    }
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user?.rol === 'A') {
        return next();
    }
    res.status(403).json({ message: 'Requiere rol admin' });
};
