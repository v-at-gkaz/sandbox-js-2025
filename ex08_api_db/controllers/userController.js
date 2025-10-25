export const userController = async (req, res, db) => {
    const {method, url} = req;
    let parsedUrl = url;
    if(!parsedUrl.includes('?')) {
        parsedUrl = `${parsedUrl}?`;
    }
    parsedUrl = parsedUrl.split("?");

    let query = [];
    if(parsedUrl[1].length){
            query = parsedUrl[1].split("&");
    }
    const parsedPath = parsedUrl[0].split("/");

    let mockupReponse;

    switch (method) {
        case 'GET':

            let id=null;
            let found = query.find(itm=>{
               return itm.startsWith("id=");
            });

            if(found?.length){
                const parsedValue = found.split("=");
                found = parsedValue[1];
            }

            if(!isNaN(+found)){
                id=+found;
            }

            if(!id) {
                const found2 = parsedPath[2];
                if(!isNaN(+found2)){
                    id=+found2;
                }
            }

            if(id){
                console.log('get by id');

                const one = db.getOne(id);

                if(one) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(one));
                    break;
                }

                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:`Entity with id: ${id} not found`}));
                break;
            }

            console.log('get all');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(await db.getAll()));
            break;
        case 'POST':
            let data = '';

            req.on('data', (chunk) => {
                if(chunk) {
                    data += chunk;
                }
            });

            req.on('end', () => {
                try {
                    const body = JSON.parse(data);

                    if(!body.name){
                        res.writeHead(406, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({error:`Wrong Body Format`}));
                        return;
                    }

                    const created = db.add(body);

                    if(created) {
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(created));
                    }
                } catch (e) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error:`Error created user: ${e.message}`}));
                }
            });
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