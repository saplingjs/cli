import {Command, flags} from '@oclif/command'

import * as editJsonFile from 'edit-json-file'
import { isSapling } from '../satnav'

export default class Set extends Command {
	static description = 'Set a config variable in the current Sapling project'

	static flags = {
		help: flags.help({char: 'h'}),
	}

	static args = [{name: 'key'}, {name: 'value'}]

	async run() {
		const {args} = this.parse(Set)

		/* Check we're in the right place */
		if(await isSapling()) {
			/* Check we have the right stuff */
			if(args.key && args.value) {
				/* Make the change */
				let config = editJsonFile('config.json')
				config.set(args.key, args.value)
				config.save()
			} else {
				console.error("You must provide both key and value");
			}
		}
	}
}
