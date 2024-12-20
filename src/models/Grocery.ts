import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column("decimal")
  price!: number;

  @Column()
  inventory!: number;
}
