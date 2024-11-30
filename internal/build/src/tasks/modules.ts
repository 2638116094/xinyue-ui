import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild' 
import commonjs from '@rollup/plugin-commonjs'
import glob from 'fast-glob'
import VueMacros from 'unplugin-vue-macros/rollup'
import type { OutputOptions, Plugin } from 'rollup'
import { epRoot, excludeFiles, pkgRoot } from '@xinyue-ui/build-utils'
import { buildConfigEntries, target } from '../build-info'
import { generateExternal, writeBundles } from '../utils'
import { XinyueUiAlias } from '../plugins/xinyue-ui-alias'
import vueJsx from '@vitejs/plugin-vue-jsx'
export const buildModules = async() => {
    const input = excludeFiles(
        await glob('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true
        })
    )
    const bundle = await rollup({
        input,
        plugins: [
            XinyueUiAlias(),
            VueMacros({
                setupComponent: false,
                setupSFC:  false,
                plugins: {
                    vue: vue({
                        isProduction: true,
                        template: {
                            compilerOptions: {
                                hoistStatic: false,
                                cacheHandlers: false
                            }
                        }
                    }),
                    vueJsx: vueJsx()
                }
            }),
            nodeResolve({
                extensions: ['.mjs','.js','.json', '.ts']
            }),
            commonjs(),
            esbuild({
                sourceMap: true,
                target,
                loaders: {
                    '.vue': 'ts'
                }
            })
        ],
        external: await generateExternal({ full: false }),
        treeshake: false
    })
    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named': undefined,
                preserveModules: true,
                preserveModulesRoot: epRoot,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`,
            }
        })
    )
}