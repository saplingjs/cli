import { Command, flags } from '@oclif/command';
import { runQuestionnaire } from '../setup';

export default class Create extends Command {
	static description = 'Create a new Sapling project, and install all dependencies';

	static aliases: string[] = ['init', 'setup', 'install', 'new'];

	static flags: Record<string, unknown> = {
		help: flags.help({ char: 'h' }),
	};

	async run() {
		await runQuestionnaire();
	}
}
