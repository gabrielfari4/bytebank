import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
        const inputValor = elementoForm.querySelector('#valor');
        const inputData = elementoForm.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value);
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        elementoForm.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
