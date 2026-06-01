const multer = require("multer");
const path = require('path');

const sanitize = (name) => name.replace(/[^a-zA-Z0-9.-]/g, '_');

const storageMulter= multer.diskStorage({
    destination : (req, file, cb) => cb(null, path.join(__dirname, "../../media")),
    filename : (req, file, cb) => cb(null, `${Date.now()}-${sanitize(file.originalname)}`)
})

const fileFilter = (req, file, cb) => {
    
    const ok = /jpeg|jpg|png|webp/.test(file.mimetype);
    cb( ok ? null : new Error('Formato inválido'), ok);
}

const upload = multer({ 
    storage: storageMulter, 
    fileFilter, 
    limits:{ fileSize: 5 * 1024 * 1024 }
 })

module.exports = { upload }