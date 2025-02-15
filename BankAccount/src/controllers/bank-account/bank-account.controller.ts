import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { BankAccountDTO } from 'src/Services/bank-account/dto/bankAccountDTO';
import { BankAccountService } from './../../Services/bank-account/bank-account.service';
import express, { Response } from 'express';

@Controller('bank-account')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Post()
    async create(@Body() data: BankAccountDTO, @Res() res: Response) {
        const account = await this.bankAccountService.create(data);

        return res.status(HttpStatus.CREATED).json(account);
    }

    @Get('findByNumber/:accountNumber')
    async findByNumber(
        @Param('accountNumber') accountNumber: string,
        @Res() res: Response,
    ) {
        const account =
            await this.bankAccountService.findAccount(accountNumber);
        if (!account) {
            return res.status(HttpStatus.BAD_REQUEST).send('Account not found');
        }

        return res.status(HttpStatus.OK).json(account);
    }

    @Get('findByBranch/:branch')
    async findAllByBranch(
        @Param('branch') branch: string,
        @Res() res: Response,
    ) {
        const accounts = await this.bankAccountService.findByBranch(branch);
        if (accounts.length == 0) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send('no account found / nenhuma conta foi encontrada');
        }
        return res.status(HttpStatus.OK).json(accounts);
    }
}
