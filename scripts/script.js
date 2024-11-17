import { getSaldoProduto, getSaldoLote, getSaldoLotes } from './actions.js';

document.getElementById('saldoProdutoBtn').addEventListener('click', getSaldoProduto);
document.getElementById('saldoLoteBtn').addEventListener('click', getSaldoLote);
document.getElementById('saldoLotesBtn').addEventListener('click', getSaldoLotes);