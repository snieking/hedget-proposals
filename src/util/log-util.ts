import chalk from 'chalk';
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

export function initLogger() {
  const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
  };

  prefix.reg(log);

  log.setLevel(process.env.NODE_ENV === 'production' ? 'info' : 'debug');

  prefix.apply(log, {
    format(level, name, timestamp) {
      // @ts-ignore
      return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
    },
  });

  prefix.apply(log.getLogger('critical'), {
    format(level, name, timestamp) {
      return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
    },
  });
}
