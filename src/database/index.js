/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
const { exec } = require('child_process');

require('dotenv').config();

if (process.env.DATABASE_MIGRATION_ON_START === 'true') {
  exec('yarn db-run-migrations', (error, stdout, stderr) => {
    if (error) {
      throw new Error(`error: ${error.message}`);
    }
    if (stderr) {
      throw new Error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
}
