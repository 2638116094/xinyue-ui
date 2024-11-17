import type {  epPropKey } from './runtime'
import type { ExtractPropTypes, PropType } from 'vue'
import type { IfNever, UnknowToNever, WritableArray } from './utils'

type Value<T>=T[keyof  T]

export type ExtractPropType<T extends object>=Value<ExtractPropTypes<{key: T}>>

export type ResolvePropType<T> = IfNever<
    T,
    never, 
    ExtractPropType<{
        type:WritableArray<T>
        required: true
    }>
>

export type NativePropType =
    | ((...args: any) => any)
    | { new (...args:any): any}
    | undefined
    | null
export type IfNativePropType<T,Y,N>=[T] extends [NativePropType]?Y:N

/**
 * Merge Type, Value, Validator types
 * 合并  Type, Value, Validator 的类型
 */
export type EpPropMergeType<Type, Value, Validator>=
    |IfNever<UnknowToNever<Value>, ResolvePropType<Type>, never>
    |UnknowToNever<Value>
    |UnknowToNever<Validator>
/**
 * 
 */

export type EpPropInputDefault<Required extends boolean, Default>=Required extends true ? never : Default extends  Record<string, unknown> | Array<any> ? () => Default: (() => Default) |Default

/**
 * input prop`buildProp` or `buildProp`
 * prop参数(约束)
 * {
 *  type
 *  required
 *  values
 *  validator
 *  default
 * }
 */
export type EpPropInput<
    Type,
    Value,
    Validator,
    Default extends EpPropMergeType<Type, Value, Validator>,
    Required extends boolean
> = {
    type?: Type
    required?: Required
    values?: readonly Value[]
    validator?: ((val:any)=> val is Validator) | ((val:any) => boolean)
    default?: EpPropInputDefault<Required, Default>
}