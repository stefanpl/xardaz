import { createWriteStream } from 'fs';
import Axios from 'axios';
import { AbsolutePath } from './types';

export async function downloadFile(
  url: string,
  path: AbsolutePath
): Promise<void> {
  const writer = createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
