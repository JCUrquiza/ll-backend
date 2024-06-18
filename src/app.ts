import { Server } from './presentation/server';
import { envs } from './config/envs';
import { AppRouter } from './presentation/routes';


(() => {
    main();
})();


async function main() {

    const server = new Server({
        port: envs.PORT,
        routes: AppRouter.routes,
    });
    server.start();
}


