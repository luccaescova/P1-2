"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSQL = void 0;
const appDataSource_1 = require("../config/appDataSource");
const runSQL = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, params = []) {
    try {
        const connection = yield appDataSource_1.AppDataSource.initialize();
        const result = yield connection.query(query, params);
        console.log("Consulta executada com sucesso:", result);
        yield connection.destroy();
    }
    catch (error) {
        console.error("Erro ao executar SQL:", error);
    }
});
exports.runSQL = runSQL;
