import { Command, flags } from '@oclif/command';

import { runQuestionnaire } from '../setup';
import { isSapling, getSaplingDir } from '../satnav';

export default class Edit extends Command {
	static description = 'Reconfigure an existing Sapling project';

	static aliases = ['modify', 'reconfigure', 'change'];

	static flags = {
		help: flags.help({ char: 'h' }),
	};

	async run() {
		if (await isSapling()) {
			runQuestionnaire(false, await getSaplingDir());
		}
	}
}
