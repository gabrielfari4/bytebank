
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

    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value)

    if (tipoTransacao === TipoTransacao.DEPOSITO) {
        saldo += valor;
    } else if (tipoTransacao === TipoTransacao.TRANSFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    } else {
        alert('Tipo de transação inválido!')
    }

    elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency"})

    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    console.log(novaTransacao);
    
    elementoForm.reset();
})