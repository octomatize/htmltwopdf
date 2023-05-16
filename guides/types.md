# IHTMLProps

| Properties                                     | Definition                                          |
| ---------------------------------------------- | --------------------------------------------------- |
| **document** ([IHTMLDocument](#IHTMLDocument)) | Html file or string and data to fill the variables. |
| **options** ([IPDFProps](#IPDFProps))          | _Optional_: Handlebar options.                      |

# IHTMLDocument

| Properties        | Definition                           |
| ----------------- | ------------------------------------ |
| **html** (String) | Html file or string                  |
| **data** (T)      | Data to fill html handlebar template |

# IPDFProps

| Properties                               | Definition                           |
| ---------------------------------------- | ------------------------------------ |
| **format** ([PaperFormat](#PaperFormat)) | The print paper format               |
| **landscape** (Boolean)                  | Data to fill html handlebar template |
| **border** ([IPDFMargin](#IPDFMargin))   | Data to fill html handlebar template |
| **header** (String)                      | Header string or html                |
| **footer** (String)                      | Footer string or html                |

# IPDFMargin

| Properties                    | Definition                |
| ----------------------------- | ------------------------- |
| **top** (String or Number)    | _Optional_: Top margin    |
| **bottom** (String or Number) | _Optional_: Bottom margin |
| **left** (String or Number)   | _Optional_: Left margin   |
| **right** (String or Number)  | _Optional_: Right margin  |

# HTMLTwoPDFResult

| Properties                          | Definition                                            |
| ----------------------------------- | ----------------------------------------------------- |
| **toBuffer** (() => Buffer)         | Function that returns pdf on Buffer format            |
| **toFile** ((path: string) => void) | Function that receives a path and save a `.pdf` file  |
| **toStream** (() => Readable)       | Function that returns a pdf on Readable Stream format |

# PaperFormat

| Definition                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- |
| letter, legal, tabloid, ledger, a0, a1, a2, a3, a4, a5 and a6. Can be in uppercase, lowercase or capitalize |
