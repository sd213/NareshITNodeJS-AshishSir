# Uploading Image

## There are multiple ways to upload image in nodejs

### Multiple Ways to Upload Images in Node.js Using ES6+ Syntax

#### 1. **Using `multer` Middleware**

`multer` is a popular middleware for handling `multipart/form-data`, especially useful for file uploads.

##### **Steps:**

1. Install `multer`:

   ```bash
   npm install multer
   ```

2. Set up an Express server and configure `multer`:

   ```javascript
   import express from 'express';
   import multer from 'multer';
   import path from 'path';

   const app = express();

   // Set storage engine
   const storage = multer.diskStorage({
     destination: './uploads/',
     filename: (req, file, cb) => {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
     },
   });

   // Initialize upload
   const upload = multer({
     storage: storage,
     limits: { fileSize: 1000000 }, // Limit to 1MB
     fileFilter: (req, file, cb) => {
       checkFileType(file, cb);
     },
   }).single('image');

   // Check file type
   function checkFileType(file, cb) {
     const filetypes = /jpeg|jpg|png|gif/;
     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
     const mimetype = filetypes.test(file.mimetype);
     if (mimetype && extname) {
       return cb(null, true);
     } else {
       cb('Error: Images Only!');
     }
   }

   // Upload route
   app.post('/upload', (req, res) => {
     upload(req, res, (err) => {
       if (err) {
         res.status(400).send(err);
       } else {
         if (req.file == undefined) {
           res.status(400).send('No file selected!');
         } else {
           res.send(`File uploaded: ${req.file.filename}`);
         }
       }
     });
   });

   app.listen(3000, () => console.log('Server started on port 3000'));
   ```

3. Create an `uploads/` directory in your project root to store the uploaded images.

#### 2. **Using `formidable` for Handling File Uploads**

`formidable` is another option for handling file uploads without needing a middleware like `multer`.

1. Install `formidable`:

   ```bash
   npm install formidable
   ```

2. Set up your Express server with `formidable`:

   ```javascript
   import express from 'express';
   import { IncomingForm } from 'formidable';

   const app = express();

   // Upload route using formidable
   app.post('/upload', (req, res) => {
     const form = new IncomingForm();

     form.uploadDir = './uploads';
     form.keepExtensions = true;

     form.parse(req, (err, fields, files) => {
       if (err) {
         res.status(400).send(err);
       } else {
         res.send(`File uploaded: ${files.image.newFilename}`);
       }
     });
   });

   app.listen(3000, () => console.log('Server started on port 3000'));
   ```

#### 3. **Using `base64` Encoded Strings**

Sometimes you might want to upload an image as a `base64` encoded string, store it directly in a database, or process it differently.

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
  const { image } = req.body; // Expecting base64 encoded string

  const buffer = Buffer.from(image, 'base64');
  fs.writeFile('./uploads/image.png', buffer, (err) => {
    if (err) {
      res.status(400).send('Failed to upload image');
    } else {
      res.send('Image uploaded');
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

#### 4. **Using `express-fileupload`**

`express-fileupload` is a simpler option for file uploads compared to `multer`.

1. Install `express-fileupload`:

   ```bash
   npm install express-fileupload
   ```

2. Set up your Express server:

   ```javascript
   import express from 'express';
   import fileUpload from 'express-fileupload';

   const app = express();
   app.use(fileUpload());

   app.post('/upload', (req, res) => {
     if (!req.files || Object.keys(req.files).length === 0) {
       return res.status(400).send('No files were uploaded.');
     }

     const image = req.files.image;
     image.mv(`./uploads/${image.name}`, (err) => {
       if (err) {
         return res.status(500).send(err);
       }
       res.send('File uploaded!');
     });
   });

   app.listen(3000, () => console.log('Server started on port 3000'));
   ```

### Summary

- **`multer`**: Best for advanced use cases with file type validation and custom storage strategies.
- **`formidable`**: A good alternative for handling file uploads directly.
- **`base64`**: Useful for uploading images as base64 encoded strings, especially when interacting with APIs or databases.
- **`express-fileupload`**: Simplest for small projects where you need to quickly handle file uploads.

Each method has its use case, so the choice depends on your project requirements.
