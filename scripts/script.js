    const host = 'http://localhost:5087/v5'; // Substitua pelo host da sua API


    function getFormData() {
      return {
        produto: document.getElementById('produto').value,
        empresa: document.getElementById('empresa').value || '',
        cor: document.getElementById('cor').value || '',
        tamanho: document.getElementById('tamanho').value || '',
        lote: document.getElementById('lote').value || '',
        EFToken: document.getElementById('efToken').value,
        IfNoneMatch: document.getElementById('ifNoneMatch').value || '',
      };
    }


    function handleResponse(response) {
      // Lê o status e o body da resposta
      return response.json().then(data => {
        return { status: response.status, body: data };
      });
    }

    function validarCampos({ produto, EFToken }) {
      if (!produto) {
        alert('O código do produto é obrigatório.');
        return false;
      }
      if (!EFToken) {
        alert('O EFToken é obrigatório.');
        return false;
      }
      return true;
    }

    function consultarSaldo(endpoint, params) {
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
        // Formata a resposta como HTML
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Consulta Realizada com Sucesso</h4>
          <p><strong>Status Code:</strong> ${status}</p>
          <pre>${JSON.stringify(body, null, 2)}</pre>
        `;
      } else {
        resultElement.innerHTML = `
          <h4 class='titleResponse'>Erro na Consulta</h4>
          <p><strong>Status Code:</strong> ${status}</p>
          <pre>${JSON.stringify(body, null, 2)}</pre>
        `;
      }
    })
        .catch((error) => {
          document.getElementById('result').innerHTML = `
        <h3>Erro ao Consultar API</h3>
        <p>${error.message}</p>
      `;
        });
    }

    function getSaldoProduto() {
      const formulario = getFormData();
      if (!validarCampos(formulario)) return;

      const { produto, empresa, cor, tamanho, ...prev } = getFormData();
      const endpoint = `/saldo?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
      consultarSaldo(endpoint, prev);
    }


    function getSaldoLote() {
      const formulario = getFormData();
      if (!validarCampos(formulario)) return;

      const { produto, empresa, cor, tamanho, lote, ...rest } = getFormData();
      const endpoint = `/saldo/lote?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}&LOTE=${lote}`;
      consultarSaldo(endpoint, rest);
    }
    
    function getSaldoLotes() {
      const formulario = getFormData();
      if (!validarCampos(formulario)) return;

      const { produto, empresa, cor, tamanho, ...rest } = getFormData();
      const endpoint = `/saldo/lotes?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
      consultarSaldo(endpoint, rest);
    }