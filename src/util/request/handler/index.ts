import axios from 'axios';

export const DispatchErrorAlert = async (message: string): Promise<any> => {
  if (process.env.DISCORD_ERROR_HOOK_ENABLE === 'true') {
    try {
      await axios({
        url: process.env.DISCORD_ERROR_HOOK,
        method: 'POST',
        responseType: 'json',
        data: {
          username: 'Alerta de erro',
          content: message,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const DispatchRegisterAlert = async (message: string): Promise<any> => {
  if (process.env.DISCORD_REGISTER_HOOK_ENABLE === 'true') {
    try {
      await axios({
        url: process.env.DISCORD_REGISTER_HOOK,
        method: 'POST',
        responseType: 'json',
        data: {
          username: 'Novo registro',
          content: message,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const ErrorAlertHandler = async (message: string, stacktrace?: string): Promise<any> => {
  const date = new Date();
  await DispatchErrorAlert(`**[${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] - Error** - ${message}`);
  if (stacktrace) {
    await DispatchErrorAlert(`${stacktrace} \n------------------------------------------------`);
  }
};
