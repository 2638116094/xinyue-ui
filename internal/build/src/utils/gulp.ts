
import { type TaskFunction } from 'gulp'
import { run } from './process'
import { buildRoot } from '@xinyue-ui/build-utils'
// import {} from './path'
export const withTaskName=<T extends TaskFunction>(name: string, fn:T)=> Object.assign(fn
    ,{displayName:name}
) 
export const runTask=(name:string) => withTaskName(`shellTask:${name}`,()=> {
    withTaskName(`shelll:${name}`, () =>  run(`pnpm run start ${name}`, buildRoot))
})