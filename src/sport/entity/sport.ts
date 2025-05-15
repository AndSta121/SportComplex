import { SportClass } from "src/classes/entity/class";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity( { name: 'sport'})
export class Sport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => SportClass, (cls) => cls.sport, {cascade: true})
  classes: SportClass[];
}