import { defineComponent, renderSlot, watch } from 'vue'
// import {  } from ''
// export const messageConfig: MessageConfigContext={}
const ConfigProvider=defineComponent({
    name: 'XYConfigProvider',
    // props: 
    setup(props, { slots }) {
        watch(

        )
        // const config=
        return () => renderSlot(slots, 'default', { config: config?.value })
    }
})

export type ConfigProviderInstance=InstanceType<typeof ConfigProvider>

export default ConfigProvider