import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsForgetTokenAndExpiresToken1603356887650
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'forgot_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'expires_token',
        type: 'timestamptz',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn('users', 'forgot_token'),
      queryRunner.dropColumn('users', 'expires_token'),
    ]);
  }
}
