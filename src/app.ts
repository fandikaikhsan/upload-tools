import express from 'express';
import multer from 'multer';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
    }
);

app.listen(3000, () => {
    console.log('Server is listening on port http://localhost:3000');
    }
);
