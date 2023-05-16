import { IHTMLDocument, IHTMLOptions } from '@interfaces/html.type';
import { IPDFOptions } from '@interfaces/pdf.type';
import { Readable } from 'stream';

export interface IHTMLProps<T> {
    document: IHTMLDocument<T>;
    options?: IHTMLOptions;
}

export interface IPartial {
    name: string;
    fn: ((...args: any) => any) | (() => any) | string;
}
export interface IHelper {
    name: string;
    fn: (...args: any) => any | (() => any);
}

export type IPDFProps = IPDFOptions;

export type HTMLTwoPDFResult = {
    toBuffer: () => Buffer;
    toFile: (path: string) => void;
    toStream: () => Readable;
};

export interface IHTMLTwoPDF {
    create: <T>(
        html: IHTMLProps<T>,
        pdf?: IPDFProps,
    ) => Promise<HTMLTwoPDFResult>;
    merge(archives: Buffer[]): Promise<HTMLTwoPDFResult>;
    register(partials?: IPartial[], helpers?: IHelper[]): void;
    unregister(partials?: string[], helpers?: string[]): void;
}
