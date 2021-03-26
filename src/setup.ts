/**
 * Setup
 * 
 * Run through the questionnaire to setup/edit a project
 */

import * as path from 'path'
import * as fs from 'fs-extra'

import cli from 'cli-ux'
import * as execa from 'execa'
import * as inquirer from 'inquirer'
import * as editJsonFile from 'edit-json-file'
import * as friendlyWords from 'friendly-words';

/**
 * Generate an available project name
 *
 * @returns {string} Generated name
 */
function generateName(): string {
	/* Generate a name */
	const adj = friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)];
	const obj = friendlyWords.objects[Math.floor(Math.random() * friendlyWords.objects.length)];
	const name = `${adj}-${obj}`;

	/* If it's taken, come up with something new */
	if (fs.existsSync(name)) {
		return generateName();
	}

	return name;
}

export async function runQuestionnaire(isNew: boolean = true) {
	/* Read available drivers from disk */
	const drivers = JSON.parse(fs.readFileSync(path.join(__dirname, 'drivers.json'), 'utf8'));

	/* Ask everything we need to know */
	let responses: any = await inquirer.prompt([
		{
			name: 'name',
			message: 'What\'s the name of your project?',
			type: 'string',
			default: generateName(),
			validate: function (value) {
				if (!value.match(/^[a-zA-Z0-9-_]+$/i))
					return 'Please only use letters, numbers and dashes, no spaces';

				if (fs.existsSync(value))
					return `The folder ${value} already exists`;

				return true;
			},
			when: function () {
				return isNew;
			}
		},
		{
			name: 'db',
			message: 'Which database do you want to use?',
			type: 'list',
			choices: Object.keys(drivers.db),
			default: Object.keys(drivers.db)[0],
		},
		{
			name: 'render',
			message: 'Which templating do you want to use?',
			type: 'list',
			choices: Object.keys(drivers.render),
			default: Object.keys(drivers.render)[0],
		},
		{
			name: 'vue',
			message: 'Install optional Vue.js UI components?',
			type: 'confirm',
			default: true,
		},
		{
			name: 'mailtype',
			message: 'How do you want to send email?',
			type: 'list',
			choices: [
				{
					name: 'SMTP',
					value: 'SMTP',
				},
				{
					name: 'nodemailer',
					value: 'nodemailer',
				},
				{
					name: 'Amazon SES',
					value: 'SES',
				},
				{
					name: 'Don\'t send email',
					value: false,
				},
			],
			default: 'SMTP',
		}
	])

	cli.action.start('Setting up your project')

	/* Do first-time setup */
	if(isNew) {
		/* Make the project directory */
		fs.mkdirSync(responses.name)

		/* Copy default files */
		fs.copySync(path.join(__dirname, 'default'), path.join(responses.name))

		/* Populate package.json */
		let packageJson = editJsonFile(path.join(responses.name, 'package.json'))
		packageJson.set('name', responses.name)
		packageJson.save()

		/* Populate config */
		let config = editJsonFile(path.join(responses.name, 'config.json'))

		config.set('name', responses.name)
		config.set('db.driver', responses.db)
		config.set('render.driver', responses.render)
		config.set('mail.type', responses.mailtype)

		config.save()

	} else {
		responses.name = process.cwd()
	}

	/* Install dependencies */
	try {
		process.chdir(responses.name)
		await execa('npm', ['install', '--save', '@sapling/sapling', drivers.db[responses.db], drivers.render[responses.render], responses.vue ? '@sapling/vue-components' : ''])
	} catch (error) {
		console.log('Something went wrong')
		console.log(error)
		process.exit()
	}

	/* If we're doing a new project */
	if(isNew) {
		/* Copy default folders */
		fs.copySync(path.join('node_modules/@sapling/sapling/hooks'), path.join('hooks'))
		fs.copySync(path.join('node_modules/@sapling/sapling/views'), path.join('views'))
		fs.copySync(path.join('node_modules/@sapling/sapling/public'), path.join('public'))
		fs.copySync(path.join('node_modules/@sapling/sapling/static'), path.join('static'))

		/* Copy default file */
		fs.copySync(path.join('node_modules/@sapling/sapling/hooks.json'), path.join('hooks.json'))
		fs.copySync(path.join('node_modules/@sapling/sapling/permissions.json'), path.join('permission.json'))
	}

	cli.action.stop()

	console.log(`Sapling project ${responses.name} created!`)
	console.log(`Running now...`)

	execa('./node_modules/.bin/sapling', { env: { FORCE_COLOR: 'true' } }).stdout?.pipe(process.stdout)
}