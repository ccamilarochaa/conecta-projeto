document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.querySelector(".register-form");

    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            // Captura os valores digitados
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const nascimento = document.getElementById("nascimento").value;
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmar-senha").value;

            // Validação 1: Verifica se as senhas são iguais
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem. Por favor, digite novamente.");
                return; // Para a execução aqui se der erro
            }

            // Cria o objeto do usuário mesclando com a estrutura que o Perfil precisa
            const novaConta = {
                nome: nome,
                email: email,
                nascimento: nascimento,
                senha: senha,
                // Deixamos dados em branco/padrão para não quebrar a tela de perfil depois
                telefone: "",
                sobreMim: "Olá! Acabei de criar minha conta no Conecta+.",
                interesses: [],
                foto: "../../assets/icons/meu_perfil.png" 
            };

            // Salva a conta no banco de dados do navegador
            localStorage.setItem("dadosConectaPlus", JSON.stringify(novaConta));

            alert("Conta criada com sucesso!");
            
            // Redireciona o usuário para a tela de Login (Ajuste o caminho se necessário)
           window.location.href = "../perfil/index.html";
        });
    }
});