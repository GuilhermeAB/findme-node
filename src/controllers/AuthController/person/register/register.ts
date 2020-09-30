import { Client } from 'pg';
import { sqlQuery } from 'database/util';
import { DispatchRegisterAlert, ErrorAlertHandler } from 'util/request/handler';
import { t } from 'database/transaction';
import store from 'src/models/AuthModel/Person/store/store';

export default async (req: any, res: any, next: any): Promise<any> => {
  try {
    return await t(async (client: Client) => {
      const {
        id,
        name,
        email,
        password,
        confirmPassword,
      } = req.body;

      if (id && Number.isNaN(parseInt(id, 10))) {
        return res.status(200).json({
          messages: {
            errors: ['Identificador do usuário não é um número inteiro válido'],
          },
        });
      }
      if (!name) {
        return res.status(200).json({
          messages: {
            errors: ['Nome não foi informado'],
          },
        });
      }
      if (name.lenght > 50) {
        return res.status(200).json({
          messages: {
            errors: ['Nome deve possuir menos que 50 caracteres'],
          },
        });
      }
      if (!email) {
        return res.status(200).json({
          messages: {
            errors: ['E-mail não foi informado'],
          },
        });
      }
      if (email.lenght > 100) {
        return res.status(200).json({
          messages: {
            errors: ['E-mail deve possuir menos que 100 caracteres'],
          },
        });
      }
      if (!password) {
        return res.status(200).json({
          messages: {
            errors: ['Senha não foi informada'],
          },
        });
      }
      if (!confirmPassword) {
        return res.status(200).json({
          messages: {
            errors: ['Confirmação da senha não foi informada'],
          },
        });
      }
      if (password !== confirmPassword) {
        return res.status(200).json({
          messages: {
            errors: ['Senha e confirmação de senha não coincidem'],
          },
        });
      }

      const resolve = await sqlQuery({
        query: 'select 1 from account where email = $1 limit 1',
        params: [email],
        client: client,
      });
      if (resolve && resolve[0]) {
        return res.status(200).json({
          messages: {
            errors: ['E-mail informado já possui cadastrado'],
          },
        });
      }

      await store({
        email: email,
        password: password,
      }, {
        name: name,
      },
      client);

      try {
        const date = new Date();
        DispatchRegisterAlert(`**[${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] - [Pessoa] Novo Registro** \nNome: ${name}\nE-mail: ${email}`);
      } catch (e) {
        console.log('Erro ao disparar aviso de registro no discord');
        console.log(e);
      }

      return res.status(200).json({
        messages: {
          informations: ['Usuário salvo com sucesso'],
        },
      });
    });
  } catch (e) {
    ErrorAlertHandler(`[AuthController] Person register: ${e.message}`, e.stack);

    next(e);
    return res.status(500).json({
      messages: {
        errors: ['Lamentamos o transtorno, ocorreu um erro interno no sistema. Nossa equipe já foi notificada. Caso o erro persista, entre em contato conosco'],
      },
    });
  }
};
