// cpfValidator.ts

/**
 * Valida um CPF (Cadastro de Pessoas Físicas).
 * @param {string} cpf - O CPF a ser validado.
 * @returns {boolean} - Retorna true se o CPF for válido, false caso contrário.
 */
export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf === '') return false; // Verifica se CPF está vazio

  // Elimina CPFs inválidos conhecidos
  if (cpf.length !== 11 || 
      cpf === "00000000000" || 
      cpf === "11111111111" || 
      cpf === "22222222222" || 
      cpf === "33333333333" || 
      cpf === "44444444444" || 
      cpf === "55555555555" || 
      cpf === "66666666666" || 
      cpf === "77777777777" || 
      cpf === "88888888888" || 
      cpf === "99999999999") {
      return false;
  }

  // Valida 1o dígito
  let add = 0;
  for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
      rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(9))) {
      return false;
  }

  // Valida 2o dígito
  add = 0;
  for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
      rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10))) {
      return false;
  }

  return true;   
}