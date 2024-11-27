import { getSaldoProduto, getSaldoLote, getSaldoLotes } from './actions.js';

document.getElementById('saldoProdutoBtn').addEventListener('click', getSaldoProduto);
document.getElementById('saldoLoteBtn').addEventListener('click', getSaldoLote);
document.getElementById('saldoLotesBtn').addEventListener('click', getSaldoLotes);

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector(".modalResult");
    const overlay = document.querySelector(".modalOverlay");
    const closeModalButton = document.getElementById("closeModal");
  
    // Seleciona todos os botões que abrem o modal
    const buttons = document.querySelectorAll("#saldoProdutoBtn, #saldoLoteBtn, #saldoLotesBtn");
  
    // Adiciona evento de clique em cada botão
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.style.display = "block";
        overlay.style.display = "block";
      });
    });
  
    // Fechar o modal ao clicar no botão "Fechar"
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });
  
    // Fechar o modal ao clicar no fundo (overlay)
    overlay.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });
  });
  