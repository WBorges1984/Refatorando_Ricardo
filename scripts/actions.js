import { getFormData, validarCampos } from './utils.js';
import { consultarSaldo } from './api.js';

export function getSaldoProduto() {
  const formulario = getFormData();
  if (!validarCampos(formulario)) return;

  const { produto, empresa, cor, tamanho, ...prev } = formulario;
  const endpoint = `/saldo?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
  consultarSaldo(endpoint, prev);
}

export function getSaldoLote() {
  const formulario = getFormData();
  if (!validarCampos(formulario)) return;

  const { produto, empresa, cor, tamanho, lote, ...rest } = formulario;
  const endpoint = `/saldo/lote?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}&LOTE=${lote}`;
  consultarSaldo(endpoint, rest);
}

export function getSaldoLotes() {
  const formulario = getFormData();
  if (!validarCampos(formulario)) return;

  const { produto, empresa, cor, tamanho, ...rest } = formulario;
  const endpoint = `/saldo/lotes?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
  consultarSaldo(endpoint, rest);
}
