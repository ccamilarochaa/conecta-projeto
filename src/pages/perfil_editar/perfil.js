document.addEventListener("DOMContentLoaded", () => {
    // Captura os elementos exatos do seu HTML de visualização
    const nomeExibicao = document.querySelector(".info h2"); 
    const sobreMimExibicao = document.querySelector(".info .texto-cinza");
    const containerTagsPerfil = document.querySelector(".tags-interesse"); 
    const avatarPrincipal = document.querySelector(".avatar-placeholder .avatar-img");

    // Recarrega os dados salvos pelo editor no banco local do navegador
    const dadosSalvos = JSON.parse(localStorage.getItem("dadosConectaPlus"));

    if (dadosSalvos) {
        // Altera o Nome e o Sobre Mim com o que foi salvo
        if (nomeExibicao) nomeExibicao.textContent = dadosSalvos.nome;
        if (sobreMimExibicao) sobreMimExibicao.textContent = dadosSalvos.sobreMim;
        
        // Atualiza a foto de perfil caso o usuário tenha alterado
        if (avatarPrincipal && dadosSalvos.foto) avatarPrincipal.src = dadosSalvos.foto;

        // Limpa as tags antigas e desenha as novas atualizadas de forma idêntica
        if (containerTagsPerfil && dadosSalvos.interesses) {
            containerTagsPerfil.innerHTML = ""; 
            dadosSalvos.interesses.forEach(interesse => {
                const tag = document.createElement("span");
                tag.textContent = interesse;
                containerTagsPerfil.appendChild(tag);
            });
        }
    }
});