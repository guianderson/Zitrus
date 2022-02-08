import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    nome: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    cpf: string

    @Column({nullable: false})
    cep: string

    @Column({nullable: false})
    numerocasa: number

    @Column({nullable: false})
    celular: string

    @Column({nullable: false})
    logradouro: string

    @Column({nullable: false})
    bairro: string

    @Column({nullable: false})
    cidade: string

    @Column({nullable: false})
    uf: string
}