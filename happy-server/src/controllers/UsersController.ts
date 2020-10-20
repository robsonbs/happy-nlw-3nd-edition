import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';

export default {
  /**
   * CRIAR UM NOVO USUÁRIO
   *
   * Um usuário com nome, email e senha criptografada
   *
   * RN {
   *      usuários possuem email único;
   *
   *
   */
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

    return res.status(201).json({ user });
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

    return res.status(200).json({ user, token });
  },
};
