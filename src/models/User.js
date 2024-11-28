"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.ProfileHandler = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ProfileHandler;
(function (ProfileHandler) {
    ProfileHandler.loginHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        if (pEmail && pPassword) {
            //vou buscar no banco se existe um usuário com este email e esta senha
            if (pEmail === "batman@batman.com"
                && pPassword === "123bat") {
                //autorizado devolver um token
                const userDetails = {
                    id: 100,
                    name: 'Batman',
                    email: 'batman@batman.com',
                    balance: 500
                };
                //gerou o token
                const accessToken = jsonwebtoken_1.default.sign(userDetails, 'minhachave');
                //devolver o token como resposta 
                res.statusCode = 200;
                res.json({ accessToken });
            }
            else {
                //não autorizando
                res.statusCode = 401;
                res.json({ message: 'Email ou senha inválidos' });
            }
        }
        else {
            res.statusCode = 400;
            res.json({ message: 'Faltando parametros para a requisição' });
        }
    });
    ProfileHandler.getWalletBalance = (resq, res) => __awaiter(this, void 0, void 0, function* () {
        //pegar o saldo que veio no token, e devolver que testar.
        //res.json({balance: X})
    });
})(ProfileHandler || (exports.ProfileHandler = ProfileHandler = {}));
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "walletBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isModerator", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
