// Validação de CPF
export function validarCPF(cpf) {
  if (!cpf) return { valido: false, mensagem: 'CPF é obrigatório.' };
  
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  if (cpfLimpo.length !== 11) {
    return { valido: false, mensagem: 'CPF deve conter 11 dígitos.' };
  }
  
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }
  
  return { valido: true, mensagem: '' };
}

// Validação de Email
export function validarEmail(email) {
  if (!email) return { valido: false, mensagem: 'Email é obrigatório.' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valido: false, mensagem: 'Email inválido. Verifique o formato.' };
  }
  
  return { valido: true, mensagem: '' };
}
