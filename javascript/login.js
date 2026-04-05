window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submit-btn');
 
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
 
        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
 
        // Validações no frontend
        if (!email) {
            return showMessage('Informe seu e-mail ou usuário.', 'erro');
        }
 
        if (!password) {
            return showMessage('Informe sua senha.', 'erro');
        }
 
        submitBtn.innerText = 'Entrando...';
        submitBtn.disabled = true;
 
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
 
            const result = await response.json();
 
            if (response.ok) {
                // Salva dados do usuário na sessão do navegador
                sessionStorage.setItem('user', JSON.stringify(result.user));
 
                showMessage(result.message, 'sucesso');
 
                // Redireciona para a home após 1.5 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage(result.message || 'Erro ao fazer login.', 'erro');
            }
        } catch (error) {
            showMessage('Erro ao conectar com o servidor.', 'erro');
        } finally {
            submitBtn.innerText = 'Entrar';
            submitBtn.disabled = false;
        }
    });
});