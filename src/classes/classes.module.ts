import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportClass } from './entity/class';
import { Sport } from 'src/sport/entity/sport';
import { User } from 'src/auth/entity/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([SportClass, Sport, User])
  ],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
