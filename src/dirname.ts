#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default __dirname;
