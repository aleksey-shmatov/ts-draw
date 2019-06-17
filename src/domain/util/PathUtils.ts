import { Point } from '../model/Point';

export class PathUtils {

    public static buildStraightPath(points: Point[]): string {
        let data = '';
        if (points.length > 0) {
            let point = points[0];
            data += `M ${point.x} ${point.y} `;
            for (let i = 1; i < points.length; i++) {
                point = points[i];
                data += `L ${point.x} ${point.y} `;
            }
        }
        return data;
    }

    public static distanceSquared(v: Point, w: Point): number {
        const dx = v.x - w.x;
        const dy = v.y - w.y;
        return dx * dx + dy * dy;
    }

    /** Squared perpendicular distance from `p` to line segment `v`-`w`. */
    public static distanceToSegmentSquared(p: Point, v: Point, w: Point): number {
        const l2: number = PathUtils.distanceSquared(v, w);
        if (l2 == 0) {
            return PathUtils.distanceSquared(p, v);
        }
        const t: number = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        if (t < 0) {
            return PathUtils.distanceSquared(p, v);
        }
        if (t > 1) {
            return PathUtils.distanceSquared(p, w);
        }
        const point = new Point(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y));
        return PathUtils.distanceSquared(p, point);
    }

    /** Perpendicular distance from `p` to line segment `v`-`w`. */
    public static distanceToSegment(p: Point, v: Point, w: Point): number {
        return Math.sqrt(PathUtils.distanceToSegmentSquared(p, v, w));
    }

    public static simplifyPath(points: Point[], epsilon: number = 1): Point[] {
        var firstPoint: Point = points[0];
        var lastPoint: Point = points[points.length - 1];

        if (points.length < 3) {
            return points;
        }

        let index = -1;
        let dist = 0.;
        for (let i = 1; i < points.length - 1; i++) {
            var currDist: number = PathUtils.distanceToSegment(points[i], firstPoint, lastPoint);
            if (currDist > dist) {
                dist = currDist;
                index = i;
            }
        }

        if (dist > epsilon) {
            // recurse
            const l1: Point[]= points.slice(0, index + 1);
            const l2: Point[] = points.slice(index);
            const r1: Point[] = PathUtils.simplifyPath(l1, epsilon);
            const r2: Point[] = PathUtils.simplifyPath(l2, epsilon);
            // concat r2 to r1 minus the end/startpoint that will be the same
            const rs: Point[] = r1.slice(0, r1.length - 1).concat(r2);
            return rs;
        } else {
            return [firstPoint, lastPoint];
        }
    }

    private static calculateControlPoints(points: Point[], t: number): Point[] {
        const result: Point[] = [];
        for (let i = 0; i < points.length - 2; i++) {
            const p0: Point = points[i];
            const p1: Point = points[i + 1];
            const p2: Point = points[i + 2];
            const d01: number = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
            const d12: number = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

            const fa: number = t * d01 / (d01 + d12);
            const fb: number = t - fa;

            const p1x: number = p1.x + fa * (p0.x - p2.x);
            const p1y: number = p1.y + fa * (p0.y - p2.y);
            result.push(new Point(p1x, p1y));

            const p2x: number = p1.x - fb * (p0.x - p2.x);
            const p2y: number = p1.y - fb * (p0.y - p2.y);
            result.push(new Point(p2x, p2y));
        }
        return result;
    }

    public static buildCurvedPath(points: Point[]): string {
        let result: string;
        switch (points.length) {
            case 0:
            case 1:
                result = '';
                break;
            case 2:
                result = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
                break;
            default:
                result = `M ${points[0].x} ${points[0].y}`;
                const controlPoints = PathUtils.calculateControlPoints(points, 0.5);
                //First segment is quadratic
                let cp: Point = controlPoints[0];
                let nextPoint: Point = points[1];
                result += ` Q ${cp.x}, ${cp.y} ${nextPoint.x} ${nextPoint.y}`;
                //Middle segments - cubic
                for (let i = 1; i < points.length - 2; i++) {
                    nextPoint = points[i + 1];
                    const cp1: Point = controlPoints[2 * i - 1];
                    const cp2: Point = controlPoints[2 * i];
                    result += ` C ${cp1.x}, ${cp1.y} ${cp2.x}, ${cp2.y} ${nextPoint.x} ${nextPoint.y}`;
                }
                //Last segment is quadratic
                cp = controlPoints[controlPoints.length - 1];
                result += ` Q ${cp.x}, ${cp.y} ${nextPoint.x} ${nextPoint.y}`;
                break;
        }
        return result;
    }
}
