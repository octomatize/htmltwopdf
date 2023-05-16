import { HTMLHelper } from '../html';

describe('PDFHelper class tests', () => {
    const document = {
        html: '{{ title }} - {{ subtitle }}',
        data: { title: 'Test PDF', subtitle: 'htmltwopdf' },
    };

    test('Should return a filled HTML as string without options', async () => {
        expect.assertions(1);
        const html = new HTMLHelper();
        const newHtml = html.compile(document);

        expect(newHtml).toBe(
            `${document.data.title} - ${document.data.subtitle}`,
        );
    });

    test('Should register a HELPER and be able to use in a HTML template', async () => {
        expect.assertions(1);
        const html = new HTMLHelper();

        const dateNow = Date.now();
        html.registerHelper('showDate', () => dateNow);

        const newHtml = html.compile({ html: '{{ showDate }}', data: {} });

        expect(newHtml).toBe(dateNow.toString());
    });

    test('Should unregister a HELPER and to doesnt show date timestamp', async () => {
        expect.assertions(1);
        const html = new HTMLHelper();

        const dateNow = Date.now();
        html.registerHelper('showDate', () => dateNow);
        html.unregisterHelper('showDate');

        const newHtml = html.compile({ html: '{{ showDate }}', data: {} });

        expect(newHtml).toBe('');
    });

    test('Should register a PARTIAL and be able to use in a HTML template', async () => {
        expect.assertions(1);
        const html = new HTMLHelper();

        html.registerPartial('title', document.html);
        const newHtml = html.compile(
            {
                html: '{{>title title=title subtitle=subtitle }}',
                data: document.data,
            },
            {
                explicitPartialContext: true,
            },
        );

        expect(newHtml).toBe(
            `${document.data.title} - ${document.data.subtitle}`,
        );
    });

    test('Should unregister a PARTIAL and to throw an error when try to use it', async () => {
        expect.assertions(1);
        const html = new HTMLHelper();

        html.registerPartial('title', document.html);
        html.unregisterPartial('title');

        expect(() =>
            html.compile(
                {
                    html: '{{>title title=title subtitle=subtitle }}',
                    data: document.data,
                },
                {
                    explicitPartialContext: true,
                },
            ),
        ).toThrowError('The partial title could not be found');
    });
});
