import { Command, flags } from '@oclif/command';

import { runQuestionnaire } from '../setup';
import { isSapling, getSaplingDir } from '../satnav';

export default class Edit extends Command {
	static description = 'Reconfigure an existing Sapling project';

	static aliases: string[] = ['modify', 'reconfigure', 'change'];

	static flags: Record<string, unknown> = {
		help: flags.help({ char: 'h' }),
	};

	async run() {
		if (await isSapling()) {
			await runQuestionnaire(false, await getSaplingDir());
		}
	}
}
