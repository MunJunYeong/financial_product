import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule, MiddlewareService } from 'libs';
import { UserRepo } from './user.repo';
import { JwtAuthModule } from '@app/jwt';

@Module({
    imports: [DatabaseModule, JwtAuthModule],
    controllers: [UserController],
    providers: [UserService, UserRepo],
    exports: [UserRepo],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(MiddlewareService)
            .forRoutes(
                { path: 'user/authenticate', method: RequestMethod.GET },
                { path: 'user/refresh', method: RequestMethod.POST },
                { path: 'user/:user_idx', method: RequestMethod.PUT },
                { path: 'user/:user_idx/otp', method: RequestMethod.PUT },
            );
    }
}
