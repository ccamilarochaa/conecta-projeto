document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector(".login-form");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const emailDigitado = document.getElementById("email").value;
            const senhaDigitada = document.getElementById("senha").value;

            // Busca a conta que foi salva no passo de cadastro
            const contaSalva = JSON.parse(localStorage.getItem("dadosConectaPlus"));

            // Validação 1: Verifica se existe uma conta cadastrada
            if (!contaSalva) {
                alert("Nenhuma conta encontrada. Por favor, faça seu cadastro primeiro.");
                return;
            }

            // Validação 2: Verifica se o e-mail e a senha batem com o que está salvo
            if (emailDigitado === contaSalva.email && senhaDigitada === contaSalva.senha) {
                // Deu tudo certo! Redireciona para a página inicial
                // (Ajuste o caminho de acordo com a sua estrutura de pastas)
                window.location.href = "../pagina-inicial/index.html"; 
            } else {
                // Errou a senha ou o e-mail
                alert("E-mail ou senha incorretos. Tente novamente.");
            }
        });
    }
});