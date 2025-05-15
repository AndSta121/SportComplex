import { SportClass } from "src/classes/entity/class";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'user'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({type: 'varchar'})
  firstName: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'text', default: UserRole.USER })
  role: UserRole;

  @ManyToMany(() => SportClass, (sportClass) => sportClass.users, { cascade: ['insert', 'update']}) 
  @JoinTable()  // This creates the join table for the many-to-many relationship
  sportClasses: SportClass[];
}

