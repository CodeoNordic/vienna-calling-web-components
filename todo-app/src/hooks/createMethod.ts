import { useEffect } from 'react';

const createMethod = (
    name: string,
    func: Function,
    dependencies: Array<unknown> = []
) => {
    useEffect(() => {
        (window as unknown as Record<string, Function>)[name] = (param?: string) => {
            try {
                param = JSON.parse(param!)
            } catch {}

            func(param);
        };
    }, dependencies);
}

export default createMethod;