type DepEv = {
    data: any
    from: any
}
type getsetRus = {
    get: () => any
    , set: (any) => void
}
type getsetExt = {
    getBinder: () => ele
}
declare var Data: DataConstructor;
type attrState = "quote" | "key" | "attrstart" | "value" | "quoteStart" | "quoteEnd" | "equo";
type propState = "start" | "num" | "class" | "id" | "attr" | "targ" | "name";
type attrOnep = {
    key: string
    value: string
}
type ele = HTMLElement
interface Ev extends Event {
    target: ele
}
type SpecailHas = {
    on: any | null
    , data: Object | null
    , style: Object | null
    , args: Object | null
    , $: string | null
}
type DomRus = {
    docs: HTMLElement[]
    , has: SpecailHas
}
type HivOp = {
    el: string | HTMLElement | null
    dom: object
    , style?: object
    , data?: any
    , methods?: object
    , computed?: object

}
interface initFuncOpJson {
    func?: Function
    args?: {
        [key: string]: any
    }
    id?: Function
}
type initFuncName = "troggleSet"
interface Tool {
    initFunc(name: string, args: initFuncOpJson): Function
    extend<T, K>(obj1: T, obj2: K): T & K
}
interface Args {
    dom: HTMLElement
    [key: string]: any
}
type Pick2<T, K extends keyof T> = {
    [P in K]: T[P];
}
type getset = {
    get: () => string;
    set: (any:any) => void;
}
type setData<T, K extends keyof T> = {
    [P in K]: setData<T[P], keyof T[P]> & getset | any
}
type DataProp<T> = {
    srData: T;
    __data_id__: string;
}
interface DataConstructor {
    new <D>(Data: D, id?): setData<D, keyof D> & DataProp<D>;
    coheren(one: any): any;
}
type SpecailProp = "on" | "data" | "style" | "$" | "args"
interface DomInter {
    html: ele | ele[]
    domRus: DomRus
    args: {
        [key: string]: ele[]
    }
}
interface Domconstructor{
    new(any):DomInter;
}
declare var Dom :Domconstructor;
declare var ele : ele;
