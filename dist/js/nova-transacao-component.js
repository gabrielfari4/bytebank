const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', (event) => {
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
    if (tipoTransacao === TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao === TipoTransacao.TRANSFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Tipo de transação inválido!');
    }
    elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});
