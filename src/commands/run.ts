import {Command, flags} from '@oclif/command'

import * as execa from 'execa'
import * as getPort from 'get-port'
import { isSapling } from '../satnav'

export default class Run extends Command {
	static description = 'Serve the Sapling project on an available port'

	static aliases = ['start', 'serve', 'open', 'launch']

	static flags = {
		help: flags.help({char: 'h'}),
		port: flags.integer({char: 'p', description: 'Which port to use'}),
	}

	async run() {
		const {flags} = this.parse(Run)

		if(await isSapling()) {
			/* Get either specified port or any available port */
			let finalPort: number;

			if(!flags.port) {
				finalPort = await getPort({port: 3000});
			} else {
				finalPort = flags.port;
			}

			console.log(`Running Sapling on port ${finalPort}`);

			/* Execute the Sapling server with the port */
			execa.command(`node ./node_modules/@sapling/sapling --port ${finalPort} --single`).stdout.pipe(process.stdout);
		}
	}
}
