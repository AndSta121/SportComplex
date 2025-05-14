import { Module } from '@nestjs/common';
import { SportModule } from './sport/sport.module';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './sport/entity/sport';
import { SportClass } from './classes/entity/class';
import { User } from './users/entity/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'stype365',
      username: 'postgres',
      entities: [Sport, SportClass, User],
      database: 'VMTask',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    SportModule, 
    ClassesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
