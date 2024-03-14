export function IconSearch(props) {
    const { className = 'stroke-[#171717]', strokeWidth = '2', height = 24, width = 24, ...rest } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
        </svg>
    );
}