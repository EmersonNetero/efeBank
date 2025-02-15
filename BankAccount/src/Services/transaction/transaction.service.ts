import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../Database/prisma.service';
import { TransactionType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Decimal } from 'decimal.js';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) {}

    async processCredit(
        accountNumber: string, 
        amount: string, 
        counterpartyBankCode: string, 
        counterpartyBankName: string
    ) {
        if (!accountNumber) {
            throw new Error('Número da conta é obrigatório');
        }

        if (isNaN(Number(amount)) || parseFloat(amount) <= 0) {
            throw new Error('Valor de transação inválido');
        }

        const account = await this.findAccount(accountNumber);

        return await this.prisma.$transaction(async (prisma) => {
            const createdTransaction = await prisma.transactions.create({
                data: {
                    type: TransactionType.CREDIT,
                    amount: new Decimal(amount),
                    bankAccountId: account.id,
                    counterpartyBankCode,
                    counterpartyBankName,
                    counterpartyAccountNumber: account.number,
                    counterpartyHolderName: account.holderName,
                    counterpartyHolderType: account.holderType,
                    counterpartyHolderDocument: account.holderDocument,
                    counterpartyAccountType: 'CURRENT',
                    counterpartyBranch: '001', 
                },
            });

            await prisma.balances.update({
                where: { bankAccountId: account.id },
                data: {
                    availableAmount: { increment: new Decimal(amount) },
                },
            });

            return createdTransaction;
        });
    }

    async processDebit(
        accountNumber: string, 
        amount: string, 
        counterpartyBankCode: string, 
        counterpartyBankName: string
    ) {
        if (!accountNumber) {
            throw new Error('Número da conta é obrigatório');
        }

        if (isNaN(Number(amount)) || parseFloat(amount) <= 0) {
            throw new Error('Valor de transação inválido');
        }

        const account = await this.findAccount(accountNumber);

        if (!account || !account.Balance) {
            throw new Error('Conta ou saldo não encontrado');
        }

        const availableAmount = new Prisma.Decimal(account.Balance.availableAmount); 
        const amountToDebit = new Prisma.Decimal(amount);

        if (availableAmount.lessThan(amountToDebit)) {
            throw new Error('Saldo insuficiente');
        }

        return await this.prisma.$transaction(async (prisma) => {
            const createdTransaction = await prisma.transactions.create({
                data: {
                    type: TransactionType.DEBIT,
                    amount: amountToDebit,
                    bankAccountId: account.id,
                    counterpartyBankCode,
                    counterpartyBankName,
                    counterpartyAccountNumber: account.number,
                    counterpartyHolderName: account.holderName,
                    counterpartyHolderType: account.holderType,
                    counterpartyHolderDocument: account.holderDocument,
                    counterpartyAccountType: 'CURRENT',
                    counterpartyBranch: '001', 
                },
            });

            await prisma.balances.update({
                where: { bankAccountId: account.id },
                data: {
                    availableAmount: availableAmount.sub(amountToDebit), 
                },
            });

            return createdTransaction;
        });
    }

    async findTransactionById(transactionId: string) {
      return await this.prisma.transactions.findUnique({
          where: { id: Number(transactionId) }, 
      });
  }
  

    async findTransactionsByAccount(accountNumber: string) {
      return await this.prisma.transactions.findMany({
          where: { BankAccount: { number: accountNumber } }, 
          orderBy: { createdAt: 'desc' },
      });
  }
  
  async findTransactionsByDocument(document: string) {
      return await this.prisma.transactions.findMany({
          where: {
              BankAccount: {
                  holderDocument: document, 
              },
          },
          orderBy: { createdAt: 'desc' },
      });
  }

    private async findAccount(accountNumber: string) {
        const account = await this.prisma.bankAccounts.findUnique({
            where: { number: accountNumber },
            include: { Balance: true },
        });

        if (!account || account.status !== 'ACTIVE') {
            throw new Error('Conta não encontrada ou não está ativa');
        }

        return account;
    }
}
