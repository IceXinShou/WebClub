import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        host: '0.0.0.0',
        port: 25567,
    },
    build: {
        target: 'esnext',
        outDir: '../Public',
    },
    experimental: {
        renderBuiltUrl(filename, {hostType, type}) {
            console.log("./Public/"+filename)
            // if (type === 'public') {
            //     return 'https://www.domain.com/' + filename
            // } else if (path.extname(importer) === '.js') {
            //     return {runtime: `window.__assetsPath(${JSON.stringify(filename)})`}
            // } else {
            //     return 'https://cdn.domain.com/assets/' + filename
            // }
            return './Public/' + filename;
        }
    },
});
