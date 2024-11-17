import { withInstall } from '@xinyue/utils'
// import from './src'
import ConfigProvoder from './src/config-provider'
import type { SFCWithInstall } from '@xinyue/utils'
export const XYConfigProvider: SFCWithInstall<typeof ConfigProvider> = withInstall(ConfigProvider)