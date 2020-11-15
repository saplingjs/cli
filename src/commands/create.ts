import {Command, flags} from '@oclif/command'

export default class Create extends Command {
	static description = 'Create a new Sapling project, and install all dependencies'

	static aliases = ['init', 'setup', 'install', 'new']

	static flags = {
		help: flags.help({char: 'h'}),
		// flag with a value (-n, --name=VALUE)
		name: flags.string({char: 'n', description: 'name to print'}),
		// flag with no value (-f, --force)
		force: flags.boolean({char: 'f'}),
	}

	static args = [{name: 'file'}]

	async run() {
		const {args, flags} = this.parse(Create)

		const name = flags.name ?? 'world'
		this.log(`hello ${name} from /Users/groenroos/Repositories/cli/src/commands/create.ts`)
		if (args.file && flags.force) {
			this.log(`you input --force and --file: ${args.file}`)
		}
	}
}
