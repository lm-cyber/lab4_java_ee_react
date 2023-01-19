import React from "react";
import {useAppSelector} from "../../../hooks/redux";
import {hitAPI} from "../../../api/hitsService";
import normalizer from "./util/normalizer";
import {HitResult} from "../../../api/types/response";
import {Coordinates, DotColor, IndexedPoint} from "./util/types/canvasPoint";
import AxisCanvas from "./AxisCanvas";

const mapHitToPoint = (hit: HitResult, scaleRadius: number, toPx: (coordinatesUnits: Coordinates, radius: number) => Coordinates): IndexedPoint => {
    const coordinates = toPx({x: hit.x, y: hit.y}, scaleRadius);
    const color = hit.hit ? DotColor.hit : DotColor.miss;
    return {id: hit.id, coordinates: coordinates, color, radius: 3}
}

const CanvasContainer = () => {
    const SIZE = 300;
    const INIT_PX_PER_UNIT = 50;
    const RADIUS_PX = 2 * INIT_PX_PER_UNIT;

    const {page, sortReverse} = useAppSelector(state => state.currentPageReducer);
    const {data: hits} = hitAPI.useFetchHitsQuery({page, perPage: 17, sortReverse: sortReverse});
    const [sendHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const {scaleRadius} = useAppSelector(state => state.coordinatesReducer);

    const {fromPxToUnits, fromUnitsToPx} = normalizer({canvasSizePx: SIZE, pxPerRadius: RADIUS_PX});

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        const {x, y} = fromPxToUnits({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}, scaleRadius);
        sendHit({x, y, r: scaleRadius, time: (new Date).toLocaleString()});
    }

    const convertPoints = () => hits?.data ? hits.data.map((h: HitResult) => mapHitToPoint(h, scaleRadius, fromUnitsToPx)) : []
    const scaledPxPerUnit = () => Math.min(INIT_PX_PER_UNIT, SIZE);

    return (
        <section className="grid-section" id="canvas-container">
            <AxisCanvas data-test-id="axis-canvas" onClick={handleClick} sizePx={SIZE} points={convertPoints()} pxPerUnit={scaledPxPerUnit()}/>
        </section>
    )
}

export default CanvasContainer;
