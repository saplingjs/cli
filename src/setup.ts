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

export async function runQuestionnaire(isNew: boolean = true) {
	/* Read available drivers from disk */
	const drivers = JSON.parse(fs.readFileSync(path.join(__dirname, 'drivers.json'), 'utf8'));

	/* Ask everything we need to know */
	let responses: any = await inquirer.prompt([
		{
			name: 'name',
			message: 'What\'s the name of your project?',
			type: 'string',
			default: 'untitled',
			validate: function (value) {
				if (!value.match(/^[a-zA-Z0-9-_]+$/i))
					return 'Please only use letters, numbers and dashes, no spaces';

				if (fs.existsSync(value))
					return `The folder ${value} already exists`;

				return true;
			},
			when: function () {
				return isNew;
			},
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
			type: 'boolean',
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

		/* Create package.json */
		fs.writeFileSync(path.join(responses.name, 'package.json'), `{"name":"${responses.name}"}`)

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
	execa(`cd ${responses.name} && npm install --save @sapling/sapling ${drivers.db[responses.db]} ${drivers.render[responses.render]} && cd ..`, { env: { FORCE_COLOR: 'true' } }).stdout.pipe(process.stdout)

	/* Copy default folders */
	if(isNew) {
		fs.copySync(path.join(responses.name, 'node_modules/@sapling/sapling/views'), path.join(responses.name))
		fs.copySync(path.join(responses.name, 'node_modules/@sapling/sapling/public'), path.join(responses.name))
		fs.copySync(path.join(responses.name, 'node_modules/@sapling/sapling/static'), path.join(responses.name))
	}

	cli.action.stop()

	console.log(`Sapling project created in ${responses.name}/`)
	console.log(`To run, do:  cd ${responses.name} && sapling run`)
}