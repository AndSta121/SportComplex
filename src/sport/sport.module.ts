import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './entity/sport';

@Module({
  providers: [SportService],
  controllers: [SportController],
  imports: [TypeOrmModule.forFeature([Sport])]
})
export class SportModule {}
