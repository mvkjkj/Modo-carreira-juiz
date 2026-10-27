// Variáveis do Estado do Jogo
let gameState = {
    tempo: 45,
    acrescimo: 1,
    golsCasa: 2,
    golsFora: 2,
    energia: 47,
    moral: 100,
    carteira: 92697,
    gols: 8,
    assistencias: 2,
    fasesPartida: "2o_tempo"
};

// Rodando o relógio do jogo
setInterval(() => {
    if (gameState.fasesPartida === "2o_tempo") {
        gameState.acrescimo++;
        document.getElementById("match-time").textContent = `${gameState.tempo}+${gameState.acrescimo}'`;

        // Simula alteração nas estatísticas ao vivo
        if (gameState.acrescimo === 3) {
            document.getElementById("posse-away").textContent = "58%";
            document.getElementById("posse-home").textContent = "42%";
        }
        
        // Final de jogo aos 90+5'
        if (gameState.acrescimo >= 5) {
            gameState.fasesPartida = "fim";
            document.getElementById("var-title").innerHTML = `<i class="fa-solid fa-flag-checkered"></i> Fim de Jogo!`;
            document.getElementById("var-desc").textContent = "Partida encerrada: Aparecidense 2 x 2 Anápolis. Você jogou bem e garantiu bônus de salário!";
            document.getElementById("var-actions").innerHTML = `<button class="game-btn" onclick="reiniciarPartida()">Jogar Próxima Partida</button>`;
            
            // Recompensa financeira por jogar
            gameState.carteira += 5000;
            document.getElementById("stat-money").textContent = `R$ ${gameState.carteira.toLocaleString()}`;
        }
    }
}, 3000); // Cada 3 segundos avança 1 minuto de acréscimo

// Lógica de Decisão do VAR
function resolverVar(escolha) {
    const titulo = document.getElementById("var-title");
    const desc = document.getElementById("var-desc");
    const actions = document.getElementById("var-actions");

    if (escolha === 'protestar') {
        titulo.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Cartão Amarelo por reclamação!`;
        desc.textContent = "O juiz não gostou da sua pressão e te deu amarelo. Sua moral caiu.";
        gameState.moral -= 5;
    } else {
        titulo.innerHTML = `<i class="fa-solid fa-circle-check"></i> Decisão Mantida!`;
        desc.textContent = "O VAR confirmou o lance legal. O jogo vai prosseguir.";
        gameState.moral += 2;
    }

    document.getElementById("stat-moral").textContent = gameState.moral;
    actions.innerHTML = `<span style="color: #3fb950; font-size: 0.8rem; font-weight: bold;">✔ Analisado pelo VAR</span>`;
}

// Menus Superiores (Vida, Shopping, Banco, etc.)
function abrirMenu(tipo) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");
    const text = document.getElementById("modal-text");

    modal.style.display = "flex";
    title.textContent = `Painel: ${tipo}`;

    switch(tipo) {
        case 'Vida':
            text.textContent = "Aqui você gerencia seus relacionamentos, treinos extras e descanso pessoal.";
            break;
        case 'Shopping':
            text.textContent = "Compre roupas de grife, relógios e itens de luxo para aumentar seu status.";
            break;
        case 'Imóveis':
            text.textContent = "Invista em apartamentos, mansões ou terrenos para acumular patrimônio.";
            break;
        case 'Garagem':
            text.textContent = "Sua coleção de carros esportivos e motos de alta cilindrada.";
            break;
        case 'Banco':
            text.textContent = `Saldo atual disponível na conta: R$ ${gameState.carteira.toLocaleString()}. Rendimentos ativos.`;
            break;
        case 'Painel':
            text.textContent = "Estatísticas gerais da sua carreira profissional no futebol brasileiro.";
            break;
    }
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function reiniciarPartida() {
    location.reload();
}