const multer = require("multer");
const storageMulter= multer.diskStorage({
    destination : (req, file, cb) => cb(null, "../../media"),
    filename : (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const fileFilter = (req, file, cb) => {
    
    const ok = /jpeg|jpg|png|webp/.test(file.mimetype);
    cb( ok ? null : new Error('Formato inválido', ok));
}

module.exports = multer({ storageMulter ,fileFilter, 
    limits:{ fileSize: 5 * 1024 * 1024 }
 })