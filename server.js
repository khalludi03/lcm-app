import http from 'node:http';

function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (!x || !y || !/^[1-9]\d*$/.test(x) || !/^[1-9]\d*$/.test(y)) {
    res.end('NaN');
    return;
  }
  const result = lcm(Number(x), Number(y));
  res.end(result.toString());
}).listen(process.env.PORT || 3000);