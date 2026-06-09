document.addEventListener("DOMContentLoaded", () => {
    // Seletores baseados estritamente na estrutura do seu arquivo editar.html
    const nomeInput = document.querySelector(".campo-grupo input[type='text']");
    const sobreMimTextarea = document.querySelector(".textarea-container textarea");
    const contadorTextarea = document.querySelector(".contador-caracteres");
    
    // Mapeamento preciso da sua grid de campos privados
    const emailInput = document.querySelector("input[type='email']");
    const todosInputsPrivados = document.querySelectorAll(".grid-campos-privados input");
    const telefoneInput = todosInputsPrivados[1]; // Segundo input do bloco privado
    const nascimentoInput = todosInputsPrivados[2]; // Terceiro input do bloco privado
    
    const tagsAtivasContainer = document.querySelector(".tags-selecionadas-edit");
    const tagsDisponiveisContainer = document.querySelector(".tags-disponiveis-edit");
    
    const avatarImg = document.querySelector(".avatar-placeholder .avatar-img");
    const cameraBadge = document.querySelector(".camera-badge");
    const btnSalvar = document.querySelector(".btn-salvar-alteracoes");

    // Cria um input de arquivo invisível para gerenciar o upload da foto
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // Dados padrão iniciais (iguais aos que estão escritos no seu HTML)
    let dadosPerfil = JSON.parse(localStorage.getItem("dadosConectaPlus")) || {
        nome: "João Pedro Silva",
        sobreMim: "Gosto de aprender novas habilidade e explorar novas áreas de conhecimento",
        interesses: ["Programação", "Idiomas", "Design"],
        foto: "../../assets/icons/meu_perfil.png",
        email: "joaosilva@gmail.com",
        telefone: "(00) 0000-0000",
        nascimento: "11/11/2010"
    };

    // Alimenta os inputs da tela ao carregar a página
    if (nomeInput) nomeInput.value = dadosPerfil.nome;
    if (emailInput) emailInput.value = dadosPerfil.email;
    if (telefoneInput) telefoneInput.value = dadosPerfil.telefone;
    if (nascimentoInput) nascimentoInput.value = dadosPerfil.nascimento;
    if (avatarImg && dadosPerfil.foto) avatarImg.src = dadosPerfil.foto;
    if (sobreMimTextarea) {
        sobreMimTextarea.value = dadosPerfil.sobreMim;
        contadorTextarea.textContent = `${dadosPerfil.sobreMim.length}/70`;
    }

    // Funcionalidade: Atualizar dinamicamente o contador do "Sobre mim"
    sobreMimTextarea.addEventListener("input", () => {
        contadorTextarea.textContent = `${sobreMimTextarea.value.length}/70`;
    });

    // Funcionalidade: Clique na câmera altera a imagem localmente
    cameraBadge.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
                dadosPerfil.foto = event.target.result; // Armazena em string temporária
            };
            reader.readAsDataURL(arquivo);
        }
    });

    // Funcionalidade: Desenhar e gerenciar remoção de interesses clicados
    function atualizarTagsEdit() {
        tagsAtivasContainer.innerHTML = "";
        dadosPerfil.interesses.forEach(interesse => {
            const tag = document.createElement("span");
            tag.className = "tag-ativa";
            tag.textContent = interesse;
            tag.style.cursor = "pointer";
            
            // Se o usuário clicar na tag azul ativa, ela é removida
            tag.addEventListener("click", () => {
                dadosPerfil.interesses = dadosPerfil.interesses.filter(i => i !== interesse);
                atualizarTagsEdit();
            });
            tagsAtivasContainer.appendChild(tag);
        });
    }
    atualizarTagsEdit();

    // Funcionalidade: Adicionar interesse ao clicar nas tags cinzas
    tagsDisponiveisContainer.querySelectorAll("span").forEach(span => {
        if (!span.classList.contains("opcao-mais")) {
            span.style.cursor = "pointer";
            span.addEventListener("click", () => {
                const textolocal = span.textContent;
                if (!dadosPerfil.interesses.includes(textolocal)) {
                    dadosPerfil.interesses.push(textolocal);
                    atualizarTagsEdit();
                }
            });
        }
    });

    // Funcionalidade: Disparada ao clicar em "Salvar alterações"
    btnSalvar.addEventListener("click", (e) => {
        e.preventDefault();

        // Recolhe tudo que foi digitado de novo nos campos
        dadosPerfil.nome = nomeInput.value;
        dadosPerfil.sobreMim = sobreMimTextarea.value;
        dadosPerfil.email = emailInput.value;
        dadosPerfil.telefone = telefoneInput.value;
        dadosPerfil.nascimento = nascimentoInput.value;

        // Commita as atualizações no localStorage
        localStorage.setItem("dadosConectaPlus", JSON.stringify(dadosPerfil));

        // Redireciona de volta para a Home atualizada
        window.location.href = "index.html";
    });
});