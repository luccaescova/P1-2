document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroApostaForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const betAmount = parseFloat(document.getElementById('betAmount').value);
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        // Validação
        if (!title || !description || isNaN(betAmount) || !startDate || !endDate) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Dados do evento a serem enviados
        const eventData = {
            title: title,
            description: description,
            betAmount: betAmount,
            startDate: startDate,
            endDate: endDate
        };

        // Enviar dados ao backend
        fetch('http://localhost:3000/events/addNewEvent', { // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Exibir mensagem de sucesso ou erro
            if (data.success) {
                // Redirecionar ou limpar o formulário
                form.reset();
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar evento:', error);
            alert('Ocorreu um erro ao cadastrar o evento. Tente novamente.');
        });
    });
});