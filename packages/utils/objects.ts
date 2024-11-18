import { get, set } from "lodash-unified"
import type { Entries } from 'type-fest'
import type { Arrayable } from '.'

export const keyOf=<T extends object>(ary: T)=> Object.keys(ary) as Array<keyof T>
export const entriesOf=<T extends object>(ary:T)=>Object.entries(ary) as Entries<T>
export { hasOwn } from '@vue/shared'
export const getProp = <T = any>(
    obj:Record<string, any>,
    path: Arrayable<string>,
    defaultValue?: any
): {value: T} => {
    return {
        get value() {
            return get(obj,path,  defaultValue)
        },
        set value(val:any) {
            set(obj, path, val)
        }
    }
}