import {Command, flags} from '@oclif/command'

export default class Run extends Command {
	static description = 'Serve the Sapling project on an available port'

	static aliases = ['start', 'serve', 'open', 'launch']

	static flags = {
		help: flags.help({char: 'h'}),
		port: flags.integer({char: 'p', description: 'Which port to use'}),
	}

	static args = []

	async run() {
		const {args, flags} = this.parse(Run)

		const name = flags.name ?? 'world'
		this.log(`hello ${name} from /Users/groenroos/Repositories/cli/src/commands/run.ts`)
		if (args.file && flags.force) {
			this.log(`you input --force and --file: ${args.file}`)
		}
	}
}
