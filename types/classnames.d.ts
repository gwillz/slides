
declare module 'classnames/bind' {
    import 'classnames/bind'
    
    type ClassValue<T extends string> = T | T[] | {[k in T]?: T | undefined | null | boolean} | undefined | null | boolean;
    
    export function bind<T extends string>(styles: Record<T, string>)
        : (...classes: ClassValue<T>[]) => string;
    
    const cn: {bind: typeof bind};
    export default cn;
}
