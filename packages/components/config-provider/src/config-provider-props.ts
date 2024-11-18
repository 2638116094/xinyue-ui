import { buildProps, definePropType } from '@xinyue/utils'
import type { ExtractPropTypes } from 'vue'
import { Language } from '@xinyue/locale'
import { size } from 'lodash-unified'
export type ExperimentalFeatures = {}

export const configProviderProps=buildProps({
    a11y: {
        type: Boolean,
        default: true
    },
    locale: {
        type: definePropType<Language>(Object)
    },
    // size: useSize
    zIndex: Number,
    namespace: {
        type: String,
        default: 'XY'
    }
} as const)
export type ConfigProviderProps=ExtractPropTypes<typeof configProviderProps>