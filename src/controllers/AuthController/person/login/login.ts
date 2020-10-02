import { Client } from 'pg';
import { t } from 'database/transaction';
import { ErrorAlertHandler } from 'src/util/request/handler';
import login from 'src/models/AuthModel/Person/login/login';

export default async (req: any, res: any, next: any): Promise<any> => {
  try {
    return await t(async (client: Client) => {
      const {
        email,
        password,
      } = req.body;

      if (!email) {
        return res.status(500).json({
          messages: {
            errors: ['E-mail não foi informado'],
          },
        });
      }
      if (!password) {
        return res.status(500).json({
          messages: {
            errors: ['Senha não foi informada'],
          },
        });
      }

      try {
        const resolve = await login(email, password, client);
        console.log(resolve.token);

        res.cookie('token',
          resolve.token,
          {
            maxAge: ((((1000 * 60) * 60) * 24) * 7),
            // secure: false,
            httpOnly: true,
          });

        return res.status(200).json({
          account: resolve.account,
          person: resolve.person,
          messages: {
            informations: ['Bem vindo de volta!'],
          },
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
    ErrorAlertHandler(`[AuthController] Person register: ${e.message}`, e.stack);

    next(e);
    return res.status(500).json({
      messages: {
        errors: ['Lamentamos o transtorno, ocorreu um erro interno no sistema. Nossa equipe já foi notificada. Caso o erro persista, entre em contato conosco'],
      },
    });
  }
};
