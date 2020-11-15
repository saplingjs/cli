import {Command, flags} from '@oclif/command'

export default class Set extends Command {
	static description = 'Set a config variable in the current Sapling project'

	static flags = {
		help: flags.help({char: 'h'}),
	}

	static args = [{name: 'key'}, {name: 'value'}]

	async run() {
		const {args, flags} = this.parse(Set)

		const name = flags.name ?? 'world'
		this.log(`hello ${name} from /Users/groenroos/Repositories/cli/src/commands/set.ts`)
		if (args.file && flags.force) {
			this.log(`you input --force and --file: ${args.file}`)
		}
	}
}
