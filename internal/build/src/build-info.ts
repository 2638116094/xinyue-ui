import { epOutput } from '@xinyue-ui/build-utils'
import path from 'path'
import  type {  ModuleFormat } from "rollup"
import { PKG_NAME } from '@xinyue-ui/build-constants'
export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]
export interface BuildInfo {
    module: 'ESNext'| 'CommonJS'
    format: ModuleFormat
    ext: 'mjs'|'cjs'|'js',
    output: {
        name: string
        path: string
    }
    bundle: {
        path: string
    }
}
export const buildConfig: Record<Module, BuildInfo>= {
    esm: {
        module:'ESNext',
        format: 'esm',
        ext: 'mjs',
        output: {
            name: 'es',
            path: path.resolve(epOutput, 'es')
        },
        bundle: {
            path: `${PKG_NAME}/es`
        }
    },
    cjs: {
        module: 'CommonJS',
        format: 'cjs',
        ext: 'js',
        output: {
            name: 'lib',
            path: path.resolve(epOutput, 'lib')
        },
        bundle: {
            path: `${PKG_NAME}/lib`
        }
    }
}

export const buildConfigEntries = Object.entries(
    buildConfig
) as BuildConfigEntries

export type BuildConfigEntries = [Module, BuildInfo][]

export const target='es2018'