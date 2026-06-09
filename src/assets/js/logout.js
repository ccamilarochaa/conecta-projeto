// Aguarda o HTML da página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INJETA O CSS DO MODAL AUTOMATICAMENTE NO <HEAD>
    const modalCSS = `
        .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .modal-overlay.active {
            opacity: 1; pointer-events: auto;
        }
        .modal-card {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 35px 40px;
            width: 100%; max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        .modal-icon img {
            width: 55px; height: auto;
            margin-bottom: 20px;
        }
        .modal-title {
            font-size: 22px; font-weight: 600;
            color: #111111; margin: 0 0 12px 0;
        }
        .modal-text {
            font-size: 14px; color: #666666;
            line-height: 1.5; margin: 0 0 30px 0;
        }
        .modal-actions {
            display: flex; gap: 15px; justify-content: center;
        }
        .btn-cancel {
            flex: 1; padding: 10px;
            background: transparent; border: 1px solid #a5c3e6;
            color: #4682b4; border-radius: 6px;
            font-size: 14px; font-weight: 500;
            cursor: pointer; transition: background 0.2s;
        }
        .btn-cancel:hover { background-color: #f4f8fc; }
        .btn-logout {
            flex: 1; padding: 10px; text-align: center;
            background-color: #c45e5e; border: none;
            color: #ffffff; border-radius: 6px;
            font-size: 14px; font-weight: 500;
            text-decoration: none; display: inline-block;
            cursor: pointer; transition: background 0.2s;
        }
        .btn-logout:hover { background-color: #b05050; }
    `;

    const styleStyle = document.createElement("style");
    styleStyle.innerHTML = modalCSS;
    document.head.appendChild(styleStyle);

    // 2. INJETA O HTML DO MODAL NO FINAL DO <BODY>
    const modalHTML = `
        <div class="modal-overlay" id="logoutModal">
            <div class="modal-card">
                <div class="modal-icon">
                    <img src="../../assets/icons/sair_modal.png" alt="Sair da conta">
                </div>
                <h2 class="modal-title">Sair da conta?</h2>
                <p class="modal-text">
                    Tem certeza que deseja sair?<br>
                    Você precisará fazer login novamente para acessar sua conta.
                </p>
                <div class="modal-actions">
                    <button class="btn-cancel" id="btnModalCancelar">Cancelar</button>
                    <a href="../Home/index.html" class="btn-logout">Sair</a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 3. CONTROLE DE EVENTOS (ABRIR E FECHAR)
    const modal = document.getElementById('logoutModal');
    const btnCancelar = document.getElementById('btnModalCancelar');

    // Monitora cliques no botão de sair do menu lateral
    const botoesSairSidebar = document.querySelectorAll('.nav-item[href*="sair"], .nav-item[href*="Home"]');

    botoesSairSidebar.forEach(botao => {
        if (botao.closest('.bottom-menu') || botao.textContent.toLowerCase().includes('sair')) {
            botao.addEventListener('click', (e) => {
                e.preventDefault(); 
                modal.classList.add('active'); 
            });
        }
    });

    // Fecha ao clicar em cancelar
    btnCancelar.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fecha se clicar no fundo escuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});