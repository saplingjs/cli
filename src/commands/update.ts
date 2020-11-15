import {Command, flags} from '@oclif/command'

export default class Update extends Command {
	static description = 'Upgrade to the latest version of Sapling and its dependencies'

	static aliases = ['upgrade']

	static flags = {
		help: flags.help({char: 'h'}),
	}

	static args = []

	async run() {
		const {args, flags} = this.parse(Update)

		const name = flags.name ?? 'world'
		this.log(`hello ${name} from /Users/groenroos/Repositories/cli/src/commands/update.ts`)
		if (args.file && flags.force) {
			this.log(`you input --force and --file: ${args.file}`)
		}
	}
}
