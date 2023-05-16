/* eslint-disable no-await-in-loop */
import {
    HTMLTwoPDFResult,
    IHTMLProps,
    IHTMLTwoPDF,
    IHelper,
    IPDFProps,
    IPartial,
} from '@interfaces/conversor.type';
import { writeFileSync } from 'fs';
import { PDFDocument, PDFPage } from 'pdf-lib';
import { Readable } from 'stream';

import { HTMLHelper } from './html';
import { PDFHelper } from './pdf';

export class HTMLTwoPDF implements IHTMLTwoPDF {
    private html: HTMLHelper;
    private pdf: PDFHelper;

    constructor() {
        this.html = new HTMLHelper();
        this.pdf = new PDFHelper();
    }

    /**
     * Create a pdf based on compiled informations
     * @param html html file/string and it options
     * @param pdf pdf options
     * @returns Promise<HTMLTwoPDFResult>
     */
    async create<T>(
        html: IHTMLProps<T>,
        pdf?: IPDFProps,
    ): Promise<HTMLTwoPDFResult> {
        if (!html.document.html || html.document.html === '') {
            throw new Error('Missing HTML template');
        }

        if (!html.document.data || !Object.keys(html.document.data).length) {
            throw new Error('Missing data to fill HTML template');
        }

        const htmlData = this.html.compile(html.document, html.options);

        const bufferPDF = await this.pdf.create(htmlData, pdf);

        return {
            toBuffer() {
                return bufferPDF;
            },
            toFile(path: string) {
                writeFileSync(path, bufferPDF, { encoding: 'utf-8' });
            },
            toStream() {
                return Readable.from(bufferPDF);
            },
        };
    }

    /**
     * Merge Two or more PDF Files
     * @param archives PDF Files
     * @returns Promise<HTMLTwoPDFResult>
     */
    async merge(archives: Buffer[]): Promise<HTMLTwoPDFResult> {
        const mergedPdf: PDFDocument = await PDFDocument.create();

        for (const pdfBytes of archives) {
            const pdf: PDFDocument = await PDFDocument.load(pdfBytes);

            const copiedPages: PDFPage[] = await mergedPdf.copyPages(
                pdf,
                pdf.getPageIndices(),
            );

            copiedPages.forEach(page => {
                mergedPdf.addPage(page);
            });
        }

        const finalPdf: Uint8Array = await mergedPdf.save();
        const bufferPdf = Buffer.from(finalPdf);

        return {
            toBuffer() {
                return bufferPdf;
            },
            toFile(path: string) {
                writeFileSync(path, bufferPdf, { encoding: 'utf-8' });
            },
            toStream() {
                return Readable.from(bufferPdf);
            },
        };
    }

    /**
     * Register partials and helpers
     * @param partials partials
     * @param helpers helpers
     */
    register(partials?: IPartial[], helpers?: IHelper[]): void {
        if (partials) {
            partials.forEach(partial => {
                this.html.registerPartial(partial.name, partial.fn);
            });
        }

        if (helpers) {
            helpers.forEach(helper => {
                this.html.registerHelper(helper.name, helper.fn);
            });
        }
    }

    /**
     * Unregister partials and helpers
     * @param partials partials
     * @param helpers helpers
     */
    unregister(partials?: string[], helpers?: string[]): void {
        if (partials) {
            partials.forEach(partial => {
                this.html.unregisterPartial(partial);
            });
        }

        if (helpers) {
            helpers.forEach(helper => {
                this.html.unregisterHelper(helper);
            });
        }
    }
}
