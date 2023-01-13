import React from 'react';

interface FiguresProps {
    halfR: number;
    sizePx: number;
}

const Figures = ({halfR, sizePx}: FiguresProps) => {
    const center = sizePx / 2;
    const R = halfR * 2;

    const circle = `M ${center} ${center+halfR} A ${ 4/3 * halfR} ${4/3 * halfR} 0 0 0 ${center+halfR} ${center} L ${center} ${center} Z`;

    const rectangle = `${center-R},${center} ${center},${center} ${center},${center-R} ${center-R},${center-R}`

    const triangle = `${center-halfR},${center} ${center},${center} ${center},${center+R}`

    return (
        <svg width={sizePx} height={sizePx} className="svg-graph" xmlns="http://www.w3.org/2000/svg">
            {/*// <!-- Circle -->*/}
            <path className="figure circle-figure" d={circle}
                  fill="darkblue" fillOpacity="0.25" stroke="darkblue" strokeOpacity="0.5"/>

            {/*// <!-- Rectangle -->*/}
            <polygon className="figure rectangle-figure" points={rectangle}
                     fill="yellow" fillOpacity="0.25" stroke="#CCCC00" strokeOpacity="0.5" />

            {/*// <!-- Triangle -->*/}
            <polygon className="figure triangle-figure" points={triangle}
                     fill="darkgreen" fillOpacity="0.25" stroke="darkgreen" strokeOpacity="0.5" />
        </svg>
    )
}

const MemoizedFigures = React.memo(Figures);

export default MemoizedFigures;
