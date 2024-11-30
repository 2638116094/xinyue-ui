import { PKG_NAME,  PKG_PREFIX } from "@xinyue-ui/build-constants";
import type { Plugin } from 'rollup'
export function XinyueUiAlias(): Plugin {

    const themeChalk = 'theme'
    const sourceTheme=`${PKG_PREFIX}/${themeChalk}` as const
    const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const
    return {
        name: 'xinyue-ui-alias-plugin',
        resolveId(id) {
            if(!id.startsWith(sourceTheme)) return
            return {
                id: id.replaceAll(sourceTheme, bundleThemeChalk),
                external: 'absolute'
            }
        }
    }
}