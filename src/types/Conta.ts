import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero!")
    }
    if (valor > saldo) {
        throw new Error("O saldo é insuficiente!")
    }

    saldo -= valor;
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero!")
    }
    saldo += valor;
}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor)
        } else {
            throw new Error('Tipo de transação inválido!')
        }   
        console.log(novaTransacao);
        
    }
}

export default Conta;