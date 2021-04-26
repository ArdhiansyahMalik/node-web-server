const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: Objek yang berisikan informasi terkait permintaan
 * @param response: Objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end('<h1>Ini adalah Halaman Homepage!</h1>');
        } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak bisa diakses dengan ${method} request!</h1>`);
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end('<h1>Ini adalah Halaman About!</h1>');
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1`);
            });
        } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak bisa diakses dengan ${method} request!</h1>`);
        }
        // TODO3
    } else {
        response.statusCode = 404;
        response.end('<h1>Halaman Tidak Ditemukan!</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 2000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})