import {Command, flags} from '@oclif/command'
import { runQuestionnaire } from '../setup'

export default class Edit extends Command {
	static description = 'Reconfigure an existing Sapling project'

	static aliases = ['modify', 'reconfigure', 'change']

	static flags = {
		help: flags.help({char: 'h'}),
	}

	async run() {
		const { flags } = this.parse(Edit)

		runQuestionnaire(false)
	}
}
