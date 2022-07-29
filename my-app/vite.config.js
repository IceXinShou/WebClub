import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
import fs from 'fs';

const projectName = 'WebClub';
const outputRoot = 'docs';
const dynamicImportFiles = [
    './Page/data'
];

export default defineConfig({
    plugins: [solidPlugin(), buildParser(dynamicImportFiles)],
    assetsInclude: './Page/data/*.html',
    server: {
        host: '0.0.0.0',
        port: 25567,
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        emptyOutDir: true,
        outDir: path.join('..', outputRoot),
    },
    experimental: {
        renderBuiltUrl(filename, {hostType, type}) {
            return path.join('/', projectName, filename).replace(/\\/g,'/');
        }
    },
});

function buildParser(dynamicImportFiles) {
    return {
        name: 'parser',
        buildEnd() {
            const rootFolder = path.join('../', outputRoot);
            const assetsFolder = path.join(rootFolder, '/assets');
            setTimeout(function () {
                replace();
                for (const i of dynamicImportFiles) {
                    copyFolder(path.join(projectName, i), path.join(rootFolder, i));
                }
            }, 600);

            function copyFolder(src, dest) {
                const exists = fs.existsSync(src);
                const stats = exists && fs.statSync(src);
                const isDirectory = exists && stats.isDirectory();
                if (isDirectory) {
                    fs.mkdirSync(dest, {recursive: true});
                    fs.readdirSync(src).forEach(function (childItemName) {
                        fs.copyFileSync(
                            path.join(src, childItemName),
                            path.join(dest, childItemName)
                        );
                    });
                } else {
                    fs.mkdirSync(path.dirname(dest), {recursive: true});
                    fs.copyFileSync(src, dest);
                }
            }

            function replace() {
                fs.readdirSync(assetsFolder).forEach(file => {
                    if (!file.endsWith('.js')) return;
                    const fileName = path.join(assetsFolder, file);
                    try {
                        fs.readFile(fileName, "utf-8", (err, data) => {
                            const out = data.replace(/(?!(\[,))"assets\//g, `"${projectName}/assets/`);
                            fs.writeFileSync(fileName, out);
                        });
                    } catch (err) {
                        console.error(err);
                    }
                });
            }
        }
    }
}