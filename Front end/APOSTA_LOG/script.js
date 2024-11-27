document.addEventListener('DOMContentLoaded', function() {
    const carteiraButton = document.getElementById('carteiraButton');
    const modal = document.getElementById('carteiraModal');
    const closeModal = document.getElementById('closeModal');
    const saldoValue = document.getElementById('saldoValue');
    const depositarButton = document.getElementById('depositarButton');
    const retirarButton = document.getElementById('retirarButton');

    let saldo = 0;

    carteiraButton.addEventListener('click', function() {
        modal.style.display = 'block';
        saldoValue.textContent = saldo.toFixed(2);
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    depositarButton.addEventListener('click', function() {
        const valor = prompt('Digite o valor para depositar:');
        const valorNumerico = parseFloat(valor);
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            saldo += valorNumerico;
            saldoValue.textContent = saldo.toFixed(2);
        } else {            alert('Por favor, insira um valor válido para depósito.');
        }
    });

    retirarButton.addEventListener('click', function() {
        const valor = prompt('Digite o valor para retirar:');
        const valorNumerico = parseFloat(valor);
        
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            if (valorNumerico <= saldo && saldo - valorNumerico >= 1) {
                saldo -= valorNumerico;
                saldoValue.textContent = saldo.toFixed(2);
            } else {
                alert('Você não pode retirar esse valor. Verifique se o saldo é suficiente e se a retirada não deixará o saldo abaixo de R$ 1,00.');
            }
        } else {
            alert('Por favor, insira um valor válido para retirada.');
        }
    });
});
           