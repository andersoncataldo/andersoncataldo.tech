/**
 * Aceita e-mail, telefone/WhatsApp (10 a 15 dígitos) ou perfil/empresa do LinkedIn (URL).
 * Compartilhado entre o formulário (UX imediata) e o endpoint /api/lead (validação autoritativa).
 */
export function isValidContactChannel(value: string): boolean {
  const v = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return true;
  const digits = v.replace(/\D/g, '');
  if (/^[+()\d\s.-]+$/.test(v) && digits.length >= 10 && digits.length <= 15) return true;
  if (/^(https?:\/\/)?([\w-]+\.)?linkedin\.com\/(in|company)\/[\w%-]+\/?/i.test(v)) return true;
  return false;
}
