import { Injectable } from '@nestjs/common';

import { PrismaService } from './../../Database/prisma.service';
import { BankAccountDTO } from './dto/bankAccountDTO';

@Injectable()
export class BankAccountService {
    constructor(private prisma: PrismaService) {}

    async create(data: BankAccountDTO): Promise<any> {
        data.number = await this.generateUniqueAccountNumber();

        const bankAccount = await this.prisma.bankAccounts.create({
            data,
        });

        return bankAccount;
    }

    async findAccount(accountNumber: string) {
        const account = await this.prisma.bankAccounts.findUnique({
            where: { number: accountNumber },
        });

        return account;
    }

    async findByBranch(branch: string) {
        const accounts = await this.prisma.bankAccounts.findMany({
            where: { branch: branch },
        });

        return accounts;
    }

    async generateUniqueAccountNumber(): Promise<string> {
        let accountNumber: string;
        let exists: boolean;

        do {
            accountNumber = this.generateRandomAccountNumber();
            exists =
                (await this.prisma.bankAccounts.findUnique({
                    where: { number: accountNumber },
                })) !== null;
        } while (exists);

        return accountNumber;
    }

    private generateRandomAccountNumber(): string {
        const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Entre 5 e 10 caracteres
        return Array.from({ length }, () =>
            Math.floor(Math.random() * 10),
        ).join('');
    }
}
