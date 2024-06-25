import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateWrestlerDto, ReadWrestlerDto, UpdateWrestlerDto, WrestlerRepository } from '../../domain';


export class LuchadoresController {

    constructor(
        private readonly wrestlerRepository: WrestlerRepository
    ) {}

    public createLuchador = async(req: Request, res: Response) => {

        try {

            const { nombre, estilo, genero, empresa, peso, altura, ciudadNacimiento, aniosLuchador, debut } = req.body;

            const [error, createWrestlerDto] = CreateWrestlerDto.create( req.body );
            if ( error ) return res.status(400).json({ message: error });

            // Se busca primero la empresa a la que se quiere agregar:
            const empresaBusqueda = await prisma.empresas.findFirst({
                where: {
                    abreviatura: empresa
                }
            });
            if ( !empresaBusqueda ) return res.status(404).json({ error: 'Company not found' });

            // Se busca si el luchador ya existe:
            const wrestlerExist = await prisma.luchadores.findFirst({
                where: {
                    nombre
                }
            });
            if ( wrestlerExist ) return res.status(400).json({ message: 'Wrestler already exist' });

            // Validación de fecha:
            let newDebut = debut;
            if ( debut ) {
                newDebut = new Date( debut );
                console.log({ newDebut });
                if ( newDebut.toString() === 'Invalid Date' ) {
                    return res.status(400).json({ message: 'Invalid date Debut, must be a correct date' })
                }
            }

            // Crear el luchador utilizando el DTO y conectando a la empresa:
            const luchador = await prisma.luchadores.create({
                data: {
                    nombre: createWrestlerDto!.nombre,
                    estilo,
                    genero,
                    peso,
                    altura,
                    ciudadNacimiento,
                    aniosLuchador,
                    debut: newDebut,
                    empresa: {
                        connect: {
                            id: empresaBusqueda.id
                        }
                    }
                }
            });

            return res.status(201).json({ luchador });
        } catch (error) {
            console.error('Error en la creación del luchador:', error);
            return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
        }

    }


    public getLuchadores = async(req: Request, res: Response) => {
        // const luchadores = await prisma.luchadores.findMany();
        // if ( luchadores.length === 0 ) return res.status(404).json({ message: 'No hay luchadores que mostrar' });

        const luchadores = await this.wrestlerRepository.getAll();
        return res.json({ luchadores });
    }


    public getLuchadoresByParameters = async(req: Request, res: Response) => {

        try {
            const [error, readWrestlerDto] = ReadWrestlerDto.create( req.body );
            if (error) return res.status(400).json({ error });
            // const { region } = req.body;
    
            const wrestlerByParams = await prisma.luchadores.findMany({
                where: readWrestlerDto?.values
            });
            if ( wrestlerByParams.length === 0 ) return res.status(404).json({ error: 'We don´t have records' });

            return res.json( wrestlerByParams )
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public updateLuchador = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id || isNaN(id) ) return res.status(400).json({ message: 'Id not valid' });

            const luchador = await prisma.luchadores.findUnique({
                where: { id }
            });
            if ( !luchador ) return res.status(400).json({ message: `Wrestler with id ${ id } not exist` });

            const [error, updateWrestlerDto] = UpdateWrestlerDto.create( req.body );
            if ( error ) res.status(400).json({ error });

            // const { nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut } = req.body;
            const wrestlerUpdated = await prisma.luchadores.update({
                where: { id },
                data: updateWrestlerDto!.values
            });

            return res.json( wrestlerUpdated );

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public deleteLuchador = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id || isNaN(id) ) return res.status(400).json({ message: 'Id not valid' });

            await prisma.luchadores.delete({
                where: { id }
            });

            return res.json({ messaje: 'Wrestler successfully deleted' });
        } catch (error: any) {
            console.log(error);
            if ( error.code === 'P2025') {
                return res.status(404).json({ error: error.meta.cause });
            }
            return res.status(500).json({ message: error.meta.cause });
        }        

    }


    public deleteAllWrestlers = async(req: Request, res: Response) => {
        try {
            await prisma.luchadores.deleteMany();
            return res.json({ message: 'Wrestlers deleted successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Something was wrong!!');
        }
    }


}

