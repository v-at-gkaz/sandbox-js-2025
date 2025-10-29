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

    let id, found, data;

    id=null;
    found = query.find(itm=>{
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

    switch (method) {
        case 'GET':
            if(id){
                console.log('get by id');

                const one = await db.getOne(id);

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
            data = '';

            req.on('data', (chunk) => {
                if(chunk) {
                    data += chunk;
                }
            });

            req.on('end', async() => {
                try {
                    const body = JSON.parse(data);

                    if(!body.name){
                        res.writeHead(406, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({error:`Wrong Body Format`}));
                        return;
                    }

                    const created = await db.add(body);

                    if(created) {
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(created));
                    }
                } catch (e) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: e}));
                }
            });
            break;
        case 'PUT':
        case 'PATCH':

            if(!id) {
                throw new Error('id not found');
            }

            data = '';

            req.on('data', (chunk) => {
                if(chunk) {
                    data += chunk;
                }
            });

            req.on('end', async() => {
                try {
                    const body = JSON.parse(data);

                    if(!(body.name || body.password)){
                        res.writeHead(406, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({error:`Wrong Body Format`}));
                        return;
                    }

                    const created = await db.edit(body, id);

                    if(created) {
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(created));
                    }

                } catch (e) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: e}));
                }
            });
            break;
        case 'DELETE':
            if(!id) {
                throw new Error('id not found');
            }

            try {

                const deleted = await db.delete(id);

                if(deleted) {
                    res.writeHead(204, {'Content-Type': 'application/json'});
                    res.end(null);
                }

            } catch (e) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: e}));
            }

            break;
        default:
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end(`UNKNOWN METHOD: ${method}`);
    }
}