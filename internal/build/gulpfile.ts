import { parallel, series, type TaskFunction } from 'gulp'
import { copy } from 'fs-extra'
import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import {
    buildOutput,
    epOutput,
    epPackage,
    projRoot
} from '@xinyue-ui/build-utils'
import { run, runTask, withTaskName, buildConfig , type Module } from './src'

export const copyFiles=() => {
    Promise.all([
        copyFile(epPackage, path.join(epOutput,'package.json')),
        copyFile(
            path.resolve(projRoot,'README.md'),
            path.resolve(epOutput,'README.md')
        ),
        copyFile(
            path.resolve(projRoot, 'typings', 'global.d.ts'),
            path.resolve(epOutput,'global.d.ts')
        )
    ])
}

export const copyTypesDefinitions:TaskFunction =(done) => {
    const src = path.resolve(buildOutput, 'types', 'packages')
    const copyTypes = (module: Module) => 
        withTaskName(`copyTypes:${module}`, () => 
            copy(src, buildConfig[module].output.path, { recursive: true })
        )
    return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle= async () => {
    await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
    await copyFile(
        path.resolve(epOutput, 'theme/index.css'),
        path.resolve(epOutput, 'dist/index.css')
    )
}

export default series(
    withTaskName('clean',() => run('pnpm run clean')),
    withTaskName('createOutput', ()=> mkdir(epOutput, { recursive: true })),
    parallel(
        runTask('buildModules'),
        // runTask('buildFunllBundle'),
        // runTask('generatetypesDefinitions'),
        // series(
        //     withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme build')),
        //     copyFullStyle
        // )
    ),
    // parallel(copyTypesDefinitions, copyFiles)
)


export * from './src'