const http = require("http");
const { VM } = require("vm2");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/run") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const { code } = JSON.parse(body);
                const vm = new VM({
                    timeout: 1000,
                    sandbox: {}
                });

                const result = vm.run(code);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ output: String(result) }));
            } catch (err) {
                res.end(JSON.stringify({ error: String(err?.message || "unknown error") }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("not found");
    }
});

server.listen(PORT, () => {
    console.log(`eval server running on port ${PORT}`);
});
