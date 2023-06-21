import express, { Request } from 'express';
import multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void


const app = express();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, 'public/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post('/upload', upload.single('image'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        return next(error);
    }
    res.send(file);
    }
);

app.get('/', (req, res) => {
    res.send('Hello world!');
    }
);

app.listen(3000, () => {
    console.log('Server is listening on port http://localhost:3000');
    }
);
