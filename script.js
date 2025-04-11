let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
  // Verifica se o item já está no carrinho
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    // Incrementa a quantidade do item existente
    itemExistente.quantidade += 1;
    itemExistente.precoTotal += preco;
  } else {
    // Adiciona um novo item ao carrinho
    carrinho.push({ nome, preco, quantidade: 1, precoTotal: preco });
  }

  // Atualiza o total
  total += preco;
  atualizarCarrinho();
}

function removerDoCarrinho(nome) {
  // Encontra o índice do item no carrinho
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    const item = carrinho[index];
    total -= item.preco; // Subtrai o preço de uma unidade do item do total

    if (item.quantidade > 1) {
      // Decrementa a quantidade se houver mais de uma unidade
      item.quantidade -= 1;
      item.precoTotal -= item.preco;
    } else {
      // Remove o item do carrinho se a quantidade for 1
      carrinho.splice(index, 1);
    }

    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${item.precoTotal.toFixed(2)}`;

    // Botão para remover o item com ícone SVG
    const botaoRemover = document.createElement("button");
    botaoRemover.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14H7L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
      </svg>
    `;
    botaoRemover.style.marginLeft = "10px";
    botaoRemover.onclick = () => removerDoCarrinho(item.nome);

    li.appendChild(botaoRemover);
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  const total = document.getElementById("total").innerText;
  alert(`Compra finalizada! ${total}`);
  // Aqui você pode adicionar lógica para limpar o carrinho ou redirecionar para outra página
  limparCarrinho();
}

function limparCarrinho() {
  const itensCarrinho = document.getElementById("itens-carrinho");
  itensCarrinho.innerHTML = "";
  document.getElementById("total").innerText = "Total: R$ 0,00";
}

.produto {
  background: rgb(255, 255, 255);
  color: #000;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, border-color 0.3s ease;
  border: 2px solid rgba(0, 0, 0, 0); /* Borda invisível */
}

.produto:hover {
  transform: scale(1.05);
  border-color: rgba(0, 0, 0, 0.3); /* Aumenta a opacidade ao passar o mouse */
}

