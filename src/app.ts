import { PrismaClient } from '@prisma/client';


(() => {
    main();
})();


async function main() {

    const prisma = new PrismaClient();

    const empresa = await prisma.empresas.create({
        data: {
            nombre: 'Consejo Mundial de Lucha Libre'
        }
    });

    console.log({ empresa });

}


