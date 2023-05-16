# htmltwopdf

[![codecov](https://codecov.io/gh/Octomatize/htmltwopdf/branch/main/graph/badge.svg?token=BQRBA4KIJU)](https://codecov.io/gh/Octomatize/htmltwopdf)

The `htmltwopdf` is an html to pdf conversor library written in js with typescript based on handlebars and puppeteer that provides a convenient way to create pdfs based on html. You can use on server-side JavaScript applications.

## Getting Started

1. Install the htmltwopdf package usign the following command:
   `npm i htmltwopdf --save` or `yarn add htmltwopdf`.

2. Add required packages:

```ts
import { HTMLTwoPDF } from 'htmltwopdf';
```

3. Read a html template(handlebars format) or put a string and create a pdf:

```ts
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

// You have 3 ways to get your pdf: Buffer, Stream and File.
const bufferPdf = newPdf.toBuffer();
const streamPdf = newPdf.toStream();
newPdf.toFile('your_path_goes_here')
```

You can also merge two or more pdfs:

```ts
...
const mergedPdf = await pdf.merge([
    pdfOne.toBuffer(),
    pdfTwo.toBuffer(),
]);

// You have 3 ways to get your pdf also: Buffer, Stream and File.
const bufferPdf = mergedPdf.toBuffer();
const streamPdf = mergedPdf.toStream();
mergedPdf.toFile('./your_path')
```

For more informations and samples, see our guides at [create.md](./guides/create.md), [merge.md](./guides/merge.md) and [types.md](./guides/types.md).

### Testing

Run tests:

```bash
npm i && npm run test
```

We use `jest` to run tests, see [their documentation](https://github.com/facebook/jest) for more information.

## Changelog

Wondering about upcoming or previous changes to the auth-wrapper? Take a look at the [CHANGELOG](./CHANGELOG.md).

### Contributing

Contributions are welcome!
For details about commiting changes, automated versioning and releases, see [Contributing](./CONTRIBUTING.md).

### Versioning

The libraries follow [Semantic Versioning](https://semver.org/).
Package versions are updated automatically and individually based on commit messages.

## License

[MIT License](./LICENSE)
