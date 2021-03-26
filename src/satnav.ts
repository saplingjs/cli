/**
 * GPS for knowing if we're in a Sapling instance or not
 */

import * as path from 'path'
import * as findUp from 'find-up'

export async function isSapling(): Promise<boolean> {
	/* Dirty check if Sapling's there */
	if(await findUp('node_modules/@sapling/sapling', { type: 'directory' })) {
		return true;
	} else {
		console.error('This doesn\'t seem to be a Sapling project.  Are you sure you\'re in the correct directory?');
		return false;
	}
}

export async function getSaplingDir(): Promise<string> {
	const dir = await findUp('node_modules/@sapling/sapling', { type: 'directory' })

	if (dir) {
		return path.join(dir, '../../..')
	} else {
		return process.cwd()
	}
}