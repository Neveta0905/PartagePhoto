const multer = require('multer');
const limit_size = 10000000

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + '_' + name);
  }
});

const Filter = (req,file,cb) => {
  if(!Object.keys(MIME_TYPES).includes(file.mimetype)){
    req.fileError='We only accept images'
    cb(null,false)
  } else {
    cb(null,true)
  }
}

module.exports = 
  multer({
      storage: storage, 
      limits:{fileSize: limit_size},
      fileFilter:Filter,
    },
  ).array('images',1000);
