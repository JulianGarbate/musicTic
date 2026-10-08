export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.rol === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    });
}
