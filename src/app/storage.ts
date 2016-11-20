import * as jsonStorage from 'electron-json-storage'
import * as pify from 'pify'

const storage: {
    get: (key: string) => Promise<Object>
    getMany: (keys: string[]) => Promise<{ [key: string]: any }>
    getAll: () => Promise<{ [key: string]: any }>
    set: (key: string, json: Object) => Promise<void>
    has: (key: string) => Promise<boolean>
    keys: () => Promise<string[]>
    remove: (key: string) => Promise<void>
    clear: () => Promise<void>
} = pify(jsonStorage)

export default storage
