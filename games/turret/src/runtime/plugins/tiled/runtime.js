var ls;
(function (ls) {
    var AITiledMap = (function (_super) {
        __extends(AITiledMap, _super);
        function AITiledMap() {
            _super.call(this);
            this.caches = {};
            this["tilemap"] = true;
        }
        var d = __define,c=AITiledMap,p=c.prototype;
        p.initialize = function () {
            this.collisionType = 0;
            this.url = ls.eval_e(this.url);
            this.solid = ls.eval_e(this.solid);
            if (this.url) {
                var data = ls.ResCache.componentResources[this.url];
                if (data) {
                    this.onTMXCreate(data);
                }
                else {
                    RES.getResByUrl(this.url, function (data) {
                        if (data) {
                            this.onTMXCreate(data);
                        }
                    }, this, RES.ResourceItem.TYPE_XML);
                }
            }
        };
        p.onTMXCreate = function (data) {
            this.tiledMap = new tiled.TMXTilemap(ls.LayoutDecoder.sceneWidth, ls.LayoutDecoder.sceneHeight, data, this.url);
            this.tiledMap.render();
            this.container.addChild(this.tiledMap);
            this.dispatchEvent(new egret.Event("tiledInitialize"));
        };
        p.getCacheCollisionPolygonData = function () {
            if (!this.tiledMap)
                return null;
            var collisionRects = this.getCollisionRects();
            var thisPolygonDatas = [];
            var m = new egret.Matrix();
            var layerScaleX = this.container.parent.scaleX;
            var layerScaleY = this.container.parent.scaleY;
            var layerAngle = this.container.parent.rotation;
            for (var i = 0; i < collisionRects.length; i++) {
                var rect = collisionRects[i];
                var ovs = [];
                var itemAnchorOffsetX = rect.width / 2;
                var itemAnchorOffsetY = rect.height / 2;
                var key = i + "_";
                if (this.caches[key] === undefined) {
                    this.caches[key] = new egret.Shape();
                    this.container.addChild(this.caches[key]);
                }
                this.caches[key].graphics.clear();
                this.caches[key].graphics.lineStyle(2, Math.floor(Math.random() * 0xffffff));
                var s = this.caches[key];
                for (var j = 0; j < 4; j++) {
                    m.identity();
                    switch (j) {
                        case 0:
                            m.translate(-itemAnchorOffsetX, -itemAnchorOffsetY + rect.height);
                            break;
                        case 1:
                            m.translate(-itemAnchorOffsetX + rect.width, -itemAnchorOffsetY + rect.height);
                            break;
                        case 2:
                            m.translate(-itemAnchorOffsetX + rect.width, -itemAnchorOffsetY);
                            break;
                        case 3:
                            m.translate(-itemAnchorOffsetX, -itemAnchorOffsetY);
                            break;
                    }
                    m.scale(layerScaleX, layerScaleY);
                    m.rotate(layerAngle * Math.PI / 180);
                    m.translate(rect.x + itemAnchorOffsetX - this.anchorOffsetX, rect.y + itemAnchorOffsetY - this.anchorOffsetY);
                    ovs[j] = new ls.Vector2D(m.tx, m.ty);
                    if (j == 0) {
                        s.graphics.moveTo(m.tx + this.anchorOffsetX, m.ty + this.anchorOffsetY);
                    }
                    else
                        s.graphics.lineTo(m.tx + this.anchorOffsetX, m.ty + this.anchorOffsetY);
                }
                s.graphics.lineTo(ovs[0].x + this.anchorOffsetX, ovs[0].y + this.anchorOffsetY);
                s.graphics.endFill();
                thisPolygonDatas[i] = ovs;
            }
            return thisPolygonDatas;
        };
        p.getCollisionRects = function () {
            var collision_rects = [];
            if (this.tiledMap) {
                var solidLayer;
                var layers = this.tiledMap.getLayers();
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.name == this.solid) {
                        solidLayer = layer;
                        break;
                    }
                }
                if (solidLayer) {
                    var cur_rect = null;
                    var layerDatas = solidLayer.layerData;
                    if (layerDatas) {
                        for (var i = 0; i < layerDatas.length; i++) {
                            for (var j = 0; j < layerDatas[i].length; j++) {
                                var tile = layerDatas[i][j];
                                if (!(tile && tile.gid)) {
                                    if (cur_rect) {
                                        collision_rects.push(cur_rect);
                                        cur_rect = null;
                                    }
                                    continue;
                                }
                                if (!cur_rect) {
                                    if (cur_rect) {
                                        collision_rects.push(cur_rect);
                                        cur_rect = null;
                                    }
                                    cur_rect = new egret.Rectangle();
                                    cur_rect.left = i * this.tiledMap.tilewidth;
                                    cur_rect.top = j * this.tiledMap.tileheight;
                                    cur_rect.right = cur_rect.left + this.tiledMap.tilewidth;
                                    cur_rect.bottom = cur_rect.top + this.tiledMap.tileheight;
                                }
                                else {
                                    cur_rect.bottom += this.tiledMap.tileheight;
                                }
                            }
                            if (cur_rect) {
                                collision_rects.push(cur_rect);
                                cur_rect = null;
                            }
                        }
                        var len = collision_rects.length;
                        for (var m = 0; m < len; m++) {
                            var q = collision_rects[m];
                            for (var n = m + 1; n < len; n++) {
                                var p = collision_rects[n];
                                if (p.left < q.right)
                                    continue;
                                if (p.left > q.right)
                                    break;
                                if (p.bottom > q.bottom || p.top > q.top)
                                    break;
                                if (p.top === q.top && p.bottom === q.bottom) {
                                    collision_rects.splice(n, 1);
                                    --len;
                                    q.right += this.tiledMap.tilewidth;
                                    --n;
                                }
                            }
                        }
                    }
                }
            }
            return collision_rects;
        };
        p.destory = function () {
            if (this.tiledMap && this.tiledMap.parent) {
                this.tiledMap.parent.removeChild(this.tiledMap);
                this.tiledMap.destory();
            }
            _super.prototype.destory.call(this);
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this.url;
            o["solid"] = this.solid;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.url = o["url"];
                this.solid = o["solid"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.url = this.url;
            cl.solid = this.solid;
            return cl;
        };
        AITiledMap.aStars = {};
        return AITiledMap;
    }(ls.AIDisplayObject));
    ls.AITiledMap = AITiledMap;
    egret.registerClass(AITiledMap,'ls.AITiledMap');
})(ls || (ls = {}));
