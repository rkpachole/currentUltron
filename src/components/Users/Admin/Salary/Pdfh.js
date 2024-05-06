import {Html, Document, Page} from "react-pdf-html";

const html = "<div>Foobar</div>";


//const html = ReactDOMServer.renderToStaticMarkup(element);

function Pdfh() {
    return (
        <Document>
            <Page>
                <Html>{html}</Html>
            </Page>
        </Document>
    );
}

export default Pdfh;
