import * as Yup from 'yup';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanage_view';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return res.json(orphanageView.renderMany(orphanages));
  },
  async show(req: Request, res: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);
    const { id } = req.params;

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return res.json(orphanageView.render(orphanage));
  },
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      // se o erro lançado pela validação for capturado
      images.forEach(async ({ path: file }) => {
        // percorro a lista de imagens e as excluo
        const filePath = path.join(__dirname, '..', '..', 'uploads', file);
        await fs.promises.unlink(filePath);
      });

      throw err; // emito a exceção para continuar o fluxo de tratamento pelo errorHandler
    }
    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({ orphanage });
  },
};
