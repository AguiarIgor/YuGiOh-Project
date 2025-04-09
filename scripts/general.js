/**
 * Função para Vincular um Evento
 */
export function bindEvent(element, eventType, callback) {
    element[`on${eventType}`] = callback; // Define a função diretamente para o evento
}
/**
 * Função para Desvincular um Evento
 */
export function unbindEvent(element, eventType) {
    element[`on${eventType}`] = null; // Remove a função ligada ao evento
}