import {Point} from '../model/Point';

export class PathUtils {

  public static buildStraightPath(points: Array<Point>): string {
    var data = '';
    if (points.length > 0) {
      var point = points[0];
      data += `M ${point.x} ${point.y} `;
      for (var i: number = 1; i < points.length; i++) {
        point = points[i];
        data += `L ${point.x} ${point.y} `;
      }
    }
    return data;
  }

  public static distanceSquared(v: Point, w: Point): number {
    var dx = v.x - w.x;
    var dy = v.y - w.y;
    return dx * dx + dy * dy;
  }

  /** Squared perpendicular distance from `p` to line segment `v`-`w`. */
  public static distanceToSegmentSquared(p: Point, v: Point, w: Point): number {
    var l2: number = PathUtils.distanceSquared(v, w);
    if (l2 == 0)
      return PathUtils.distanceSquared(p, v);
    var t: number = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0)
      return PathUtils.distanceSquared(p, v);
    if (t > 1)
      return PathUtils.distanceSquared(p, w);
    var point: Point = new Point(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y));
    return PathUtils.distanceSquared(p, point);
  }
  /** Perpendicular distance from `p` to line segment `v`-`w`. */
  public static distanceToSegment(p: Point, v: Point, w: Point): number {
    return Math.sqrt(PathUtils.distanceToSegmentSquared(p, v, w));
  }

  public static simplifyPath(points: Array<Point>, epsilon: number = 1): Array<Point> {
    var firstPoint: Point = points[0];
    var lastPoint: Point = points[points.length - 1];

    if (points.length < 3) {
      return points;
    }

    var index: number = -1;
    var dist: number = 0.;
    for (var i: number = 1; i < points.length - 1; i++) {
      var currDist: number = PathUtils.distanceToSegment(points[i], firstPoint, lastPoint);
      if (currDist > dist) {
        dist = currDist;
        index = i;
      }
    }

    if (dist > epsilon) {
      // recurse
      var l1: Array<Point> = points.slice(0, index + 1);
      var l2: Array<Point> = points.slice(index);
      var r1: Array<Point> = PathUtils.simplifyPath(l1, epsilon);
      var r2: Array<Point> = PathUtils.simplifyPath(l2, epsilon);
      // concat r2 to r1 minus the end/startpoint that will be the same
      var rs: Array<Point> = r1.slice(0, r1.length - 1).concat(r2);
      return rs;
    } else {
      return [firstPoint, lastPoint];
    }
  }

  private static calculateControlPoints(points: Array<Point>, t: number): Array<Point> {
    var result: Array<Point> = [];
    for (var i: number = 0; i < points.length - 2; i++) {
      var p0: Point = points[i];
      var p1: Point = points[i + 1];
      var p2: Point = points[i + 2];
      var d01: number = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
      var d12: number = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

      var fa: number = t * d01 / (d01 + d12);
      var fb: number = t - fa;

      var p1x: number = p1.x + fa * (p0.x - p2.x);
      var p1y: number = p1.y + fa * (p0.y - p2.y);
      result.push(new Point(p1x, p1y));

      var p2x: number = p1.x - fb * (p0.x - p2.x);
      var p2y: number = p1.y - fb * (p0.y - p2.y);
      result.push(new Point(p2x, p2y));
    }
    return result;
  }

  public static buildCurvedPath(points: Array<Point>): string {
    var result: string;
    switch (points.length) {
      case 0:
      case 1:
        result = '';
        break;
      case 2:
        result = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
        break;
      default:
        var startPoint: Point = points[0];
        var endPoint: Point = points[points.length - 1];
        result = `M ${points[0].x} ${points[0].y}`;
        var controlPoints: Array<Point> = PathUtils.calculateControlPoints(points, 0.5);
        //First segment is quadratic
        var cp: Point = controlPoints[0];
        var nextPoint: Point = points[1];
        result += ` Q ${cp.x}, ${cp.y} ${nextPoint.x} ${nextPoint.y}`;
        //Middle segments - cubic
        for (var i: number = 1; i < points.length - 2; i++) {
          nextPoint = points[i + 1];
          var cp1: Point = controlPoints[2 * i - 1];
          var cp2: Point = controlPoints[2 * i];
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
