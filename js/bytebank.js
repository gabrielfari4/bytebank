var saldo = 3000;
var elementoSaldo = document.querySelector('.saldo-valor .valor');
elementoSaldo.textContent = saldo.toString();
var elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    var inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
    var inputValor = elementoForm.querySelector('#valor');
    var inputData = elementoForm.querySelector('#data');
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
    if (tipoTransacao === "Depósito") {
        saldo += valor;
    }
    else if (tipoTransacao === "Transferência" || tipoTransacao === "Pagamento de Boleto") {
        saldo -= valor;
    }
    else {
        alert('Tipo de transação inválido!');
    }
    elementoSaldo.textContent = saldo.toString();
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});
