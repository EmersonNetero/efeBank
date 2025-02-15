import { Controller, HttpStatus, Post, Res } from '@nestjs/common';

import express, { Response } from 'express';
import { TransactionService } from './../../Services/transaction/transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async debitoTransaction(@Res() res: Response) {
        const r = this.transactionService.crediteTransaction();

        return res.status(HttpStatus.OK).json({ status: r });
    }
}
