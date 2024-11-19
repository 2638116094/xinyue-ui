import { rollup } from 'rollup'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild' 
import commonjs from '@rollup/plugin-commonjs'
import glob from 'fast-glob'

import type { TaskFunction } from 'gulp'
import type { OutputOptions, Plugin } from 'rollup'

const projectRoot = resolve(__dirname,'..','..','..','..')
const pkgRoot=resolve(projectRoot,'packages')
const epOutput=resolve(projectRoot,'dist')

export const excludeFiles=(files:string[]) => {
    const excludes = ['node_modules','mock','gulpfile','dist']
    return files.filter(path => !excludes.some(exclude =>path.includes(exclude)))
}

export const buildModules:TaskFunction = async () => {
    const input = excludeFiles(
        await glob('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true
        })
    )
    const plugins: Plugin[] =[
        nodeResolve({
            extensions:['.mjs','.js','.json', '.ts']
        }),
        esbuild(),
        commonjs(),
        vue()
    ]
    const bundle = await rollup({
        input,
        plugins,
        external: ['vue',/@vue/g]
    })

    bundle.write({
        format: 'esm',//输出模块格式
        dir:resolve(epOutput, 'es'), // 输出目录
        preserveModules: true, // 保持原模块目录
        preserveModulesRoot: pkgRoot, // 指定根目录
        entryFileNames: `[name].mjs`//输出为`.mjs` name是入口
    })
}