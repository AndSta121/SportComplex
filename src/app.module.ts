import { Module } from '@nestjs/common';
import { SportModule } from './sport/sport.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './sport/entity/sport';
import { SportClass } from './classes/entity/class';
import { User } from './auth/entity/user';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validate}), 
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'), //database: 'db.sqlite' --- if using sqlite db from project 
        entities: [Sport, SportClass, User],
        synchronize: false,
        logging: configService.get<boolean>('DB_LOGGING'),
      })

    }),
    AuthModule,
    SportModule, 
    ClassesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
