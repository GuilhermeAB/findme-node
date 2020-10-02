import { Client } from 'pg';
import { t } from 'database/transaction';
import { ErrorAlertHandler } from 'src/util/request/handler';
import getAll from 'src/models/MissingPersonModel/MissingPerson/get/getAll';

export default async (req: any, res: any, next: any): Promise<any> => {
  try {
    return await t(async (client: Client) => {
      try {
        const resolve = await getAll(client);

        return res.status(200).json({
          list: resolve.list,
        });
      } catch (e) {
        return res.status(401).json({
          messages: {
            errors: [e.message],
          },
        });
      }
    });
  } catch (e) {
    ErrorAlertHandler(`[MissingPersonController] Missing person getAll: ${e.message}`, e.stack);

    next(e);
    return res.status(500).json({
      messages: {
        errors: ['Lamentamos o transtorno, ocorreu um erro interno no sistema. Nossa equipe já foi notificada. Caso o erro persista, entre em contato conosco'],
      },
    });
  }
};
