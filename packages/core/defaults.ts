import { makeInstaller } from "./make-installer"
import Components from "./components"
import Plugin from "./plugin"
export default makeInstaller([...Components, ...Plugin])