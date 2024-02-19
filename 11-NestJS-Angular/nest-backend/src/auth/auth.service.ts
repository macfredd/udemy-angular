import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
  private jwtService: JwtService ) {}
  

  async create(createAuthDto: CreateUserDto) : Promise<User> {
      const { password } = createAuthDto;
      createAuthDto.password = bcryptjs.hashSync(password, 10);
      
      const createdUser = new this.userModel(createAuthDto);
      
      await createdUser.save();

      const { password: pass, ...result } = createdUser.toJSON();
      return result;
  }

  async login(loginDto: LoginDto) : Promise<LoginResponse>{
    const { email, password } = loginDto;
    const user = await this.userModel
      .findOne({ email });

    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    const { password: pass, ...result } = user.toJSON();

    return {
      user,
      "token": this.getJwtToken({ id: user.id })
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {

    var user = await this.create(registerUserDto);
    
    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    };
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const  { password, ...result } = user.toJSON();

    return result;
  }

  checkToken(user: User): LoginResponse {
    return {
        user: user,
        token: this.getJwtToken({ id: user._id })
      };
  }

  getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
