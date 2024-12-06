import path from 'path'
import { Transform } from 'stream'
import chalk from 'chalk'
import gulpSass from 'gulp-sass'
import { parallel, series, dest, src, type TaskFunction } from 'gulp'
import dartSass from 'sass'
import postcss from 'postcss'
import cssnano from 'cssnano'
import consola from 'consola'
import type Vinly from 'vinyl'
import autoPrefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import { epOutput } from '@xinyue-ui/build-utils'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme')

function compressWithCssnano() {
    const processor= postcss([
        cssnano({
            preset: [
                'default',
                {
                    colormin: false,
                    minifyFontValues: false
                }
            ]
        })
    ])
    return new Transform({
        objectMode: true,
        transform(chunk, _encoding, callback) {
            const file=chunk as Vinly
            if(file.isNull()) {
                callback(null, file)
                return
            } 
            if(file.isStream()) {
                callback(new Error('Streaming not supported'))
                return
            }
            const cssString = file.contents!.toString()
            processor.process(cssString, { from: file.path }).then((result) => {
                const name = path.basename(file.path)
                file.contents= Buffer.from(result.css)
                consola.success(
                    `${chalk.cyan(name)}: ${chalk.yellow(cssString.length/1000)} KB -> ${chalk.green(result.css.length / 1000)} KB`
                )
                callback(null, file)
            })
        },
    })
}

function buildThemeChalk() {
    const sass = gulpSass(dartSass)
    const noElPRefixFile=/(index|base|display)/
    return src(path.resolve(__dirname, 'src/*.scss'))
        .pipe(sass.sync())
        .pipe(autoPrefixer({ cascade: false }))
        .pipe(compressWithCssnano())
        .pipe(
            rename((path) => {
                if(!noElPRefixFile.test(path.basename)) {
                    path.basename = `xy-${path.basename}`
                }
            })
        )
        .pipe(dest(distFolder))
}

//dark 模式样式打包
function buildDarkCssVars() {
    const sass = gulpSass(dartSass)
    return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
        .pipe(sass.sync())
        .pipe(autoPrefixer({ cascade: false }))
        .pipe(compressWithCssnano())
        .pipe(dest(`${distFolder}/dark`))
}

// 复制css样式到dist
export function copyThemeChalkBundle() {
    return src(`${distFolder}/**`).pipe(dest(distBundle))
}
// 复制scss样式到dist
export function copyThemeChalkSource() {
    return src(path.resolve(__dirname,'src/**')).pipe(
        dest(path.resolve(distBundle, 'src'))
    )
}

export const build=parallel(
    
    copyThemeChalkSource,
    series(buildThemeChalk, 
        buildDarkCssVars, 
        // copyThemeChalkBundle
    )
)
export default build