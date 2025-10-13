export const serverHandler = (req, res) => {
    // Set the HTTP status code and content type
    // res.writeHead(200, { 'Content-Type': 'text/html', 'My-Header': 'Hello, HTML' });
    // console.log(req.headers);

    const url = req.url;
    console.log(`url: ${url}`);

    const parsedUrl = url.split('?');
    const queryParams = parsedUrl[1];
    const parsedQuery = queryParams?.split('&');

    console.log(`query:`, parsedQuery);

    try {
        const a = parseInt(parsedQuery[0].replace('a=', ''));
        const b = parseInt(parsedQuery[1].replace('b=', ''));
        const c = parseInt(parsedQuery[2].replace('c=', ''));
        console.log(`a=${a}, b=${b}, c=${c}`);
    } catch (e) {
        res.end(`ERROR`);
        return;
    }

    const method = req.method;
    console.log('method >>> ', method);

    // const headers = req.headers;
    // console.log('headers >>> ', headers);

    if(method === 'POST') {
        let data = '';

        req.on('data', (chunk) => {
            if(chunk) {
                console.log('chunk detected!', chunk);
                data += chunk;
            }
        });

        req.on('end', () => {
            console.log('End detected!');
           // console.log('Data detected: ', data);
        });

    }

    // Send the response body
    res.end(`<html>
<head>
    <meta charset="utf-8"></meta>
</head>
<body>
<h1>Test</h1>
<form method="post" action="/" enctype="multipart/form-data">
<label for="text">text:</label>
<input type="text" id="text" name="field1">
<br />
<input type="file" value="file" name="field2">
<br />
<button type="submit">submit</button>
</form>
</body>
</html>`);
}