
declare module 'classnames/bind' {
    import 'classnames/bind'
    
    type ClassValue<T extends string> = T | T[] | {[k in T]?: any} | undefined | null | false;
    
    function bind<T extends string>(styles: Record<T, string>)
        : (...classes: ClassValue<T>[]) => string;
    
    export default bind;
}
