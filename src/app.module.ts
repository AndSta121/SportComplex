import { Module } from '@nestjs/common';
import { SportModule } from './sport/sport.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './sport/entity/sport';
import { SportClass } from './classes/entity/class';
import { User } from './auth/entity/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Sport, SportClass, User],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    SportModule, 
    ClassesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
