///////////////////////////////////////////////////////////////////////////////

function storeFilesToModules(dir) {
    const fs = require("fs");
    const DEPLOY_SCRIPT = "deploy.js";
    const CREDENTIALS = "Credentials.js";
    const README = "README.md";
    const GITDIR = ".git"

    let modules = {};

    fs.readdirSync(dir).forEach(fileName => {
        const filePath = dir + "/" + fileName;
        stat = fs.statSync(filePath);

        if (fileName == DEPLOY_SCRIPT
        ||  fileName == CREDENTIALS
        ||  fileName == README
        ||  fileName == GITDIR) {
        }
        else if (stat && stat.isDirectory()) {
            const subdirModules = storeFilesToModules(filePath);
            modules = {...modules, ...subdirModules};
        }
        else {
            const fileNameNoExtension = fileName.split(".").slice(0, -1).join();
            modules[fileNameNoExtension] = fs.readFileSync(filePath, "utf8");
        }
    });

    return modules;
}

///////////////////////////////////////////////////////////////////////////////

function send(modules) {
    const credentials = require("./Credentials.js");

    const EMAIL = credentials.email;
    const PASSWORD = credentials.password;
    const HOSTNAME = "screeps.com";
    const PORT = 443;
    const SERVER_PATH = "/api/user/code";

    const data = {
        branch: process.argv[2],
        modules
    }

    const https = require("https");
    const req = https.request({
        hostname: HOSTNAME,
        port: PORT,
        path: SERVER_PATH,
        method: "POST",
        auth: EMAIL + ":" + PASSWORD,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });

    req.write(JSON.stringify(data));
    req.end();
}

///////////////////////////////////////////////////////////////////////////////

const modules = storeFilesToModules(".");
send(modules);

///////////////////////////////////////////////////////////////////////////////
