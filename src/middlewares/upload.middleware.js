const multer = require("multer");
const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, "../../media"),
    filename : (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
