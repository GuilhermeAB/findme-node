import { Client } from 'pg';
import { ErrorAlertHandler } from 'util/request/handler';
import { t } from 'database/transaction';
import store from 'src/models/MissingPersonModel/MissingPerson/store/store';
import { isValid, isAfter } from 'date-fns';
import { sqlQuery } from 'src/database/util';
import { isEmpty } from 'lodash';

export default async (req: any, res: any, next: any): Promise<any> => {
  try {
    return await t(async (client: Client) => {
      const {
        id,
        name,
        birthDate,
        disappearanceDate,
        genderId,
        accountId,
        details,
      } = req.body;

      if (id && Number.isNaN(parseInt(id, 10))) {
        return res.status(500).json({
          messages: {
            errors: ['Identificador da pessoa não é um número inteiro válido'],
          },
        });
      }
      if (!name) {
        return res.status(500).json({
          messages: {
            errors: ['Nome não foi informado'],
          },
        });
      }
      if (name.lenght > 80) {
        return res.status(500).json({
          messages: {
            errors: ['Nome deve possuir menos que 80 caracteres'],
          },
        });
      }
      if (!birthDate) {
        return res.status(500).json({
          messages: {
            errors: ['Data de nascimento deve ser informado'],
          },
        });
      }
      if (!isValid(new Date(birthDate))) {
        return res.status(500).json({
          messages: {
            errors: ['Data de nascimento inválida'],
          },
        });
      }
      if (!disappearanceDate) {
        return res.status(500).json({
          messages: {
            errors: ['Data de nascimento deve ser informado'],
          },
        });
      }
      if (!isValid(new Date(disappearanceDate))) {
        return res.status(500).json({
          messages: {
            errors: ['Data de desaparecimento inválida'],
          },
        });
      }
      if (isAfter(new Date(birthDate), new Date(disappearanceDate))) {
        return res.status(500).json({
          messages: {
            errors: ['Data de nascimento não deve ser posterior a data de desaparecimento'],
          },
        });
      }
      if (!genderId) {
        return res.status(500).json({
          messages: {
            errors: ['Gênero deve ser informado'],
          },
        });
      }

      const genderResult = await sqlQuery({
        query: 'select 1 from gender where id = $1 limit 1',
        params: [genderId],
        client: client,
      });

      if (isEmpty(genderResult)) {
        return res.status(500).json({
          messages: {
            errors: ['Gênero informado inválido'],
          },
        });
      }

      await store({
        id: id,
        name: name,
        birthDate: birthDate,
        disappearanceDate: disappearanceDate,
        genderId: genderId,
        accountId: accountId,
        details: details,
      },
      client);

      return res.status(200).json({
        messages: {
          informations: ['Alerta salvo com sucesso'],
        },
      });
    });
  } catch (e) {
    ErrorAlertHandler(`[MissingPersonController] MissingPerson store: ${e.message}`, e.stack);

    next(e);
    return res.status(500).json({
      messages: {
        errors: ['Lamentamos o transtorno, ocorreu um erro interno no sistema. Nossa equipe já foi notificada. Caso o erro persista, entre em contato conosco'],
      },
    });
  }
};
