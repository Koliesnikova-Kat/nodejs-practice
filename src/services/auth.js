import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/Session.js';
import { createSession } from '../utils/createSession.js';

export const findUser = (query) => UsersCollection.findOne(query);

export const findSession = (query) => SessionsCollection.findOne(query);

export const registerUser = async (payload) => {
  const user = await findUser({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await findUser({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ userId: user._id });

  const session = createSession();

  return SessionsCollection.create({
    userId: user._id,
    ...session,
  });
};
