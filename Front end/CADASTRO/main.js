document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const dataNascimento = document.getElementById('data-nascimento').value;

        // Validação
        if (!nome || !email || !senha || !dataNascimento) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Se tudo estiver correto, você pode enviar o formulário ou fazer outra ação
        alert('Cadastro realizado com sucesso!');
        form.reset(); // Limpa o formulário
    });
});