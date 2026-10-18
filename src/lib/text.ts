// Content files mark the highlighted part of a heading with *asterisks*:
// "Tu vendedor con IA *que nunca deja de vender.*"
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rich(text: string): string {
  return escape(text).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');
}

export function plain(text: string): string {
  return text.replace(/\*/g, '');
}
