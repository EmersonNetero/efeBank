import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res,
} from '@nestjs/common';
import { BankAccountDTO } from 'src/Services/bank-account/dto/bankAccountDTO';
import { BankAccountService } from './../../Services/bank-account/bank-account.service';
import { UpdateStatusDTO } from 'src/Services/bank-account/dto/update-statusDTO';
import { UpdateEmailDTO } from 'src/Services/bank-account/dto/update-emailDTO';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { AccountStatus } from '@prisma/client';

@Controller('bank-account')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Post()
    @ApiBody({
        type: BankAccountDTO,
    })
    async create(@Body() data: BankAccountDTO, @Res() res: Response) {
        const account = await this.bankAccountService.create(data);
        return res.status(HttpStatus.CREATED).json(account);
    }

    @Get('findByNumber/:accountNumber')
    async findByNumber(@Param('accountNumber') accountNumber: string, @Res() res: Response) {
        const account = await this.bankAccountService.findAccount(accountNumber);
    
        if (!account) {
            return res.status(HttpStatus.NOT_FOUND).send('Conta não encontrada');
        }

        const { Balance, ...accountWithoutBalance } = account;
    
        return res.status(HttpStatus.OK).json(accountWithoutBalance);
    }
    
    @Get('findByBranch/:branch')
    async findAllByBranch(@Param('branch') branch: string, @Res() res: Response) {
        const accounts = await this.bankAccountService.findByBranch(branch);
        if (accounts.length == 0) {
            return res.status(HttpStatus.NOT_FOUND).send('Nenhuma conta encontrada');
        }
        return res.status(HttpStatus.OK).json(accounts);
    }

    @Get('findByHolder/:document')
    async findByHolder(@Param('document') document: string, @Res() res: Response) {
        const accounts = await this.bankAccountService.findByHolder(document);
        if (!accounts.length) {
            return res.status(HttpStatus.NOT_FOUND).send('Nenhuma conta encontrada para esse titular');
        }
        return res.status(HttpStatus.OK).json(accounts);
    }

    @Patch('updateEmail/:accountNumber')
    @ApiParam({ name: 'accountNumber'})
    @ApiBody({
        type: UpdateEmailDTO,
    })
    async updateEmail(
        @Param('accountNumber') accountNumber: string,
        @Body() updateEmailDto: UpdateEmailDTO,
        @Res() res: Response,
    ) {
        const { email } = updateEmailDto;

        const account = await this.bankAccountService.findAccount(accountNumber);
        if (!account) {
            return res.status(HttpStatus.NOT_FOUND).send('Conta não encontrada');
        }

        try {
            const updated = await this.bankAccountService.updateEmail(accountNumber, email);
            return res.status(HttpStatus.OK).json(updated);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Erro ao atualizar o email');
        }
    }

    @Patch(':accountNumber/status')
    @ApiParam({ name: 'accountNumber', description: 'Número da conta bancária' })
    @ApiBody({
        type: UpdateStatusDTO,
    })
    async updateStatus(
        @Param('accountNumber') accountNumber: string,
        @Body('status') status: AccountStatus,
        @Res() res: Response
    ) {
        if (!Object.values(AccountStatus).includes(status)) {
            return res.status(HttpStatus.BAD_REQUEST).send('Status inválido.');
        }

        return await this.bankAccountService.updateStatus(accountNumber, status);
    }

    @Get(':accountNumber/balance')
    async getBalance(@Param('accountNumber') accountNumber: string, @Res() res: Response) {
      const account = await this.bankAccountService.findAccount(accountNumber);
    
      if (!account || !account.Balance) {
        return res.status(HttpStatus.NOT_FOUND).send('Conta ou saldo não encontrado');
      }
    
      return res.status(HttpStatus.OK).json({
        availableAmount: account.Balance.availableAmount,
        blockedAmount: account.Balance.blockedAmount,
      });
    }

    @Patch(':accountNumber/hold')
    async holdAmount(@Param('accountNumber') accountNumber: string, @Body('amount') amount: number, @Res() res: Response) {
        try {
            const account = await this.bankAccountService.findAccount(accountNumber);
            if (!account) {
                return res.status(HttpStatus.NOT_FOUND).send('Conta não encontrada');
            }

            const updatedAccount = await this.bankAccountService.holdAmount(accountNumber, amount);
            return res.status(HttpStatus.OK).json(updatedAccount);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }
    
    @Patch(':accountNumber/release')
    async releaseAmount(@Param('accountNumber') accountNumber: string, @Body('amount') amount: number, @Res() res: Response) {
        try {
            const account = await this.bankAccountService.findAccount(accountNumber);
            if (!account) {
                return res.status(HttpStatus.NOT_FOUND).send('Conta não encontrada');
            }
            
            const updatedAccount = await this.bankAccountService.releaseAmount(accountNumber, amount);
            return res.status(HttpStatus.OK).json(updatedAccount);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }
    
    @Delete(':accountNumber')
    async closeAccount(@Param('accountNumber') accountNumber: string, @Res() res: Response) {
        const closed = await this.bankAccountService.closeAccount(accountNumber);
        if (!closed) {
            return res.status(HttpStatus.NOT_FOUND).send('Conta não encontrada');
        }
        return res.status(HttpStatus.OK).send('Conta encerrada com sucesso');
    }
}
