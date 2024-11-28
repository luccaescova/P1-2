import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {Request, RequestHandler, Response} from 'express';
import jwt from "jsonwebtoken";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    walletBalance: number;

    @Column({ default: false })
    isModerator: boolean;
}

export namespace ProfileHandler{

    export const loginHandler: RequestHandler = 
        async(req: Request, res: Response) => {
            const pEmail = req.get('email');
            const pPassword = req.get ('password');
            if(pEmail && pPassword){
                //vou buscar no banco se existe um usuário com este email e esta senha
                if(pEmail === "batman@batman.com" 
                    && pPassword === "123bat" ){
                            //autorizado devolver um token
                            const userDetails = {
                              id: 100,
                              name: 'Batman',
                              email: 'batman@batman.com',
                              balance: 500
                            }
                            //gerou o token
                            const accessToken = jwt.sign (userDetails,'minhachave');

                            //devolver o token como resposta 
                            res.statusCode = 200;
                            res.json ({accessToken});
                }else{
                    //não autorizando
                    res.statusCode = 401;
                    res.json ({message: 'Email ou senha inválidos'});
                }
            }else{
                res.statusCode = 400;
                res.json({message: 'Faltando parametros para a requisição'});
            }


        }

    
    
    export const getWalletBalance: RequestHandler = 
        async (resq: Request, res: Response) => {
            //pegar o saldo que veio no token, e devolver que testar.
            //res.json({balance: X})
        }
}