import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function mydocumentoPDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const clientes = [
    {
      id: 1,
      nome: "João",
      email: "joao@abddd.com.br",
      fone: "(27)99944-4445",
    },
    {
      id: 2,
      nome: "Maria",
      email: "maria@abddd.com.br",
      fone: "(27)99944-4446",
    },
    {
      id: 3,
      nome: "Pedro",
      email: "pedro@abddd.com.br",
      fone: "(27)99944-4447",
    },
  ];

  const reportTitle = [
    {
      text: "Clientes",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = clientes.map((cliente) => {
    return [
      {
        text: cliente.id,
        fontSize: 9,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      { text: cliente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.email, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.fone, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Código",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            { text: "Nome", style: "tableHeader", fontSize: 10 },
            { text: "E-mail", style: "tableHeader", fontSize: 10 },
            { text: "Telefone", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: {
      width: 595.28,
      height: 595.28
    },
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    watermark: { text: 'Documento Cancelado', angle: -45, opacity: 0.3, bold: true, italics: false },
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default mydocumentoPDF;
