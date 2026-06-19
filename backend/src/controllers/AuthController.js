import { AuthService } from '../services/AuthService.js';
import { validateRegister, validateLogin } from '../validations/validators.js';

export class AuthController {
  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;

      const validation = validateRegister({ fullname, email, password });
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const result = await AuthService.register(fullname, email, password);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          userId: result.userId,
          fullname: result.fullname,
          email: result.email,
          token: result.token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const validation = validateLogin({ email, password });
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const result = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          userId: result.userId,
          fullname: result.fullname,
          email: result.email,
          token: result.token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await AuthService.getUserProfile(req.userId);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}
