import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key === "data") {
        return new Date(value)
    }

    return value
}) || [];

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero!")
    }
    if (valor > saldo) {
        throw new Error("O saldo é insuficiente!")
    }

    saldo -= valor;
    localStorage.setItem("saldo", JSON.stringify(saldo))
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero!")
    }
    saldo += valor;
    localStorage.setItem("saldo", JSON.stringify(saldo))
}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" })
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1).transacoes.push(transacao)
        }
        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor)
            novaTransacao.valor *= -1;
        } else {
            throw new Error('Tipo de transação inválido!')
        }
        transacoes.push(novaTransacao)
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes))
        
    }, 

    agruparTransacoes(): ResumoTransacoes {
        const resumo: ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        }

        const listaTransacoes: Transacao[] = structuredClone(transacoes)

        listaTransacoes.forEach((transacao) => {
            switch (transacao.tipoTransacao) {
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.valor
                    break;

                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.valor
                    break;

                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.valor
                    break;
            
                default:
                    break;
            }
        })
        return resumo;
    }
}

export default Conta;