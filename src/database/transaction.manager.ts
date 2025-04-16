import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionManager {
  constructor(private dataSource: DataSource) {}

  async runInTransaction<T>(operation: (manager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
