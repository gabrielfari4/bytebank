import Conta from "../types/Conta";
import { FormatoData } from "../types/FormatoData";
import { formatarData } from "../utils/formatters";


const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;

function renderizarData (): void {
    if (elementoDataAcesso !== null) {
        elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO)
    }
}

const DataComponent = {
    atualizar() {
        renderizarData();
    }
}

export default DataComponent;