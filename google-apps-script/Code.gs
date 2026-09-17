/**
 * BildS Odontologia — LP — captura de leads (Nome + WhatsApp) direto na planilha.
 *
 * COMO USAR:
 * 1. Crie uma Google Planilha nova (sheets.new).
 * 2. Na primeira linha (linha 1), crie os cabeçalhos, um por coluna:
 *      A1: Data e hora   B1: Nome   C1: WhatsApp   D1: Origem
 * 3. No menu da planilha: Extensões > Apps Script.
 * 4. Apague o conteúdo padrão (function myFunction(){}) e cole este arquivo inteiro.
 * 5. Salve (ícone de disquete) e dê um nome ao projeto, ex: "BildS LP Leads".
 * 6. Clique em "Implantar" > "Nova implantação".
 * 7. No ícone de engrenagem, escolha o tipo "Aplicativo da Web".
 * 8. Configure:
 *      Executar como: Eu (seu e-mail)
 *      Quem pode acessar: Qualquer pessoa
 * 9. Clique em "Implantar" e autorize as permissões pedidas (é o seu próprio script).
 * 10. Copie a "URL do app da Web" (termina em /exec).
 * 11. Cole essa URL na linha "var SHEETS_WEBAPP_URL" dentro do index.html da LP.
 *
 * Sempre que você EDITAR este código depois de já ter implantado uma vez,
 * é preciso ir em "Implantar" > "Gerenciar implantações" > ícone de lápis >
 * "Nova versão" > "Implantar" — senão a URL antiga continua usando o código antigo.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.whatsapp || '',
      data.origem || 'LP BildS Odontologia'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'erro', mensagem: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
