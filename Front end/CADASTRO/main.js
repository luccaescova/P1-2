document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        // Validação
        if (!nome || !email || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validação de senhas
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Dados do usuário a serem enviados
        const userData = {
            name: nome,
            email: email,
            password: senha
        };

        // Enviar dados ao backend
        fetch('http://localhost:3000/auth/signUp', { // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
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
            console.error('Erro ao cadastrar:', error);
            alert('Ocorreu um erro ao cadastrar. Tente novamente.');
        });
    });
});