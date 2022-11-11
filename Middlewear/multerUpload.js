import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

// Define the maximum size for uploading
// picture i.e. 10 MB. it is optional
const maxSize = 1 * 1000 * 10000;

export var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|pdf|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "File upload only supports the " + "following file types - " + filetypes
    );
  },

  // mypic is the name of file attribute
}).single("file");
