import { Sport } from "src/sport/entity/sport";
import { User } from "src/users/entity/user";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'class'})
export class SportClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column('simple-array') 
  weeklySchedule: string[]; 

  @ManyToOne(() => Sport, (sport) => sport.classes)
  sport: Sport;

  @ManyToMany(() => User, (user) => user.sportClasses, {eager: true})
  users: User[];  
}