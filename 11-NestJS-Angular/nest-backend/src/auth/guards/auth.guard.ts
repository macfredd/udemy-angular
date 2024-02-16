import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private jwtService: JwtService,
    private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );

      var user = await this.authService.findUserById(payload.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      request['user'] = user
    } catch (e) {
      throw new UnauthorizedException(e)
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [ type, token ] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' && token ? token : undefined;
  }
}
