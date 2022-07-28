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
            if (!filename.startsWith('.'))
                return 'https://iceleiyu.github.io/WebClub/Public/' + filename;
            else
                return filename;
        }
    },
});
