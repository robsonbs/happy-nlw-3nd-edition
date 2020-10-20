import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnConfirmedInOrphanage1603045324863
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'status',
        type: 'boolean',
        default: 'false',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'status');
  }
}
