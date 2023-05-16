# PDF Merging - Buffer Format

**_Parameters_**

| Properties                                     | Definition                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| **html** ([IHTMLProps](./types.md#IHTMLProps)) | Html file or string, data to fill the variables and can have also handlebars options. |
| **pdf** ([IPDFProps](./types.md#IPDFProps))    | Puppeteer pdf format and options                                                      |

**_Returns_**

| Return                                                                                        | Type                                                  |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Returns 3 functions that retrieves different pdf formats, toBuffer(), toStream() and toFile() | Promise<[HTMLTwoPDFResult](./types#HTMLTwoPDFResult)> |

**_Examples_**

Creating two pdfs, merging and returning a Buffer file:

```ts
import { HTMLTwoPDF } from 'htmltwopdf';

type PDFTestData {
    title: string;
    subtitle: string;
}

const document = {
    html: '{{ title }} - {{ subtitle }}', // Can be also a html file
    data: { title: 'Test PDF', subtitle: 'htmltwopdf' }, // Here goes the data to be filled on your handlebars template.
};

const pdf = new HTMLTwoPDF();
const pdfOne = await pdf.create<PDFTestData>({ document });
const pdfTwo = await pdf.create<PDFTestData>({ document });

const mergedPdf = await pdf.merge([
    pdfOne.toBuffer(),
    pdfTwo.toBuffer(),
]);

const bufferPdf = mergedPdf.toBuffer();
```

# PDF Merging - Stream Format

**_Parameters_**

| Properties                                     | Definition                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| **html** ([IHTMLProps](./types.md#IHTMLProps)) | Html file or string, data to fill the variables and can have also handlebars options. |
| **pdf** ([IPDFProps](./types.md#IPDFProps))    | Puppeteer pdf format and options                                                      |

**_Returns_**

| Return                                                                                        | Type                                                  |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Returns 3 functions that retrieves different pdf formats, toBuffer(), toStream() and toFile() | Promise<[HTMLTwoPDFResult](./types#HTMLTwoPDFResult)> |

**_Examples_**

Creating two pdfs, merging and returning a Stream file:

```ts
import { HTMLTwoPDF } from 'htmltwopdf';

type PDFTestData {
    title: string;
    subtitle: string;
}

const document = {
    html: '{{ title }} - {{ subtitle }}', // Can be also a html file
    data: { title: 'Test PDF', subtitle: 'htmltwopdf' }, // Here goes the data to be filled on your handlebars template.
};

const pdf = new HTMLTwoPDF();
const pdfOne = await pdf.create<PDFTestData>({ document });
const pdfTwo = await pdf.create<PDFTestData>({ document });

const mergedPdf = await pdf.merge([
    pdfOne.toBuffer(),
    pdfTwo.toBuffer(),
]);

const streamPdf = mergedPdf.toBuffer();
```

# PDF Merging - Stream Format

**_Parameters_**

| Properties                                     | Definition                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| **html** ([IHTMLProps](./types.md#IHTMLProps)) | Html file or string, data to fill the variables and can have also handlebars options. |
| **pdf** ([IPDFProps](./types.md#IPDFProps))    | Puppeteer pdf format and options                                                      |

**_Returns_**

| Return                                                                                        | Type                                                  |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Returns 3 functions that retrieves different pdf formats, toBuffer(), toStream() and toFile() | Promise<[HTMLTwoPDFResult](./types#HTMLTwoPDFResult)> |

**_Examples_**

Creating two pdfs, merging and saving a `.pdf` file:

```ts
import { HTMLTwoPDF } from 'htmltwopdf';

type PDFTestData {
    title: string;
    subtitle: string;
}

const document = {
    html: '{{ title }} - {{ subtitle }}', // Can be also a html file
    data: { title: 'Test PDF', subtitle: 'htmltwopdf' }, // Here goes the data to be filled on your handlebars template.
};

const pdf = new HTMLTwoPDF();
const pdfOne = await pdf.create<PDFTestData>({ document });
const pdfTwo = await pdf.create<PDFTestData>({ document });

const mergedPdf = await pdf.merge([
    pdfOne.toBuffer(),
    pdfTwo.toBuffer(),
]);

mergedPdf.toFile('./your_path');
```
