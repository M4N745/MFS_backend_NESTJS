import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitTables1689692035309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'covers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'cover',
            type: 'int',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'movies',
      new TableForeignKey({
        columnNames: ['cover'],
        referencedColumnNames: ['id'],
        referencedTableName: 'covers',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.query(`INSERT INTO covers (path) VALUES
            ('cover1.jpg'),
            ('cover2.jpg'),
            ('cover3.jpg'),
            ('cover4.jpg'),
            ('cover5.jpg'),
            ('cover6.jpg'),
            ('cover7.jpg'),
            ('cover8.jpg'),
            ('cover9.jpg'),
            ('cover10.jpg')
        `);
    await queryRunner.query(`INSERT INTO movies (title, cover, description) VALUES
            ('The Maze Runner', 1, 'Thomas is deposited in a community of boys after his memory is erased, soon learning they are all trapped in a maze that will require him to join forces with fellow "runners" for a shot at escape'),
            ('Maze Runner: The Scorch Trials', 2, 'After having escaped the Maze, the Gladers now face a new set of challenges on the open roads of a desolate landscape filled with unimaginable obstacles.'),
            ('Maze Runner: The Death Cure', 3, 'Young hero Thomas embarks on a mission to find a cure for a deadly disease known as "The Flare".'),
            ('The Fast and the Furious', 4, 'Los Angeles police officer Brian O\\'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.'),
            ('The Fast and the Furious: Tokyo Drift', 5, 'A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.'),
            ('Peaky Blinders', 6, 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.'),
            ('The Witcher', 7, 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.'),
            ('The Walking Dead', 8, 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.'),
            ('The Last of Us', 9, 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\\'s last hope.'),
            ('Mr. Robot', 10, 'Elliot, a brilliant but highly unstable young cyber-security engineer and vigilante hacker, becomes a key figure in a complex game of global dominance when he and his shadowy allies try to take down the corrupt corporation he works for.')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies', true);
    await queryRunner.dropTable('covers', true);
    await queryRunner.dropTable('users', true);
  }
}
