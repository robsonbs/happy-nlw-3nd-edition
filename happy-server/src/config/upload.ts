import multer, { Options } from 'multer';
import path from 'path';

function slug(name: string): string {
  return name.replace(' ', '');
}

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const filename = slug(`${Date.now()}-${file.originalname}`);
      cb(null, filename);
    },
  }),
} as Options;
