import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import SaldoComponent from "./saldo-component.js";


const elementoForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert('Por favor, preencha todos os campos')
            return
        }
    
        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoForm.querySelector('#data') as HTMLInputElement;
    
        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value)
        
    
        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }
    
        Conta.registrarTransacao(novaTransacao)
        SaldoComponent.atualizar()
        elementoForm.reset();
    } catch (error) {
        alert(error.message)
    }
})