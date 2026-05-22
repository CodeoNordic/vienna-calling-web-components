declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src
}

declare module 'jsx:*.svg' {
    const Icon: React.FC<React.HTMLAttributes<SVGElement>>;
    export default Icon;
}