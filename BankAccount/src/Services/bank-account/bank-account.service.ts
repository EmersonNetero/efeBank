import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../Database/prisma.service';
import { BankAccountDTO } from './dto/bankAccountDTO';
import { AccountStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankAccountService {
    constructor(private prisma: PrismaService) {}

    async create(data: BankAccountDTO): Promise<any> {
        data.number = await this.generateUniqueAccountNumber();

        const bankAccount = await this.prisma.bankAccounts.create({
            data,
        });

        await this.prisma.balances.create({
          data: {
            bankAccountId: bankAccount.id,
            availableAmount: 0, 
            blockedAmount: 0,
          },
        });
    
        return bankAccount;
      }

      async findAccount(accountNumber: string) {
        return await this.prisma.bankAccounts.findUnique({
          where: { number: accountNumber },
          include: {
            Balance: true, 
          },
        });
      }
    async findByBranch(branch: string) {
        return await this.prisma.bankAccounts.findMany({ where: { branch } });
    }

    async findByHolder(document: string) {
        return await this.prisma.bankAccounts.findMany({ where: { holderDocument: document } });
    }

    async updateEmail(accountNumber: string, email: string) {
        return await this.prisma.bankAccounts.update({
            where: { number: accountNumber },
            data: { holderEmail: email },
        });
    }


    async updateStatus(accountNumber: string, status: AccountStatus) {
        return await this.prisma.bankAccounts.update({
            where: { number: accountNumber },
            data: { status },
        });
    }

    async closeAccount(accountNumber: string) {
        return await this.prisma.bankAccounts.update({
            where: { number: accountNumber },
            data: { status: 'FINISHED' },
        });
    }

    async holdAmount(accountNumber: string, amount: number) {
        const account = await this.prisma.bankAccounts.findUnique({
            where: { number: accountNumber },
            include: { Balance: true },
        });
    
        if (!account || !account.Balance) {
            throw new Error('Conta ou saldo não encontrado');
        }
    
        const availableAmount = new Prisma.Decimal(account.Balance.availableAmount);
        const amountToHold = new Prisma.Decimal(amount);
    
        if (availableAmount.lessThan(amountToHold)) {
            throw new Error('Saldo insuficiente');
        }
    
        const updatedBalance = await this.prisma.balances.update({
            where: { bankAccountId: account.id },
            data: {
                availableAmount: availableAmount.sub(amountToHold),
                blockedAmount: account.Balance.blockedAmount.add(amountToHold),
            },
        });
    
        return { ...account, Balance: updatedBalance };
    }
    

    async releaseAmount(accountNumber: string, amount: number) {
        const account = await this.prisma.bankAccounts.findUnique({
            where: { number: accountNumber },
            include: { Balance: true },
        });
    
        if (!account || !account.Balance) {
            throw new Error('Conta ou saldo não encontrado');
        }
    
        const blockedAmount = new Prisma.Decimal(account.Balance.blockedAmount);
        const amountToRelease = new Prisma.Decimal(amount);

        if (blockedAmount.lessThan(amountToRelease)) {
            throw new Error('Saldo bloqueado insuficiente');
        }

        const updatedBalance = await this.prisma.balances.update({
            where: { bankAccountId: account.id },
            data: {
                availableAmount: account.Balance.availableAmount.add(amountToRelease),  
                blockedAmount: blockedAmount.sub(amountToRelease), 
            },
        });

        return { ...account, Balance: updatedBalance };
    }
    



    async generateUniqueAccountNumber(): Promise<string> {
        let accountNumber: string;
        let exists: boolean;
        do {
            accountNumber = this.generateRandomAccountNumber();
            exists = (await this.prisma.bankAccounts.findUnique({ where: { number: accountNumber } })) !== null;
        } while (exists);
        return accountNumber;
    }

    private generateRandomAccountNumber(): string {
        const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }
}
