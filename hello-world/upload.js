const { join } = require('path');
const { existsSync } = require('fs');

// Terminal colors
const redText = '\x1b[31m';
const cyanText = '\x1b[36m';
const resetText = '\x1b[0m';

// Error helper function
const err = (e, c = 1) => {
    console.error(`${redText}[ERROR]:${resetText} ${e}`);
    process.exit(c);
};

/** @type {typeof import('open').default} */
let open = null;
try {
    // open is used to run the fmp:// protocol
    open = require('open').default;
} catch {
    err("The 'open' package is required to run this script. Please run 'npm install open' first.");
}

// Ensure the HTML file has been built
const htmlPath = join('dist', 'index.html');
if (!existsSync(htmlPath))
    err("dist/index.html does not exist! Make sure to run 'npm run build' first.");

// Ensure meta.json exists
if (!existsSync('meta.json'))
    err("meta.json not found!");

const meta = require('./meta.json');
const {
    moduleName,
    uploadScript,
    fmpFile,
    server: metaServer,
    ["optional:server"]: _,
    ...additionalJson
} = meta;

// Validate meta.json
if (typeof moduleName !== 'string')
    err("meta.json requires a valid moduleName");

if (typeof uploadScript !== 'string')
    err("meta.json requires a valid uploadScript");

if (typeof fmpFile !== 'string')
    err("meta.json requires a valid fmpFile");

const server = String(metaServer || '$');

// JSON parameters to pass to the script
// Any values inside meta.json not used by this JavaScript file will be passed to the FileMaker script
const scriptParams = {
    moduleName,
    htmlPath: join(process.cwd(), htmlPath),
    ...additionalJson
}

// Construct the fmp:// URL
const fmpBase = `fmp://${server}/${fmpFile}`
const fmpUrl = `${fmpBase}?script=${uploadScript}&param=${encodeURIComponent(JSON.stringify(scriptParams))}`;

console.log(`${cyanText}[INFO]${resetText}: Uploading the HTMl file to ${
    server === '$' ? 'the currently open FileMaker file' : server
}`);

open(fmpUrl, { wait: true }).then(childProcess => {
    if (childProcess.exitCode === 0) {
        console.log(`${cyanText}[INFO]${resetText}: Script was successfully called`);
        process.exit(0);
    }

    else
        err("Script call gave a non-zero exit code", childProcess.exitCode)
});