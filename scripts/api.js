import { host } from './constants.js';
import { formatDate, handleResponse } from './utils.js';

export function consultarSaldo(endpoint, params) {
  const url = `${host}${endpoint}`;
  const { EFToken, IfNoneMatch } = params;

  fetch(url, {
    method: 'GET',
    headers: {
      'EF-Token': 'E43F47921EF22B74D80FE59E78556BD6',
      'EF-Nome-Empresa':'TESTEINTERNO',
      'If-None-Match': IfNoneMatch,
    },
  })
    .then(handleResponse)
    .then(({ status, body }) => {
      const resultElement = document.getElementById('result');
      
      let data = body[0];
    
      console.log('fab: ', data);

      

        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <h5><strong>Status Code:</strong> ${status}</h5>
          <div class='dadosItem'>
            <div class='NomeSaldo'>
              <h6>Código: ${data.produto}</h6>
              <h6>Saldo Fechamento: ${data.saldo_fechamento}</h6>
            </div>
            <div class='reservaFechamento'>
              <h6>Saldo: ${data.saldo}</h6>
              <h6>Reserva: ${data.reserva}</h6>
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
  const { EFToken, IfNoneMatch, lote } = params;

  fetch(url, {
    method: 'GET',
    headers: {
      'EF-Token': 'E43F47921EF22B74D80FE59E78556BD6',
      'EF-Nome-Empresa':'TESTEINTERNO',
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
       
              <div class='NomeSaldo'>
                <h6>Código: ${data[0].produto}</h6>
                <h6>Lote: ${data[0].lote}</h6>
                <h6>Saldo: ${data[0].saldo}</h6>
                <h6>Reserva: ${data[0].reserva}</h6>
              </div>
              <div class='reservaFechamento'>
                <h6>fabricação: ${data[0].fabricacao ? formatDate(data[0].fabricacao) : 'S/ Inf.' }</h6>
                <h6>Validade: ${data[0].validade ? formatDate(data[0].validade): 'S/ Inf.'}</h6>
                <h6>Saldo Fechamento: ${data[0].saldo_fechamento}</h6>
              </div>          
          </div>
          
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

export function consultarSaldoLotes(endpoint, params) {
  const url = `${host}${endpoint}`;
  const { EFToken, IfNoneMatch, lote } = params;

  fetch(url, {
    method: 'GET',
    headers: {
      'EF-Token': 'E43F47921EF22B74D80FE59E78556BD6',
      'EF-Nome-Empresa': 'TESTEINTERNO',
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

      // Criação do HTML dinâmico sem JSX
      const htmlContent = `
        <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
        <h5><strong>Status Code:</strong> ${status}</h5>
        <div class='dadosItem'>
          ${data.map(item => `
            <div class='NomeSaldo'>
              <h6>Código: ${item.produto}</h6>
              <h6>Lote: ${item.lote}</h6>
              <h6>Saldo: ${item.saldo}</h6>
              <h6>Reserva: ${item.reserva}</h6>
            </div>
            <div class='reservaFechamento'>
              <h6>Fabricação: ${item.fabricacao ? formatDate(item.fabricacao) : 'S/ Inf.'}</h6>
              <h6>Validade: ${item.validade ? formatDate(item.validade) : 'S/ Inf.'}</h6>
              <h6>Saldo Fechamento: ${item.saldo_fechamento}</h6>
            </div>
          `).join('')}
        </div>
      `;

      resultElement.innerHTML = htmlContent;
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
