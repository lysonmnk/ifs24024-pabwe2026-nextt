import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/app-error.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export class AuthService {
  constructor(repo = userRepository) {
    this.repo = repo;
  }

  validateRegisterInput({ nama, email, password }) {
    const errors = [];

    if (!nama || typeof nama !== 'string' || nama.trim() === '') {
      errors.push('Nama lengkap wajib diisi');
    } else if (nama.trim().length < 2 || nama.trim().length > 50) {
      errors.push('Nama harus berisi antara 2 hingga 50 karakter');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || email.trim() === '') {
      errors.push('Email wajib diisi');
    } else if (!emailRegex.test(email.trim())) {
      errors.push('Format email tidak valid');
    }

    if (!password || typeof password !== 'string') {
      errors.push('Kata sandi wajib diisi');
    } else if (password.length < 8) {
      errors.push('Kata sandi minimal 8 karakter');
    }

    if (errors.length > 0) {
      throw new AppError('Validasi registrasi gagal', 400, errors);
    }
  }

  validateLoginInput({ email, password }) {
    const errors = [];

    if (!email || typeof email !== 'string' || email.trim() === '') {
      errors.push('Email wajib diisi');
    }

    if (!password || typeof password !== 'string' || password === '') {
      errors.push('Kata sandi wajib diisi');
    }

    if (errors.length > 0) {
      throw new AppError('Input tidak valid', 400, errors);
    }
  }

  async register({ nama, email, password }) {
    this.validateRegisterInput({ nama, email, password });

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = this.repo.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new AppError('Email sudah terdaftar', 409, ['Email sudah digunakan oleh akun lain']);
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = this.repo.create({
      nama: nama.trim(),
      email: normalizedEmail,
      password_hash
    });

    return {
      id: newUser.id,
      nama: newUser.nama,
      email: newUser.email,
      created_at: newUser.created_at
    };
  }

  async login({ email, password }) {
    this.validateLoginInput({ email, password });

    const normalizedEmail = email.trim().toLowerCase();
    const user = this.repo.findByEmail(normalizedEmail);

    if (!user) {
      throw new AppError('Email atau kata sandi salah', 401, ['Email atau kata sandi salah']);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Email atau kata sandi salah', 401, ['Email atau kata sandi salah']);
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      nama: user.nama
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return {
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email
      }
    };
  }

  getProfile(userId) {
    const user = this.repo.findById(userId);
    if (!user) {
      throw new AppError('Pengguna tidak ditemukan', 404, ['Data profil pengguna tidak ditemukan']);
    }
    return user;
  }
}

export const authService = new AuthService();
