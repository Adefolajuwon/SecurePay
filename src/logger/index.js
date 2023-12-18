import { devLogger } from './dev.js';
import { prodLogger } from './prod.js';
import dotenv from 'dotenv';
dotenv.config();
export let logger = prodLogger()
// if (process.env.NODE_ENV == 'development') {
// 	logger = devLogger();
// } else {
// 	logger = prodLogger;
// }
