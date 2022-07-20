import * as process from 'node:process';
import { Command, flags } from '@oclif/command';

import * as execa from 'execa';
import { isSapling } from '../satnav';

export default class Update extends Command {
	static description = 'Upgrade to the latest version of Sapling and its dependencies';

	static aliases: string[] = ['upgrade'];

	static flags: Record<string, unknown> = {
		help: flags.help({ char: 'h' }),
	};

	async run() {
		if (await isSapling()) {
			/* eslint-disable-next-line @typescript-eslint/naming-convention */
			execa.command('npm upgrade', { env: { FORCE_COLOR: 'true' } }).stdout?.pipe(process.stdout);
		}
	}
}
