document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INJETA O CSS DA CAIXA DE NOTIFICAÇÕES
    const notifCSS = `
        /* Container flutuante das notificações */
        .notif-dropdown {
            position: fixed;
            top: 70px; /* Distância do topo - Ajuste se necessário para colar na sua barra azul */
            right: 80px; /* Distância da direita - Ajuste para alinhar com seu ícone de sino */
            width: 380px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            border: 1px solid #ebebeb;
            display: none; /* Escondido por padrão */
            flex-direction: column;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
        }

        /* Classe que o JS vai ativar para mostrar a caixa */
        .notif-dropdown.active {
            display: flex;
        }

        /* Cabeçalho (Título e Marcar como lida) */
        .notif-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #ebebeb;
        }
        .notif-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        .notif-header .mark-read {
            font-size: 12px;
            color: #333;
            font-weight: 500;
            cursor: pointer;
            text-decoration: none;
        }
        .notif-header .mark-read:hover {
            text-decoration: underline;
        }

        /* Lista de itens */
        .notif-list {
            max-height: 400px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }

        /* Cada notificação */
        .notif-item {
            display: flex;
            padding: 15px 20px;
            border-bottom: 1px solid #ebebeb;
            position: relative;
            cursor: pointer;
            transition: background 0.2s;
        }
        .notif-item:hover {
            background: #f9f9f9;
        }
        .notif-item:last-child {
            border-bottom: none;
        }

        /* Ícones (Coração/Balão) */
        .notif-icon {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        /* Textos da notificação */
        .notif-content {
            flex-grow: 1;
            font-size: 14px;
            color: #333;
            line-height: 1.4;
        }
        .notif-content strong {
            font-weight: 600;
        }
        .notif-time {
            color: #999;
            font-size: 12px;
            margin-left: 5px;
            font-weight: normal;
        }
        .notif-link {
            display: block;
            color: #2C73D2; /* Azul do Conecta+ */
            text-decoration: none;
            margin-top: 4px;
            font-weight: 500;
        }
        .notif-link:hover {
            text-decoration: underline;
        }

        /* Bolinha vermelha de não lida */
        .notif-unread-dot {
            width: 6px;
            height: 6px;
            background-color: #c45e5e;
            border-radius: 50%;
            position: absolute;
            right: 20px;
            top: 22px;
        }
    `;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = notifCSS;
    document.head.appendChild(styleTag);

    // 2. INJETA O HTML DA CAIXA NO CORPO DA PÁGINA
    // Substitua os caminhos dos ícones pelos corretos da sua pasta assets
    const notifHTML = `
        <div class="notif-dropdown" id="caixaNotificacoes">
            <div class="notif-header">
                <h3>Notificações</h3>
                <span class="mark-read">Marcar todas como lida</span>
            </div>
            <div class="notif-list">
                <div class="notif-item">
                    <img src="../../assets/icons/like-red.png" class="notif-icon" alt="Curtida">
                    <div class="notif-content">
                        <strong>Maria curtiu seu comentário em</strong> <span class="notif-time">Há 5 min</span>
                        <a href="#" class="notif-link">"O que são domínios morfoclimáticos?"</a>
                    </div>
                    <div class="notif-unread-dot"></div>
                </div>
                <div class="notif-item">
                    <img src="../../assets/icons/chat.png" class="notif-icon" alt="Comentário">
                    <div class="notif-content">
                        <strong>João respondeu seu post</strong> <span class="notif-time">Há 4 min</span>
                        <a href="#" class="notif-link">"O que é API?"</a>
                    </div>
                    <div class="notif-unread-dot"></div>
                </div>
                <div class="notif-item">
                    <img src="../../assets/icons/like-red.png" class="notif-icon" alt="Curtida">
                    <div class="notif-content">
                        <strong>Pedro curtiu seu post</strong> <span class="notif-time">Há 2 min</span>
                        <a href="#" class="notif-link">"O que é API?"</a>
                    </div>
                    <div class="notif-unread-dot"></div>
                </div>
                <div class="notif-item">
                    <img src="../../assets/icons/like-red.png" class="notif-icon" alt="Curtida">
                    <div class="notif-content">
                        <strong>Ana curtiu seu comentário em</strong> <span class="notif-time">Há 2h</span>
                        <a href="#" class="notif-link">"Como aprender inglês no dia a dia?"</a>
                    </div>
                </div>
                <div class="notif-item">
                    <img src="../../assets/icons/like-red.png" class="notif-icon" alt="Curtida">
                    <div class="notif-content">
                        <strong>Leo curtiu seu comentário em</strong> <span class="notif-time">Há 4h</span>
                        <a href="#" class="notif-link">"Como aprender inglês no dia a dia?"</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', notifHTML);

    // 3. LÓGICA DE ABRIR/FECHAR
    const dropdown = document.getElementById('caixaNotificacoes');
    
    // Procura o ícone de sino na sua barra superior
    // Assumindo que o ícone do sino seja uma imagem e tenha "bell" ou "sino" no nome, 
    // ou você pode dar a classe "btn-sino" para ele no seu HTML.
    const iconeSino = document.querySelector('.topbar img[src*="bell"], .btn-sino'); 

    if (iconeSino) {
        iconeSino.style.cursor = 'pointer'; // Garante que vira uma mãozinha ao passar o mouse
        
        iconeSino.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche a caixa instantaneamente
            dropdown.classList.toggle('active');
        });
    }

    // Fecha a caixa se o usuário clicar em qualquer outro lugar da tela
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== iconeSino) {
            dropdown.classList.remove('active');
        }
    });
});