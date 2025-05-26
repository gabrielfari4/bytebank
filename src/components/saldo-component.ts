import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

let saldo: number = 3000

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;


const dataAcesso: Date = new Date();
elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)


export const getSaldo = (): number => {
    return saldo
}

atualizarSaldo(saldo);
export function atualizarSaldo(novoSaldo: number): void {
    saldo = novoSaldo;
    elementoSaldo.textContent = formatarMoeda(saldo)
}