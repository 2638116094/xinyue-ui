// import { INSTALLED_KEY } from '@xinyue-ui/constants'
import { version } from './version';
import type { App, Plugin } from "@vue/runtime-core";
// import type {  }


export const makeInstaller = (components: Plugin[] = []) => {
    const install = (app: App, options?:unknown) => {
        // if(app[INSTALLED_KEY]) return
        // app[INSTALLED_KEY] = true
        components.forEach((c) => app.use(c))
        // if(options) pro
    }

    return {
        version,
        install
    }
}
