import { host } from './constants.js';
import { formatDate, handleResponse } from './utils.js';

export function consultarSaldo(endpoint, params) {
  const url = `${host}${endpoint}`;
  const { EFToken, IfNoneMatch } = params;

  fetch(url, {
    method: 'GET',
    headers: {
      'EF-Token': EFToken,
      'If-None-Match': IfNoneMatch,
    },
  })
    .then(handleResponse)
    .then(({ status, body }) => {
      const resultElement = document.getElementById('result');
      
      let data = body[0];
      console.log(body[0]);
      console.log('fab: ', data.fabricacao);

      if (data.fabricacao === undefined) {
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <h5><strong>Status Code:</strong> ${status}</h5>
          <div class='dadosItem'>
            <div class='NomeSaldo'>
              <h6>Código: ${data.produto}</h6>
              <h6>Saldo: ${data.saldo}</h6>
            </div>
            <div class='reservaFechamento'>
              <h6>Reserva: ${data.reserva}</h6>
              <h6>Saldo Fechamento: ${data.saldoFechamento}</h6>
            </div>          
          </div>
          
        `;
      } else {
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <h5><strong>Status Code:</strong> ${status}</h5>
          <div class='dadosItem'>
            <div class='NomeSaldo'>
              <h6>Código: ${data.produto}</h6>
              <h6>Saldo: ${data.saldo}</h6>
              <h6>Lote: ${data.lote}</h6>
              <h6>Fabricação: ${formatDate(data.fabricacao)}</h6>
            </div>
            <div class='reservaFechamento'>
              <h6>Reserva: ${data.reserva}</h6>
              <h6>Saldo Fechamento: ${data.saldoFechamento}</h6>
              <h6>Validade: ${formatDate(data.validade)}</h6>
              
            </div>          
          </div>
        `;
      }
    })
    .catch(error => {
      document.getElementById('result').innerHTML = `
      <div class="alert alert-danger" role="alert">
          <h3>Erro ao Consultar API</h3>
          <p>${error.message}</p>
      </div>
      `;
    });
}