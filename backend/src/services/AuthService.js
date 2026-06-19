import bcryptjs from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { generateToken } from '../config/jwt.js';

export class AuthService {
  static async register(fullname, email, password) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      const error = new Error('Email already registered');
      error.status = 400;
      throw error;
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const userId = await UserModel.create(fullname, email, passwordHash);

    const token = generateToken(userId);

    return {
      userId,
      token,
      fullname,
      email
    };
  }

  static async login(email, password) {
    const user = await UserModel.getPassword(email);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = generateToken(user.id);
    const userProfile = await UserModel.findById(user.id);

    return {
      userId: user.id,
      token,
      fullname: userProfile.fullname,
      email: userProfile.email
    };
  }

  static async getUserProfile(userId) {
    return await UserModel.findById(userId);
  }
}
