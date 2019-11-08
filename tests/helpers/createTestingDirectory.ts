import { dir as createTmpDir } from 'tmp-promise';
import { join } from 'path';
import { AbsolutePath } from '../../src/types';
import { mkdirAsync, writeUtf8File } from '../../src/fileSystem';

// TODO: Would be awesome if this function could parse a tree structure like this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const structure = `
photos
├── summer
│   └── june
│       └── windsurf.jpg
└── winter
    └── january
        ├── ski.png
        ├── snow.png
        └── snowboard.jpg
`;

export async function createTestingDirectory(): Promise<AbsolutePath> {
  const testDir = (await createTmpDir()).path;
  const foldersToCreate = [
    join(testDir, 'photos'),
    join(testDir, 'photos', 'summer'),
    join(testDir, 'photos', 'summer', 'june'),
    join(testDir, 'photos', 'winter'),
    join(testDir, 'photos', 'winter', 'january'),
  ];
  const filesToCreate = [
    join(foldersToCreate[2], 'windsurf.jpg'),
    join(foldersToCreate[4], 'ski.png'),
    join(foldersToCreate[4], 'snow.png'),
    join(foldersToCreate[4], 'snowboard.jpg'),
  ];
  // Folders need to be created in sequence, that's why we use a for loop.
  for (let index = 0; index < foldersToCreate.length; index++) {
    const folder = foldersToCreate[index];
    await mkdirAsync(folder); // eslint-disable-line
  }
  await Promise.all(filesToCreate.map(file => writeUtf8File(file)));
  return testDir;
}
