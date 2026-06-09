document.addEventListener("DOMContentLoaded", () => {
    const formRecuperar = document.querySelector(".recovery-form");

    if (formRecuperar) {
        formRecuperar.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Captura o que o usuário digitou no campo
            const emailDigitado = document.getElementById("email").value;

            // Busca os dados da conta salva no navegador
            const contaSalva = JSON.parse(localStorage.getItem("dadosConectaPlus"));

            // Validação 1: Verifica se existe alguma conta cadastrada no navegador
            if (!contaSalva) {
                alert("Nenhuma conta encontrada no sistema. Por favor, faça seu cadastro primeiro.");
                return;
            }

            // Validação 2: Verifica se o e-mail ou telefone digitado é igual ao que está salvo
            // (Lembrando que no cadastro salvamos essa info na variável 'email')
            if (emailDigitado === contaSalva.email || emailDigitado === contaSalva.telefone) {
                
                // Simulação de envio de e-mail (com uma colher de chá para ajudar nos testes)
                alert(`Sucesso! Um link de recuperação foi enviado para: ${emailDigitado}\n\n🤖 Dica do sistema (só no protótipo): Sua senha atual é "${contaSalva.senha}"`);
                
                // Joga o usuário de volta para a tela de Login
                // (O caminho '../Login/index.html' já está de acordo com o seu botão 'Voltar')
                window.location.href = "../login/index.html"; 

            } else {
                // Se o usuário digitar algo diferente do que está salvo
                alert("E-mail ou telefone não encontrado. Verifique se digitou corretamente.");
            }
        });
    }
});