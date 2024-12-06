import { withInstall } from '@xinyue-ui/utils'
import type { SFCWithInstall } from '@xinyue-ui/utils'
import Button from './src/button.vue'

export const XYButton:SFCWithInstall<typeof Button> = withInstall(Button)

export default XYButton
export * from './src/button'
export type { ButtonInstance } from './src/instance'