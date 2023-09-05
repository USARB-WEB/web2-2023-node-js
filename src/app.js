const http = require('http');
const { parse } = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const students = [
    {
        "id": 1,
        "idnp": "1234567890123",
        "first_name": "Ion",
        "last_name": "Creanga",
        "birth_date": "2000-12-23",
        "average_mark": 9.99,
        "residence_address": "mun. Balti, str. Puskin 38, aud. 516",
        "location_id": 1,
        "created_at": "2023-09-05 08:55:13",
        "created_by": 1
    },
    {
        "id": 2,
        "idnp": "1234567890123",
        "first_name": "Mihai",
        "last_name": "Eminescu",
        "birth_date": "2000-12-23",
        "average_mark": 9.99,
        "residence_address": "mun. Balti, str. Puskin 38, aud. 516",
        "location_id": 1,
        "created_at": "2023-09-05 08:55:13",
        "created_by": 1
    }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/students' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(students));
    }else if (req.url.includes('/students/') && req.method === 'GET') {
        res.statusCode = 200;
        const urlParts = req.url.split('/')
        const studentId = Number(urlParts[urlParts.length - 1])
        const student = students.find(student => student.id === studentId )
        if(student){
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (req.url === '/students' && req.method === 'POST') {
        const chunks = [];
        req.on("data", (chunk) => {
            chunks.push(chunk);
        });
        req.on("end", () => {
            res.end(chunks.join(''));
        });
    } else if(req.url.includes('/students/') && req.method === 'DELETE'){
        res.end('DELETED');
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});