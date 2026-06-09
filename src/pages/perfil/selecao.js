document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const btnAvancar = document.querySelector(".btn-next");
    
    // O HTML começa com Estudante ativo por padrão
    let perfilSelecionado = "estudante"; 

    // Funcionalidade: Clicar nos cards para selecionar
    cards.forEach(card => {
        card.style.cursor = "pointer"; // Deixa o mouse com "mãozinha"
        card.addEventListener("click", () => {
            // Remove a classe 'active' de todos os cards
            cards.forEach(c => c.classList.remove("active"));
            
            // Adiciona a classe 'active' só no que foi clicado
            card.classList.add("active");

            // Descobre qual foi clicado lendo o título (Estudante ou Educador)
            const titulo = card.querySelector("h2").textContent.toLowerCase();
            perfilSelecionado = titulo;
        });
    });

    // Funcionalidade: Clicar em Avançar
    btnAvancar.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o link de carregar direto

        // Puxa a conta que acabamos de criar no cadastro
        const contaSalva = JSON.parse(localStorage.getItem("dadosConectaPlus")) || {};
        
        // Salva a escolha do usuário
        contaSalva.tipoPerfil = perfilSelecionado;
        localStorage.setItem("dadosConectaPlus", JSON.stringify(contaSalva));

        // Direciona para a página certa baseada na escolha
        if (perfilSelecionado === "estudante") {
            window.location.href = "perfilestudante.html";
        } else {
            window.location.href = "perfileducador.html";
        }
    });
});