# PDF Creation - Buffer Format

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

Creating pdf and returning a Buffer file:

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
const newPdf = await pdf.create<PDFTestData>({ document });

const bufferPdf = newPdf.toBuffer();
```

# PDF Creation - Stream Format

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

Creating pdf and returning a Stream file:

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
const newPdf = await pdf.create<PDFTestData>({ document });

const streamPdf = newPdf.toStream();
```

# PDF Creation - File Format

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

Creating pdf and saving a `.pdf` file:

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
const newPdf = await pdf.create<PDFTestData>({ document });

newPdf.toFile('./your_path');
```
