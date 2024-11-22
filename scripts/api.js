import { host } from './constants.js';
import { handleResponse } from './utils.js';

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

      if (status === 200) {
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <p><strong>Status Code:</strong> ${status}</p>
          <pre>${JSON.stringify(body, null, 0)}</pre>
        `;
      } else {
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Erro na Consulta</h4>
          <p><strong>Status Code:</strong> ${status}</p>
          <pre>${JSON.stringify(body, null, 2)}</pre>
        `;
      }
    })
    .catch(error => {
      document.getElementById('result').innerHTML = `
        <h3>Erro ao Consultar API</h3>
        <p>${error.message}</p>
      `;
    });
}
