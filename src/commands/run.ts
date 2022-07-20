import * as process from 'node:process';
import { Command, flags } from '@oclif/command';

import * as execa from 'execa';
import * as getPort from 'get-port';
import { isSapling } from '../satnav';

export default class Run extends Command {
	static description = 'Serve the Sapling project on an available port';

	static aliases: string[] = ['start', 'serve', 'open', 'launch'];

	static flags: Record<string, unknown> = {
		help: flags.help({ char: 'h' }),
		port: flags.integer({ char: 'p', description: 'Which port to use' }),
	};

	async run() {
		const { flags } = this.parse(Run);

		if (await isSapling()) {
			/* Get either specified port or any available port */
			const finalPort: number = flags.port ? flags.port : ((await getPort({ port: 3000 })) as number);

			console.log(`Running Sapling on port ${finalPort}`);

			/* Execute the Sapling server with the port */
			/* eslint-disable-next-line @typescript-eslint/naming-convention */
			execa.command(`./node_modules/.bin/sapling --port ${finalPort} --single`, { stdio: 'inherit', env: { FORCE_COLOR: 'true' } }).stdout.pipe(process.stdout);
		}
	}
}
