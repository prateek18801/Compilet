const { spawn } = require('child_process');

const PATH = require('path').join(require.main.filename, '..', 'code');

function cpp(FILENAME, input) {
    const promise = new Promise((resolve, reject) => {
        let data = '';

        const child = spawn(`cd ${PATH} && g++ ${FILENAME}.cpp -o ${FILENAME} && ${FILENAME}.exe`, { shell: true });

        setTimeout(() => {
            child.stdin.end();
            child.stdout.end();
            child.stderr.end();
            child.kill();
            resolve('time limit exceeded');
        }, 5000);

        child.stdin.write(input);
        
        child.stdout.on('data', chunk => data += chunk);
        
        child.stdout.on('end', () => resolve(data));

        child.on('exit', (code, signal) => {
            code && resolve(`compilation error: proccess exited with error code ${code}`);
            signal && resolve(`compilation error: proccess exited with signal ${signal}`);
        });
    });
    return promise;
}

function c(FILENAME, input) {
    const promise = new Promise((resolve, reject) => {
        let data = '';

        const child = spawn(`cd ${PATH} && gcc ${FILENAME}.c -o ${FILENAME} && ${FILENAME}.exe`, { shell: true });

        child.stdin.write(input);
        child.stdin.end();

        child.stdout.on('data', chunk => data += chunk);
        
        child.stdout.on('end', () => resolve(data));

        child.on('exit', (code, signal) => {
            code && reject(`compilation error: proccess exited with error code ${code}`);
            signal && reject(`compilation error: proccess exited with signal ${signal}`);
        });
    });
    return promise;
}

function java(FILENAME, input) {

}

function py(FILENAME, input) {
    const promise = new Promise((resolve, reject) => {
        let data = '';

        const child = spawn(`cd ${PATH} && python ${FILENAME}.py`, { shell: true });

        child.stdin.write(input);
        child.stdin.end();

        child.stdout.on('data', chunk => data += chunk);
        
        child.stdout.on('end', () => resolve(data));

        child.on('exit', (code, signal) => {
            code && reject(`compilation error: proccess exited with error code ${code}`);
            signal && reject(`compilation error: proccess exited with signal ${signal}`);
        });
    });
    return promise;
}

module.exports = { c, cpp, java, py };