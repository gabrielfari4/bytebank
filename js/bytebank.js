let saldo = 3000

const elementoSaldo = document.querySelector('.saldo-valor .valor')
elementoSaldo.textContent = saldo;

const elementoForm = document.querySelector('.block-nova-transacao form')
elementoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert('Por favor, preencha todos os campos')
        return
    }
})