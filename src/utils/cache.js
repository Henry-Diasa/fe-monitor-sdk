import { deepClone } from './utils';

const cache = [];

export function getCache() {
    return deepClone(cache);
}

export function addCache(data) {
    cache.push(data);
}

export function clearCache() {
    cache.length = 0;
}