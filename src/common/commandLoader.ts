import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import * as storage from '../common/storage';

export default async function () {
    for await (const file of walk(path.join(process.cwd(), 'dist/interactions'))) {
        delete require.cache[require.resolve(file)];
        const pull = (await import(file)).default;
        if (pull.name) storage.storeCommand(pull);
    }
}

function walk(dir: string) {
    const results: string[] = [];
    readdirSync(dir).forEach((dirItem) => {
        const stat = statSync(path.join(dir, dirItem));
        if (stat.isFile() && dirItem.endsWith('.js')) return results.push(path.join(dir, dirItem));
        else if (stat.isDirectory()) walk(path.join(dir, dirItem)).forEach((walkItem) => results.push(walkItem));
    });
    return results;
}