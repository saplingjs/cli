/**
 * GPS for knowing if we're in a Sapling instance or not
 */

import * as path from 'path'
import * as fs from 'fs-extra'

export async function isSapling() {
	/* Dirty check if Sapling's there */
	/* TODO: make smarter, make work from any directory inside a Sapling project */
	if(fs.existsSync(path.join('node_modules', '@sapling', 'sapling'))) {
		return true;
	} else {
		console.error('This doesn\'t seem to be a Sapling project.  Are you sure you\'re in the correct directory?');
		return false;
	}
}