document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const sequenceInput = document.getElementById('sequenceInput');
    const outputDiv = document.getElementById('output');
  
    // Limpa a saída anterior
    outputDiv.innerHTML = '';
  
    // Validação dos inputs
    if (!fileInput.files[0] || !sequenceInput.value.trim()) {
      outputDiv.innerHTML = '<p style="color: red;">Por favor, envie um arquivo TXT e digite uma sequência válida.</p>';
      return;
    }
  
    // Lê o arquivo TXT
    const file = fileInput.files[0];
    const text = await file.text();
    const linhas = text.split('\n').map(linha => linha.trim()).filter(Boolean);
  
    // Lê a sequência informada
    const sequence = sequenceInput.value.split(' ').map(Number);
  
    let resultados = {};
    let maxIguais = 0;
    let linhasCorrespondentes = [];
  
    linhas.forEach((linha, index) => {
      const numerosLinha = linha.split('\t').map(Number);
      const iguais = numerosLinha.filter(num => sequence.includes(num)).length;
  
      if (iguais > maxIguais) {
        maxIguais = iguais;
        linhasCorrespondentes = [{ linha: index + 1, numeros: numerosLinha }];
      } else if (iguais === maxIguais) {
        linhasCorrespondentes.push({ linha: index + 1, numeros: numerosLinha });
      }
  
      if (!resultados[iguais]) resultados[iguais] = 0;
      resultados[iguais]++;
    });
  
    // Exibe os resultados
    const maxResult = `<h3>Maior número de iguais: ${maxIguais}</h3>`;
    const linhasResult = linhasCorrespondentes.map(({ linha, numeros }) =>
      `<p>Linha ${linha}: ${numeros.join(', ')}</p>`
    ).join('');
    const summary = Object.keys(resultados)
      .sort((a, b) => b - a)
      .map(iguais => `<p>${iguais} números iguais: ${resultados[iguais]} linha(s)</p>`)
      .join('');
  
    outputDiv.innerHTML = maxResult + linhasResult + `<h3>Sumário:</h3>` + summary;
  });
  