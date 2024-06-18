import { Request, Response } from 'express';


export class LuchadoresController {

    constructor() {}

    public getLuchadores = (req: Request, res: Response) => {

        res.json([
            { id: 1, nombre: 'Último Guerrero', estilo: 'rudo' },
            { id: 2, nombre: 'Místico', estilo: 'técnico' },
            { id: 3, nombre: 'Atlantis', estilo: 'técnico' },
        ])

    }

}

