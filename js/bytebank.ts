let saldo = 3000

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
elementoSaldo.textContent = saldo.toString();

const elementoForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert('Por favor, preencha todos os campos')
        return
    }

    const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
    const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
    const inputData = elementoForm.querySelector('#data') as HTMLInputElement;

    let tipoTransacao: string = inputTipoTransacao.value
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value)

    if (tipoTransacao === "Depósito") {
        saldo += valor;
    } else if (tipoTransacao === "Transferência" || tipoTransacao === "Pagamento de Boleto") {
        saldo -= valor;
    } else {
        alert('Tipo de transação inválido!')
    }

    elementoSaldo.textContent = saldo.toString();

    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    console.log(novaTransacao);
    
    elementoForm.reset();
})