import { PKG_NAME, PKG_PREFIX } from "@xinyue-ui/build-constants";
import { buildConfig, type Module } from "../build-info";

export const pathRewriter = (module: Module) => {
    const config=buildConfig[module]
    return (id: string) => {
        id=id.replaceAll(`${PKG_PREFIX}/theme`, `${PKG_NAME}/theme`)
        id=id.replaceAll(`${PKG_PREFIX}/`,`${config.bundle.path}/`)
        return id
    }
}