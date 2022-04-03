import { Command, flags } from '@oclif/command';

import * as execa from 'execa';
import { isSapling } from '../satnav';

export default class Update extends Command {
	static description = 'Upgrade to the latest version of Sapling and its dependencies';

	static aliases = ['upgrade'];

	static flags = {
		help: flags.help({ char: 'h' }),
	};

	async run() {
		if (await isSapling()) {
			execa.command('npm upgrade', { env: { FORCE_COLOR: 'true' } }).stdout?.pipe(process.stdout);
		}
	}
}
