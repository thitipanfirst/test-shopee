export function IconClose(props) {
    const { className = 'stroke-[#171717]', strokeWidth = '1.5', height = 16, width = 16, ...rest } = props

    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}