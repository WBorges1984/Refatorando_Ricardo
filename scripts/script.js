    const host = 'http://localhost:5087/v5'; // Substitua pelo host da sua API

    function handleResponse(response) {
      // Lê o status e o body da resposta
      return response.json().then(data => {
        return { status: response.status, body: data };
      });
    }

    function getSaldoProduto() {
      const produto = document.getElementById('produto').value;
      const empresa = document.getElementById('empresa').value || '';
      const cor = document.getElementById('cor').value || '';
      const tamanho = document.getElementById('tamanho').value || '';

      const EFToken = document.getElementById('efToken').value;
      const IfNoneMatch = document.getElementById('ifNoneMatch').value || '';

      const url = `${host}/saldo?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
      
      fetch(url, {
        method: 'GET',
        headers: {
          'EF-Token': EFToken,
          'If-None-Match': IfNoneMatch
        }
      })
      .then(handleResponse)  // Usando a função para tratar a resposta
      .then(({ status, body }) => {
        document.getElementById('result').textContent = `Status Code: ${status}\n\nBody:\n${JSON.stringify(body, null, 2)}`;
      })
      .catch(error => {
        document.getElementById('result').textContent = 'Erro ao consultar API: ' + error.message;
      });
    }

    function getSaldoLote() {
      const produto = document.getElementById('produto').value;
      const empresa = document.getElementById('empresa').value || '';
      const cor = document.getElementById('cor').value || '';
      const tamanho = document.getElementById('tamanho').value || '';
      const lote = document.getElementById('lote').value; // Agora o lote vem do campo de entrada

      const EFToken = document.getElementById('efToken').value;
      const IfNoneMatch = document.getElementById('ifNoneMatch').value || '';

      // A URL agora inclui o código do lote corretamente
      const url = `${host}/saldo/lote?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}&LOTE=${lote}`;
      
      fetch(url, {
        method: 'GET',
        headers: {
          'EF-Token': EFToken,
          'If-None-Match': IfNoneMatch
        }
      })
      .then(handleResponse)  // Usando a função para tratar a resposta
      .then(({ status, body }) => {
        document.getElementById('result').textContent = `Status Code: ${status}\n\nBody:\n${JSON.stringify(body, null, 2)}`;
      })
      .catch(error => {
        document.getElementById('result').textContent = 'Erro ao consultar API: ' + error.message;
      });
    }

    function getSaldoLotes() {
      const produto = document.getElementById('produto').value;
      const empresa = document.getElementById('empresa').value || '';
      const cor = document.getElementById('cor').value || '';
      const tamanho = document.getElementById('tamanho').value || '';

      const EFToken = document.getElementById('efToken').value;
      const IfNoneMatch = document.getElementById('ifNoneMatch').value || '';

      const url = `${host}/saldo/lotes?EMPRESA=${empresa}&PRODUTO=${produto}&COR=${cor}&TAMANHO=${tamanho}`;
      
      fetch(url, {
        method: 'GET',
        headers: {
          'EF-Token': EFToken,
          'If-None-Match': IfNoneMatch
        }
      })
      .then(handleResponse)  // Usando a função para tratar a resposta
      .then(({ status, body }) => {
        document.getElementById('result').textContent = `Status Code: ${status}\n\nBody:\n${JSON.stringify(body, null, 2)}`;
      })
      .catch(error => {
        document.getElementById('result').textContent = 'Erro ao consultar API: ' + error.message;
      });
    }