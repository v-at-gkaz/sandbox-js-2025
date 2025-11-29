function writeOrders(cb) {

    let table = `
    <table class="table" border="1" cellpadding="1" cellspacing="0">
        <thead>
           <th>Id</th>
           <th>Name</th>
        </thead>
        <tbody>
            {{ROWS}}
        </tbody>
    </table>
    `;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem('jwt'));

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("/order", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log('orders from server >>> ', result);
            if (result.error) {
                cb([JSON.stringify(result)]);
                return;
            }

            const rows = [];

            for (const itm of result) {
                rows.push(`<tr><td>${itm.id}</td><td><a href="#${itm.id}">Order dtails</a></td></tr>`)
            }
            const html = table.replace('{{ROWS}}', rows.join(''));
            cb(null, html);
        })
        .catch((error) => {
            cb([JSON.stringify(error)]);
        });
}

function writeErrors(errors=[]) {
    let err = ['<div>Errors:</div>'];
    err.push('<ul>');
    if(!errors.length) {
        errorWrapper.innerHTML = '';
        return;
    }
    for (const error of errors) {
        err.push(`<li>${error}</li>`);
    }
    err.push('</ul>');
    tableWrapper.innerHTML = '';
    errorWrapper.innerHTML = err.join('');
}

document.querySelector('#form-auth').addEventListener('submit', (fe) => {
    fe.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if(login && password){
        console.log('Login detected! login pass >>> ', login, password);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            login,
            password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/auth/sign-in", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(!result.auth) {
                    writeErrors([JSON.stringify(result)]);
                    return;
                }
                localStorage.setItem('jwt', result.token);
                errorWrapper.innerHTML = '';
                tableWrapper.innerHTML = '';
            })
            .catch((error) => {
                writeErrors([JSON.stringify(error)]);
            });


    }
});

document.querySelector('#btn-logout').addEventListener('click', (fe) => {
    if(confirm('Are you sure you want to logout?')){
        localStorage.removeItem('jwt');
        errorWrapper.innerHTML = '';
        tableWrapper.innerHTML = '';
    }
});

document.querySelector('#btn-get-orderds').addEventListener('click', (fe) => {
    console.log('Get orders detected!');

    writeOrders((err, table) => {
        if(err){
            writeErrors(err);
        } else {
            errorWrapper.innerHTML = '';
            tableWrapper.innerHTML = table;
        }
    });

});

const tableWrapper = document.querySelector('#orders-table-wrapper');
const errorWrapper = document.querySelector('#error-wrapper');