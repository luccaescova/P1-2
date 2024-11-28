document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;

        // Validação
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Dados do usuário a serem enviados
        const loginData = {
            email: email,
            password: senha
        };

        // Enviar dados ao backend
        fetch('http://localhost:3000/auth/signIn', { // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Login bem-sucedido!'); // Mensagem de sucesso
                localStorage.setItem('token', data.token); // Armazenar o token no localStorage
                window.location.href = 'dashboard.html'; // Redirecionar para a página do dashboard
            } else {
                alert(data.message); // Mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login. Tente novamente.');
        });
    });
});