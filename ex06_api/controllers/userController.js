export const userController = (req, res) => {
    const {method} = req;

    let mockupReponse;

    switch (method) {
        case 'GET':
            res.writeHead(200, {'Content-Type': 'application/json'});
            mockupReponse = [
                {
                    name: "Ivan"
                },
                {
                    name: "Maria"
                }
            ];
            res.end(JSON.stringify(mockupReponse));
            break;
        case 'POST':
            res.writeHead(201, {'Content-Type': 'application/json'});
            mockupReponse = {
                    id: 1,
                    name: "Ivan"
            };
            res.end(JSON.stringify(mockupReponse));
            break;
        case 'PUT':
        case 'PATCH':
            res.writeHead(201, {'Content-Type': 'application/json'});
            mockupReponse = {
                id: 1,
                name: "Sergey"
            };
            res.end(JSON.stringify(mockupReponse));
            break;
        case 'DELETE':
            res.writeHead(204);
            res.end(null);
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end(`UNKNOWN METHOD: ${method}`);
    }
}