export function getFormData() {
    return {
      produto: document.getElementById('produto').value,
      empresa: document.getElementById('empresa').value || '',
      cor: document.getElementById('cor').value || '',
      tamanho: document.getElementById('tamanho').value || '',
      lote: document.getElementById('lote').value || '',
      EFToken: document.getElementById('eftoken').value,
      IfNoneMatch: document.getElementById('ifNoneMatch').value || '',
    };
  }
  
  export function handleResponse(response) {
    return response.json().then(data => ({ status: response.status, body: data }));
  }
  
  export function validarCampos({ produto, EFToken }) {
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
  