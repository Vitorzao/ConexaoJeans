window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submit-btn');
    const messageBox = document.getElementById('message-box');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Pega apenas email e senha
        const userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
// validar se email e senha esta vazio e cadastrar mensagem de erro ao logar.

        submitBtn.innerText = 'Processando...';
        submitBtn.disabled = true;

        try {
            // Faz a requisição apenas para a rota de login
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message, 'bg-green-100 text-green-700');
                // Aqui você pode redirecionar o usuário:
                // window.location.href = '/dashboard.html';
            } else {
                showMessage(result.message || 'Erro ao fazer login.', 'bg-red-100 text-red-700');
            }
        } catch (error) {
            showMessage('Erro ao conectar com o servidor.', 'bg-red-100 text-red-700');
        } finally {
            submitBtn.innerText = 'Entrar';
            submitBtn.disabled = false;
        }
    });

    function showMessage(text, classes) {
        messageBox.innerText = text;
        // Usa as classes passadas (Tailwind) e remove o hidden
        messageBox.className = `mb-4 p-3 rounded-lg text-sm text-center ${classes}`;
        messageBox.classList.remove('hidden');
    }
});

