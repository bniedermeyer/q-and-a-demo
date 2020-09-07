// Add simple, fast, scalable persistence: https://docs.begin.com/en/data/begin-data/
// let data = require('@begin/data')

// Add secure sessions, middleware, and more: https://docs.begin.com/en/functions/http/
// let arc = require('@architect/functions')

// TODO: modify the body object!
let body = `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Hi!</title>
    <script type="module">
      import { defineCustomElements } from 'https://cdn.jsdelivr.net/npm/@bniedermeyer/q-and-a/loader/index.es2017.js';
      defineCustomElements(); 
    </script>
    <script nomodule src='https://unpkg.com/@bniedermeyer/q-and-a/dist/q-and-a/q-and-a.js'></script>
  </head>
  <body>
  <div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">

  <h1>Q&A Demo</h1>

  <q-and-a user-id="my-user" correlation-id="my-id"></q-and-a>
  
  </div>

  </body>
</html>
`;

exports.handler = async function http(req) {
  return {
    headers: {
      "content-type": "text/html; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body,
  };
};

// Example responses

/* Forward requester to a new path
exports.handler = async function http (req) {
  return {
    statusCode: 302,
    headers: {'location': '/about'}
  }
}
*/

/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/

/* Deliver client-side JS
exports.handler = async function http (req) {
  return {
    headers: {'content-type': 'text/javascript; charset=utf8'},
    body: 'console.log("Hello world!")',
  }
}
*/
