window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const submitBtn = form.querySelector('.signup-btn');

    // Cria a caixa de mensagem dinamicamente
    const messageBox = document.createElement('div');
    messageBox.style.cssText = 'display:none; margin-bottom:12px; padding:10px 14px; border-radius:8px; font-size:14px; text-align:center;';
    form.insertAdjacentElement('beforebegin', messageBox);

    function showMessage(text, tipo) {
        messageBox.innerText = text;
        if (tipo === 'erro') {
            messageBox.style.background = '#fee2e2';
            messageBox.style.color = '#b91c1c';
            messageBox.style.border = '1px solid #fca5a5';
        } else {
            messageBox.style.background = '#dcfce7';
            messageBox.style.color = '#15803d';
            messageBox.style.border = '1px solid #86efac';
        }
        messageBox.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageBox.style.display = 'none';
 
        const firstName    = document.getElementById('firstName').value.trim();
        const lastName     = document.getElementById('lastName').value.trim();
        const email        = document.getElementById('email').value.trim();
        const cpf          = document.getElementById('CPF').value.trim();
        const username     = document.getElementById('username').value.trim();
        const password     = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
 
        // Validações no frontend
        if (!firstName || !lastName || !email || !cpf || !username || !password || !confirmPassword) {
            return showMessage('Preencha todos os campos.', 'erro');
        }
 
        if (password !== confirmPassword) {
            return showMessage('As senhas não coincidem.', 'erro');
        }
 
        if (password.length < 6) {
            return showMessage('A senha deve ter pelo menos 6 caracteres.', 'erro');
        }
 
        submitBtn.innerText = 'Criando conta...';
        submitBtn.disabled = true;
 
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, cpf, username, password, confirmPassword })
            });
 
            const result = await response.json();
 
            if (response.ok) {
                showMessage(result.message, 'sucesso');
                form.reset();
                // Redireciona para login após 2 segundos
                setTimeout(() => {
                    window.location.href = 'LoginCliente.html';
                }, 2000);
            } else {
                showMessage(result.message || 'Erro ao criar conta.', 'erro');
            }
        } catch (error) {
            showMessage('Erro ao conectar com o servidor.', 'erro');
        } finally {
            submitBtn.innerText = 'Criar Conta';
            submitBtn.disabled = false;
        }
    });
})