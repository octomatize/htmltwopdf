export interface IHTMLDocument<T> {
    html: string;
    data: T;
}

// export type IHTMLFunctions = Record<string>;

export interface IHTMLOptions {
    data?: boolean;
    compat?: boolean;
    knownHelpers?: KnownHelpers;
    knownHelpersOnly?: boolean;
    noEscape?: boolean;
    strict?: boolean;
    assumeObjects?: boolean;
    preventIndent?: boolean;
    ignoreStandalone?: boolean;
    explicitPartialContext?: boolean;
}

export interface IHTMLHelper {
    compile: <T>(document: IHTMLDocument<T>, options?: IHTMLOptions) => string;
    registerHelper: (name: string, fn: () => any) => void;
    registerPartial: (name: string, fn: () => any | string) => void;
    unregisterHelper: (name: string) => void;
    unregisterPartial: (name: string) => void;
}
