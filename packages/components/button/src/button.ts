import { buildProps } from '@xinyue-ui/utils'
export const buttonTypes=[
    'default',
    'primary',
    'success',
    'warning',
    'info',
    'danger',
    'test',
    'link'
] as const
export const buttonNativeTypes=['button', 'submit', 'reset'] as const
export const buttonProps=buildProps({
    /**
     * @description button sieze
     * @value small lager middle  default
     */
    size: {
        type: String,
        default: 'default'
    },
    /**
     * @description 文本类型
     */
    text: {

    }
})