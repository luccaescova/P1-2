document.addEventListener('DOMContentLoaded', function() {
    const carteiraButton = document.getElementById('carteiraButton');
    const modal = document.getElementById('carteiraModal');
    const closeModal = document.getElementById('closeModal');
    const saldoValue = document.getElementById('saldoValue');
    const depositarButton = document.getElementById('depositarButton');
    const retirarButton = document.getElementById('retirarButton');

    const userId = 1;
    async function consultarSaldo() {
        try {
            const response = await fetch(`http://localhost:3000/wallet/saldo/${userId}`);
            const data = await response.json();

            if (response.ok) {
                saldoValue.textContent = data.saldo.toFixed(2); // Atualiza o saldo exibido no modal
            } else {
                alert(data.message || "Erro ao consultar saldo.");
            }
        } catch (error) {
            console.error("Erro ao consultar saldo:", error);
        }
    }

    carteiraButton.addEventListener('click', function() {
        modal.style.display = 'block';
        consultarSaldo(); // Atualiza o saldo ao abrir o modal
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    depositarButton.addEventListener('click', async function() {
        const valor = prompt('Digite o valor para depositar:');
        const valorNumerico = parseFloat(valor);

        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            try {
                const response = await fetch("http://localhost:3000/wallet/depositar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId, valor: valorNumerico })
                });

                const data = await response.json();

                if (response.ok) {
                    saldoValue.textContent = data.saldo.toFixed(2);
                    alert("Depósito realizado com sucesso!");
                } else {
                    alert(data.message || "Erro ao realizar depósito.");
                }
            } catch (error) {
                console.error("Erro ao realizar depósito:", error);
                alert("Erro ao realizar depósito. Tente novamente.");
            }
        } else {
            alert('Por favor, insira um valor válido para depósito.');
        }
    });

    retirarButton.addEventListener('click', async function() {
        const valor = prompt('Digite o valor para retirar:');
        const valorNumerico = parseFloat(valor);

        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            try {
                const response = await fetch("http://localhost:3000/wallet/retirar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId, valor: valorNumerico })
                });

                const data = await response.json();

                if (response.ok) {
                    saldoValue.textContent = data.saldo.toFixed(2); 
                    alert("Retirada realizada com sucesso!");
                } else {
                    alert(data.message || "Erro ao realizar retirada.");
                }
            } catch (error) {
                console.error("Erro ao realizar retirada:", error);
                alert("Erro ao realizar retirada. Tente novamente.");
            }
        } else {
            alert('Por favor, insira um valor válido para retirada.');
        }
    });
});
