import { defineComponent, renderSlot, watch } from 'vue'
// import {  } from ''
// export const messageConfig: MessageConfigContext={}
const ConfigProvider=defineComponent({
    name: 'XYConfigProvider',
    // props: 
    setup(props, { slots }) {
        // watch(
        //     () => props,
        // )
        const config= {value: ''} 
        return () => renderSlot(slots, 'default', { config: config?.value })
    }
})

export type ConfigProviderInstance=InstanceType<typeof ConfigProvider>

export default ConfigProvider