var ls;
(function (ls) {
    var ScrollToBehavior = (function (_super) {
        __extends(ScrollToBehavior, _super);
        function ScrollToBehavior() {
            _super.call(this);
        }
        var d = __define,c=ScrollToBehavior,p=c.prototype;
        p.onCreate = function () {
            this.isBounds = ls.eval_e(this.isBounds);
        };
        p.tick = function () {
            var now = egret.getTimer();
            var offx = 0;
            var offy = 0;
            if (now >= this._shakeStart && now < this._shakeEnd) {
                var mag = this._magnitude;
                if (this._mode === 1)
                    mag *= 1 - (now - this._shakeStart) / (this._shakeEnd - this._shakeStart);
                var r = Math.random() * Math.PI * 2;
                var d = Math.random() * mag;
                offx = Math.cos(r) * d;
                offy = Math.sin(r) * d;
            }
            var layer = this.inst.container.parent;
            if (this.isBounds) {
                var bounds = this.inst.getGlobalBounds();
                if (bounds.x < 0)
                    this.inst.x = this.inst.anchorOffsetX;
                else if (bounds.right > ls.GameUILayer.stage.stageWidth)
                    this.inst.x = ls.LayoutDecoder.sceneWidth - this.inst.anchorOffsetX;
                if (bounds.y < 0)
                    this.inst.y = this.inst.anchorOffsetY;
                else if (bounds.bottom > ls.GameUILayer.stage.stageHeight)
                    this.inst.y = ls.LayoutDecoder.sceneHeight - this.inst.anchorOffsetY;
            }
            ls.World.getInstance().sceneCamera.cameraLayer = layer;
            layer.lookAt((this.inst.x / (1 + offx)), (this.inst.y / (1 + offy)));
        };
        p.shake = function (magnitude, duration, mode) {
            this._magnitude = ls.eval_e(magnitude);
            this._duration = ls.eval_e(duration);
            this._mode = ls.eval_e(mode);
            this._shakeStart = egret.getTimer();
            this._shakeEnd = this._shakeStart + this._duration * 1000;
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            return bh;
        };
        return ScrollToBehavior;
    }(ls.BaseBehavior));
    ls.ScrollToBehavior = ScrollToBehavior;
    egret.registerClass(ScrollToBehavior,'ls.ScrollToBehavior');
})(ls || (ls = {}));
