import findWorkspacePackage from '@pnpm/find-workspace-packages'
import { pkgRoot, projRoot } from './paths'
import type { ProjectManifest } from '@pnpm/types'

export const getWorkspacePackages =() => findWorkspacePackage(projRoot)
export const getWorkspaceNames= async(dir=projRoot) => {
    const pkgs= await findWorkspacePackage(projRoot)
    return pkgs
        .filter((pkg) => pkg.dir.startsWith(dir))
        .map((pkg)=> pkg.manifest.name)
        .filter((name): name is string => !!name)
}

export const getPackageManifest=(pkgPath: string) => {
    return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies=(
    pkgPath: string
):Record<'dependencies'|'peerDependencies', string[]> => {
    const manifest=getPackageManifest(pkgPath)
    const { dependencies={},  peerDependencies={} } = manifest
    return {
        dependencies:Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies)
    }
}

export const excludeFiles=(files: string[]) => {
    const excludes=['node_modules', 'test', 'mock', 'dist']
    return files.filter((path) => {
        const position=path.startsWith(projRoot)?projRoot.length:0
        return !excludes.some((exclude)=> path.includes(exclude, position))
    })
}