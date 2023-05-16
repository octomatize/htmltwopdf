import { PaperFormat } from '@interfaces/pdf.type';
import { unlink } from 'fs';
import { Readable } from 'stream';

import { HTMLTwoPDF } from '../conversor';

type PDFTestData = {
    title: string;
    subtitle: string;
};

describe('HTMLTwoPDF class tests', () => {
    const testPDFPath = `${__dirname}/test.pdf`;
    const pdfOptions = {
        format: 'A4' as PaperFormat,
        border: { top: 1, right: 1, bottom: 1, left: 1 },
        footer: 'test',
        header: 'test',
        landscape: true,
    };
    const document = {
        html: '{{ title }} - {{ subtitle }}',
        data: { title: 'Test PDF', subtitle: 'htmltwopdf' },
    };
    const partials = [
        {
            name: 'title',
            fn: document.html,
        },
    ];
    const helpers = [
        {
            name: 'showDate',
            fn: () => Date.now(),
        },
    ];

    test('Should return a pdf on Buffer format', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdf = await pdf.create<PDFTestData>({ document });

        expect(newPdf.toBuffer()).toBeInstanceOf(Buffer);
    });

    test('Should return a pdf on Buffer format with PDF options', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdf = await pdf.create<PDFTestData>({ document }, pdfOptions);

        expect(newPdf.toBuffer()).toBeInstanceOf(Buffer);
    });

    test('Should return a pdf on Stream format', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdf = await pdf.create<PDFTestData>({ document });

        expect(newPdf.toStream()).toBeInstanceOf(Readable);
    });

    test('Should return a pdf and save', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdf = await pdf.create<PDFTestData>({ document });

        expect(() => newPdf.toFile(testPDFPath)).not.toThrowError();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unlink(testPDFPath, _ => {});
    });

    test('Should throw an error cause is missing html template', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();

        expect(async () => {
            await pdf.create<PDFTestData>({
                document: { html: '', data: document.data },
            });
        }).rejects.toThrowError('Missing HTML template');
    });

    test('Should throw an error cause is missing html data', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();

        await expect(() =>
            pdf.create<Record<string, never>>({
                document: { html: document.html, data: {} },
            }),
        ).rejects.toThrowError('Missing data to fill HTML template');
    });

    test('Should create 2 pdfs on Buffer format and merge both into one', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdfOne = await pdf.create<PDFTestData>({ document });
        const newPdfTwo = await pdf.create<PDFTestData>({ document });

        const mergedPdf = await pdf.merge([
            newPdfOne.toBuffer(),
            newPdfTwo.toBuffer(),
        ]);

        expect(mergedPdf.toBuffer()).toBeInstanceOf(Buffer);
    });

    test('Should create 2 pdfs on Stream format and merge both into one', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdfOne = await pdf.create<PDFTestData>({ document });
        const newPdfTwo = await pdf.create<PDFTestData>({ document });

        const mergedPdf = await pdf.merge([
            newPdfOne.toBuffer(),
            newPdfTwo.toBuffer(),
        ]);

        expect(mergedPdf.toStream()).toBeInstanceOf(Readable);
    });

    test('Should create 2 pdfs on Buffer format, merge both into one and save', async () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const newPdfOne = await pdf.create<PDFTestData>({ document });
        const newPdfTwo = await pdf.create<PDFTestData>({ document });

        const mergedPdf = await pdf.merge([
            newPdfOne.toBuffer(),
            newPdfTwo.toBuffer(),
        ]);

        expect(() => mergedPdf.toFile(testPDFPath)).not.toThrowError();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unlink(testPDFPath, _ => {});
    });

    test('Should register partials and not throw error', () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const partialRegister = pdf.register(partials);

        expect(() => partialRegister).not.toThrowError(
            'The partial title could not be found',
        );
    });

    test('Should register helpers and not throw error', () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const helpersRegister = pdf.register([], helpers);

        expect(() => helpersRegister).not.toThrowError();
    });

    test('Should register both partials and helpers and not throw error', () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const register = pdf.register(partials, helpers);

        expect(() => register).not.toThrowError();
    });

    test('Should not register partials and helpers  because there is not any to register and not throw error', () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const register = pdf.register();

        expect(() => register).not.toThrowError();
    });

    test('Should unregister partials and helpers and not throw error', () => {
        expect.assertions(1);

        const pdf = new HTMLTwoPDF();
        const register = pdf.unregister(['title'], ['showDate']);

        expect(() => register).not.toThrowError();
    });
});
