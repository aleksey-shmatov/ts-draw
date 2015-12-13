var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var SimplePath = (function (_super) {
    __extends(SimplePath, _super);
    function SimplePath() {
        _super.apply(this, arguments);
    }
    SimplePath.prototype.colorToString = function (i) {
        var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
        return "#" + "00000".substring(0, 6 - c.length) + c;
    };
    SimplePath.prototype.render = function () {
        var data = this.props.data;
        var fill = 'none';
        if (this.props.fill != undefined && this.props.fill != null)
            fill = this.colorToString(this.props.fill);
        var stroke = 'none';
        if (this.props.stroke != undefined && this.props.stroke != null)
            stroke = this.colorToString(this.props.stroke);
        var strokeWidth = 0;
        if (this.props.strokeWidth)
            strokeWidth = this.props.strokeWidth;
        return React.createElement("path", {d: data, "fill": fill, "stroke": stroke, "strokeWidth": strokeWidth});
    };
    return SimplePath;
})(React.Component);
exports.SimplePath = SimplePath;
//# sourceMappingURL=SimplePath.js.map