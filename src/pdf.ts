import { IPDFHelper, IPDFOptions } from '@interfaces/pdf.type';
import { launch } from 'puppeteer';

export class PDFHelper implements IPDFHelper {
    async create(html: string, options?: IPDFOptions): Promise<Buffer> {
        const browser = await launch({
            headless: 'new',
        });
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: 'networkidle2',
        });

        const pdf = await page.pdf({
            format: options?.format ?? 'A4',
            ...(options?.border ? { margin: options?.border } : {}),
            ...(options?.header
                ? { displayHeaderFooter: true, headerTemplate: options?.header }
                : {}),
            ...(options?.footer
                ? { displayHeaderFooter: true, footerTemplate: options?.footer }
                : {}),
            ...(options?.landscape ? { landscape: options?.landscape } : {}),
            ...(options?.margin ? { margin: options?.margin } : {}),
        });

        await browser.close();

        return pdf;
    }
}
