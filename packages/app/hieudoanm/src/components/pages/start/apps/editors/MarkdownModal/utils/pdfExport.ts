import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import {
  Content,
  ContentText,
  PageSize,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

import { FONT_NAME_TIMES, A4_MARGIN, ZERO_MARGIN } from '../constants';

export const exportPdf = (html: string, setLoading: (v: boolean) => void) => {
  setLoading(true);
  const origin = window.location.origin;
  pdfMake.fonts = {
    Times: {
      normal: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Regular.ttf`,
      bold: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold.ttf`,
      italics: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Italic.ttf`,
      bolditalics: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold-Italic.ttf`,
    },
  };
  const converted: Content[] = htmlToPdfmake(html) as Content[];
  const filteredContent = converted.filter(
    (content) => (content as ContentText).text !== ' '
  );
  const documentDefinitions: TDocumentDefinitions = {
    pageSize: 'A4' as PageSize,
    pageMargins: A4_MARGIN,
    content: filteredContent,
    styles: {
      'html-h1': {
        fontSize: 12,
        bold: true,
        alignment: 'center',
        margin: ZERO_MARGIN,
        lineHeight: 2,
      },
      'html-h2': {
        fontSize: 12,
        bold: true,
        alignment: 'left',
        margin: ZERO_MARGIN,
        lineHeight: 2,
      },
      'html-h3': {
        fontSize: 12,
        bold: true,
        italics: true,
        alignment: 'left',
        margin: ZERO_MARGIN,
        lineHeight: 2,
      },
      'html-h4': {
        fontSize: 12,
        bold: true,
        alignment: 'left',
        margin: [36, 0, 0, 0],
        lineHeight: 2,
      },
      'html-h5': {
        fontSize: 12,
        bold: true,
        italics: true,
        alignment: 'left',
        margin: [36, 0, 0, 0],
        lineHeight: 2,
      },
      'html-h6': { fontSize: 12, margin: [36, 0, 0, 0], lineHeight: 2 },
      'html-p': { fontSize: 12, margin: ZERO_MARGIN, lineHeight: 2 },
    },
    defaultStyle: {
      font: 'Times',
      fontSize: 12,
      alignment: 'left',
      margin: ZERO_MARGIN,
    },
  };
  pdfMake.createPdf(documentDefinitions).download('download.pdf');
  setLoading(false);
};
