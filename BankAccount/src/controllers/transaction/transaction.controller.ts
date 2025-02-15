import {
    Body,
    Controller,
    Param,
    Post,
    Get,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './../../Services/transaction/transaction.service';
import { TransactionDTO } from 'src/Services/transaction/dto/create-transactionDTO';
import { Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('credit')
    @ApiBody({ type: TransactionDTO })
    async credit(@Body() transactionDTO: TransactionDTO, @Res() res: Response) {
        console.log('Recebendo transação:', transactionDTO);

        const { accountNumber, amount, counterpartyBankCode, counterpartyBankName } = transactionDTO;

        try {
            const transaction = await this.transactionService.processCredit(
                accountNumber,
                amount,
                counterpartyBankCode,
                counterpartyBankName,
                
            );

            if (!transaction) {
                console.log('Erro ao processar crédito');
                return res.status(HttpStatus.BAD_REQUEST).send('Erro ao processar crédito');
            }

            return res.status(HttpStatus.CREATED).json(transaction);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Erro interno no servidor');
        }
    }

    @Post('debit')
    @ApiBody({ type: TransactionDTO })
    async debit(@Body() transactionDTO: TransactionDTO, @Res() res: Response) {
        const { accountNumber, amount, counterpartyBankCode, counterpartyBankName } = transactionDTO;

        const transaction = await this.transactionService.processDebit(
            accountNumber,
            amount,
            counterpartyBankCode,
            counterpartyBankName
        );

        if (!transaction) {
            return res.status(HttpStatus.BAD_REQUEST).send('Erro ao processar débito');
        }

        return res.status(HttpStatus.CREATED).json(transaction);
    }

    @Get(':transactionId')
    async findTransactionById(
        @Param('transactionId') transactionId: string,
        @Res() res: Response,
    ) {
        const transaction = await this.transactionService.findTransactionById(transactionId);

        if (!transaction) {
            return res.status(HttpStatus.NOT_FOUND).send('Transação não encontrada');
        }

        return res.status(HttpStatus.OK).json(transaction);
    }


    @Get('account/:accountNumber/transactions')
    async findTransactionsByAccount(
        @Param('accountNumber') accountNumber: string,
        @Res() res: Response,
    ) {
        const transactions = await this.transactionService.findTransactionsByAccount(accountNumber);

        if (!transactions.length) {
            return res.status(HttpStatus.NOT_FOUND).send('Nenhuma transação encontrada');
        }

        return res.status(HttpStatus.OK).json(transactions);
    }

    @Get('transactions/by-document/:document')
    async findTransactionsByDocument(
        @Param('document') document: string,
        @Res() res: Response,
    ) {
        const transactions = await this.transactionService.findTransactionsByDocument(document);

        if (!transactions.length) {
            return res.status(HttpStatus.NOT_FOUND).send('Nenhuma transação encontrada para esse titular');
        }

        return res.status(HttpStatus.OK).json(transactions);
    }
}
