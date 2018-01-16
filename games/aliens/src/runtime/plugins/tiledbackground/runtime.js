var ls;
(function (ls) {
    var AITiledBackground = (function (_super) {
        __extends(AITiledBackground, _super);
        function AITiledBackground() {
            _super.call(this);
            this.name = "tiledBackground";
            this.snapPixelsEnabled = true;
            this.container.addChild(this._bitmap);
        }
        var d = __define,c=AITiledBackground,p=c.prototype;
        p.initialize = function () {
            var url = this["url"];
            this._bitmapURL = url;
            var self = this;
            var textureDatas = ls.getTexture(url);
            if (textureDatas != null)
                var texture = textureDatas[0];
            if (texture != null) {
                this._bitmap.texture = texture;
                this._bitmap.fillMode = egret.BitmapFillMode.REPEAT;
                this._bitmap.width = this.width;
                this._bitmap.height = this.height;
                this._bitmap.x = textureDatas[1];
                this._bitmap.y = textureDatas[2];
                this._sourceWidth = texture.textureWidth;
                this._sourceHeight = texture.textureHeight;
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onResourceLoaded));
            }
            else {
                var onRESComplete = function (texture) {
                    if (texture) {
                        self._bitmap.texture = texture;
                        self._bitmap.fillMode = egret.BitmapFillMode.REPEAT;
                        self._bitmap.width = self.width;
                        self._bitmap.height = self.height;
                        self._sourceWidth = texture.textureWidth;
                        self._sourceHeight = texture.textureHeight;
                        self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                    }
                };
                RES.getResByUrl(url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this["url"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["url"] = o["url"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["url"] = this["url"];
            return cl;
        };
        return AITiledBackground;
    }(ls.AISprite));
    ls.AITiledBackground = AITiledBackground;
    egret.registerClass(AITiledBackground,'ls.AITiledBackground');
})(ls || (ls = {}));
