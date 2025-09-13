import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: "varchar", length: 255 })
  nome_usuario: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email_usuario: string;

  @Column({ type: "integer", nullable: true })
  cod_tip_usuario: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefone_usuario: string;

  @Column({ type: "date", nullable: true })
  dt_nasc: Date;

  @Column({ type: "varchar", length: 11, nullable: true })
  cpf: string;

  @Column({ type: "integer", nullable: true })
  cod_interesse: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  contato_emerg: string;

  @Column({ type: "varchar", length: 8, nullable: true })
  cep: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  num_endereco: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  complemento_endereco: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  hash: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  salt: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
