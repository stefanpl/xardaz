import * as tempy from 'tempy';
import { randomIntFromInterval } from './randomIntFromInterval';

export const getRandomTmpName = tempy.file;
export const getRandomTmpPath = tempy.file;
export const randomInt = () => randomIntFromInterval(0, 1000);
