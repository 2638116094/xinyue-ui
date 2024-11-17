import installer from './defaults'
export * from '@xinyue/components'
export * from '@xinyue/constants'
// export * from ''
export const install = installer.install
export const version = installer.version
export default installer
export { default as dayjs } from 'dayjs'