import { Response } from "express";


export function successResponse(message: string, DATA: any, res: Response) {
    res.status(200).json({
        status: 'SUCCESS',
        message,
        data: DATA
    })
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(200).json({
        status: 'FAILURE'
    })
}

export function insufficientParameters(res: Response) {
    res.status(400).json({
        status: 'FAILURE',
        message: 'Insufficient Parameters',
        data: {}
    })
}

export function mongoError(err: any, res: Response) {
    res.status(500).json({
        status: 'FAILURE',
        message: 'MongoDB error',
        data: err,
    });
}