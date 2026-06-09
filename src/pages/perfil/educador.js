document.addEventListener("DOMContentLoaded", () => {
    // Captura os campos usando a estrutura do seu HTML
    const inputs = document.querySelectorAll(".input-field");
    const areaAtuacaoInput = inputs[0];
    const formacaoInput = inputs[1];
    
    const textareas = document.querySelectorAll("textarea");
    const experienciaTextarea = textareas[0];
    const biografiaTextarea = textareas[1];
    
    const btnAvancar = document.querySelector(".btn-avancar");

    // Funcionalidade: Atualizar o contador dos dois textareas independentemente
    textareas.forEach(textarea => {
        const contador = textarea.nextElementSibling; // Acha o <span> logo abaixo
        textarea.addEventListener("input", () => {
            contador.textContent = `${textarea.value.length}/70`;
        });
    });

    // Funcionalidade: Salvar dados e ir para a Home
    btnAvancar.addEventListener("click", (e) => {
        e.preventDefault();

        const contaSalva = JSON.parse(localStorage.getItem("dadosConectaPlus")) || {};
        
        // Salva os dados específicos do educador
        contaSalva.areaAtuacao = areaAtuacaoInput ? areaAtuacaoInput.value : "";
        contaSalva.formacao = formacaoInput ? formacaoInput.value : "";
        contaSalva.experiencia = experienciaTextarea ? experienciaTextarea.value : "";
        
        // Vamos usar a 'biografia' como o 'sobreMim' para o perfil geral não quebrar depois
        const bio = biografiaTextarea ? biografiaTextarea.value : "";
        contaSalva.biografia = bio;
        contaSalva.sobreMim = bio;

        localStorage.setItem("dadosConectaPlus", JSON.stringify(contaSalva));

        // Redireciona para o link que está no href do HTML original (Home)
        window.location.href = btnAvancar.getAttribute("href"); 
    });
});