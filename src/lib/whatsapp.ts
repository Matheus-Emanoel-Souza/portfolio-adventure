/** Mensagem padrão enviada ao abrir a conversa no WhatsApp a partir do portfólio. */
export const WHATSAPP_MESSAGE =
  'Olá acabo de ver seu contato por meio do seu portfólio, meu número do telefone +55 (27)995038630'

/** Monta o link "click to chat" do WhatsApp já com a mensagem preenchida. */
export function buildWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}
