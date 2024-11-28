document.addEventListener('DOMContentLoaded', function() {
    const apostaForm = document.getElementById('apostaForm');

    apostaForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const userId = document.getElementById('userId').value.trim();
        const eventId = document.getElementById('eventId').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const prediction = document.getElementById('prediction').value;

        // Validação
        if (!userId || !eventId || !amount) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Dados da aposta a serem enviados
        const betData = {
            userId: userId,
            eventId: eventId,
            amount: parseFloat(amount),
            prediction: prediction === 'true' // Converte para booleano
        };

        // Enviar dados ao backend
        fetch('http://localhost:3000/betOnEvent', { // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(betData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message); // Mensagem de sucesso ou erro
            }
        })
        .catch(error => {
            console.error('Erro ao realizar aposta:', error);
            alert('Ocorreu um erro ao realizar a aposta. Tente novamente.');
        });
    });
});