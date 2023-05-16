type Capitalize<S extends string> = intrinsic;

type Uppercase<S extends string> = intrinsic;

type LowerCasePaperFormat =
    | 'letter'
    | 'legal'
    | 'tabloid'
    | 'ledger'
    | 'a0'
    | 'a1'
    | 'a2'
    | 'a3'
    | 'a4'
    | 'a5'
    | 'a6';

export type PaperFormat =
    | Uppercase<LowerCasePaperFormat>
    | Capitalize<LowerCasePaperFormat>
    | LowerCasePaperFormat;

export interface IPDFMargin {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
}

export interface IPDFOptions {
    format?: PaperFormat;
    landscape?: boolean;
    border?: IPDFMargin;
    header?: string;
    footer?: string;
    margin?: IPDFMargin;
}

export interface IPDFHelper {
    create: (html: string, options?: IPDFOptions) => Promise<Buffer>;
}
