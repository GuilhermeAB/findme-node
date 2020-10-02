import { Client } from 'pg';
import {
  sqlInsert, sqlUpdate,
} from 'database/util';
import store from 'src/models/FileModel/File/store/store';
import { MissingPersonType } from '../..';

export default async (missingPerson: MissingPersonType, client: Client): Promise<void> => {
  const {
    id,
    name,
    birthDate,
    disappearanceDate,
    genderId,
    accountId,
    details,
    latLong,
    file,
  } = missingPerson;

  if (!id) {
    let fileGroupId;
    if (file?.name && file?.type) {
      const fileResolve = await store({
        name: file?.name,
        type: file?.type,
      },
      client);

      fileGroupId = fileResolve.fileGroupId;
    }

    await sqlInsert({
      table: 'missing_person',
      values: {
        name: name,
        birth_date: birthDate,
        disappearance_date: disappearanceDate,
        gender_id: genderId,
        account_id: accountId,
        details: details,
        lat_long: latLong,
        file_group_id: fileGroupId,
      },
      client: client,
    });
  } else {
    await sqlUpdate({
      table: 'missing_person',
      values: {
        name: name,
        birth_date: birthDate,
        disappearance_date: disappearanceDate,
        gender_id: genderId,
        account_id: accountId,
        details: details,
        lat_long: latLong,
      },
      where: 'where id = $1',
      whereParams: [id],
      client: client,
    });
  }
};
