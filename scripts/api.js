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
      console.log('fab: ', data.dt_fabric);

        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <h5><strong>Status Code:</strong> ${status}</h5>
          <div class='dadosItem'>
            <div class='NomeSaldo'>
              <h6>Código: ${data.cd_produto}</h6>
              <h6>Data Fabricação: ${data.dt_fabric ? formatDate(data.dt_fabric): 'S/ Info.'}</h6>
              <h6>Data Validade: ${data.dt_validad ? formatDate(data.dt_validad): 'S/ Info.'}</h6>
              <h6>Dt Ult. Fechamento: ${data.dt_ultfech ? formatDate(data.dt_ultfech): 'S/ Info.'}</h6>
            </div>
            <div class='reservaFechamento'>
              <h6>Nr. Lote: ${data.nr_lote}</h6>
              <h6>Saldo: ${data.sdomov}</h6>
              <h6>Reserva: ${data.sdores}</h6>
              <h6>Sado Ant.: ${data.qt_estqant}</h6>
            </div>          
          </div>
          
        `;

    })
    .catch(error => {
      document.getElementById('result').innerHTML = `
      <div class="alert alert-danger" role="alert">
          <h3>Erro ao Consultar APIww</h3>
          <p>${error.message}</p>
      </div>
      `;
    });
}

export function consultarSaldoLote(endpoint, params) {
  const url = `${host}${endpoint}`;
  const { EFToken, IfNoneMatch } = params;
console.log(params)
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
      
      let data = body;
      console.log(body);

      if (!Array.isArray(data)) {
        console.error("O body não é um array:", data);
        alert("Os dados retornados não são válidos.");
        return;
      }

        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <h5><strong>Status Code:</strong> ${status}</h5>
          <div class='dadosItem'>
        ${data
          .map(item => `
            <div class='NomeSaldo'>
              <h6>Código: ${item.cd_produto}</h6>
              <h6>Saldo: ${item.saldo}</h6>
              <h6>Reserva: ${item.reserva}</h6>
              <h6>Saldo Fechamento: ${item.saldo_fechamento}</h6>
            </div>
          `)
          .join('')}
  </div>
`;
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