document.addEventListener("DOMContentLoaded", () => {
    const tags = document.querySelectorAll(".interest-tags .tag");
    const textareaSobre = document.querySelector("textarea");
    const contadorChar = document.querySelector(".char-count");
    const btnAvancar = document.querySelector(".btn-avancar");

    // Funcionalidade: Selecionar e desselecionar tags ao clicar
    tags.forEach(tag => {
        tag.style.cursor = "pointer";
        tag.addEventListener("click", () => {
            tag.classList.toggle("active");
        });
    });

    // Funcionalidade: Contador de caracteres do textarea
    if (textareaSobre) {
        textareaSobre.addEventListener("input", () => {
            contadorChar.textContent = `${textareaSobre.value.length}/150`;
        });
    }

    // Funcionalidade: Salvar dados e ir para a Home
    btnAvancar.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Pega os textos de todas as tags que têm a classe 'active'
        const tagsAtivas = Array.from(document.querySelectorAll(".interest-tags .tag.active"))
                                .map(tag => tag.textContent);
        
        const contaSalva = JSON.parse(localStorage.getItem("dadosConectaPlus")) || {};
        
        // Atualiza os dados
        contaSalva.interesses = tagsAtivas;
        contaSalva.sobreMim = textareaSobre ? textareaSobre.value : "";
        
        localStorage.setItem("dadosConectaPlus", JSON.stringify(contaSalva));

        // Redireciona para o link que está no href do HTML original (Home)
        window.location.href = btnAvancar.getAttribute("href"); 

        
        document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica para selecionar as Tags
    const tags = document.querySelectorAll(".interest-tags .tag");

    tags.forEach(tag => {
        // Deixa o cursor em formato de "mãozinha" para indicar que é clicável
        tag.style.cursor = "pointer"; 
        
        tag.addEventListener("click", () => {
            // O toggle adiciona a classe 'active' se não tiver, e remove se já tiver!
            tag.classList.toggle("active");
        });
    });

    // 2. Lógica para o contador de caracteres do Textarea (Sobre você)
    const textareaSobre = document.querySelector("textarea");
    const contadorChar = document.querySelector(".char-count");

    if (textareaSobre && contadorChar) {
        textareaSobre.addEventListener("input", () => {
            contadorChar.textContent = `${textareaSobre.value.length}/150`;
        });
    }
});
    });
});