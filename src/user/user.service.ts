import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>, password?: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email_usuario: userData.email_usuario },
    });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User();
    Object.assign(user, userData);

    // Hash password if provided (for local registration)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.hash = hash;
      user.salt = salt;
    }

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email_usuario: email },
    });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { googleId },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id_usuario: id },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.hash) {
      return false;
    }
    return await bcrypt.compare(password, user.hash);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }
}
