import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';
import userView from '../views/users_view';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const { name, email, password } = req.body;

    // verificar se existe um usuário com email
    const findUser = await usersRepository.findOne({ where: { email } });

    if (findUser) {
      throw new AppError('email always in use!');
    }

    const data = {
      name,
      email,
      password,
    };

    // inserir a usuario
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    data.password = await hash(data.password, 12);

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return res.status(201).json({ user: userView.render(user) });
  },
  async login(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const { email, password } = req.body;

    // verificar se existe um usuário com email
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password || '');

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    user.password = await hash(password, 12);

    await usersRepository.save(user);

    delete user.password;

    const { expiresIn, secret } = auth.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.status(200).json({ user: userView.render(user), token });
  },
  async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      /**
       * recuperar senha:
       * - encontrar usuário
       * - gerar token
       * - enviar email
       * - retornar
       */
      const usersRepository = getRepository(User);
      const { email } = req.body;

      // verificar se existe um usuário com email
      const user = await usersRepository.findOne({ where: { email } });

      if (!user) {
        throw new AppError('User not found', 401);
      }

      const token = crypto.randomBytes(32).toString('hex');

      const expiresDate = new Date();
      expiresDate.setHours(expiresDate.getHours() + 12);
      user.forgot_token = token;
      user.expires_token = expiresDate;

      await usersRepository.save(user);

      return res.json({ message: 'Um e-mail foi enviado para sua ' });
    } catch {
      throw new AppError('Error in forgot password!', 500);
    }
  },
};
