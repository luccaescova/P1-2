document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Simulação de um banco de dados de usuários
    const usuarios = [
        { email: 'usuario1@example.com', senha: 'senha123' },
        { email: 'usuario2@example.com', senha: 'senha456' }
    ];

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;

        // Verifica se o usuário existe
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

        if (usuarioEncontrado) {
            alert('Login realizado com sucesso!');
            // Redirecionar ou realizar outra ação após o login bem-sucedido
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    });
});