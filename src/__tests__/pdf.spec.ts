import { PaperFormat } from '@interfaces/pdf.type';

import { PDFHelper } from '../pdf';

describe('PDFHelper class tests', () => {
    const html = 'Test PDF - htmltwopdf';
    const options = {
        format: 'A4' as PaperFormat,
        border: { top: 1, right: 1, bottom: 1, left: 1 },
        footer: 'test',
        header: 'test',
        landscape: true,
    };

    test('Should return a PDF on buffer format with options', async () => {
        expect.assertions(1);
        const pdf = new PDFHelper();
        const newPdf = await pdf.create(html, options);

        expect(newPdf).toBeInstanceOf(Buffer);
    });

    test('Should return a PDF on buffer format without options', async () => {
        expect.assertions(1);
        const pdf = new PDFHelper();
        const newPdf = await pdf.create(html);

        expect(newPdf).toBeInstanceOf(Buffer);
    });
});
