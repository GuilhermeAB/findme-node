import { Client } from 'pg';
import { sqlInsert, sqlUpdate } from 'src/database/util';
import { FileType } from '../..';
import store from '../../FileGroup/store/store';

export default async (file: FileType, client: Client): Promise<FileType> => {
  const {
    id,
    name,
    type,
  } = file;

  let { fileGroupId } = file;
  if (!fileGroupId) {
    fileGroupId = await store(client);
  }

  let resolve;
  if (!id) {
    resolve = await sqlInsert({
      table: 'file',
      values: {
        file_group_id: fileGroupId,
        name: name,
        file_type: type,
      },
      client: client,
    });
  } else {
    resolve = await sqlUpdate({
      table: 'file',
      values: {
        file_group_id: fileGroupId,
        name: name,
        file_type: type,
      },
      where: 'where id = $1',
      whereParams: [id],
      client: client,
    });
  }

  return {
    id: resolve.id,
    name: resolve.name,
    type: resolve.file_type,
    fileGroupId: resolve.file_group_id,
  };
};
