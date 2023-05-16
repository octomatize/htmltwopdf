import {
    IHTMLDocument,
    IHTMLHelper,
    IHTMLOptions,
} from '@interfaces/html.type';
import handlebars from 'handlebars';

export class HTMLHelper implements IHTMLHelper {
    /**
     * Compiles a HTML template based on the compiled data and options.
     * @param document HTML template and data to fill.
     * @param options Options to help on the HTML fill.
     * @returns Compiled HTML as string
     */
    compile<T>(document: IHTMLDocument<T>, options?: IHTMLOptions): string {
        const htmlTemplate = handlebars.compile(document.html, options);
        const filledHtmlTemplate = htmlTemplate(document.data);

        return filledHtmlTemplate;
    }

    /**
     * Register a helper accessible by any template on the environment.
     * @param name Helper name
     * @param fn Helper function
     */
    registerHelper(name: string, fn: () => any): void {
        handlebars.registerHelper(name, fn);
    }

    /**
     * Register a html partial accessible by any template on the environment.
     * @param name Partial name
     * @param fn Partial function or string
     */
    registerPartial(name: string, fn: (() => any) | string): void {
        handlebars.registerPartial(name, fn);
    }

    /**
     * Unregister a previously registered helper
     * @param name Helper name
     */
    unregisterHelper(name: string): void {
        handlebars.unregisterHelper(name);
    }

    /**
     * Unregister a previously registered partial
     * @param name Partial name
     */
    unregisterPartial(name: string): void {
        handlebars.unregisterPartial(name);
    }
}
