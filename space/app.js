var Main = (function () {
    function Main() {
        var content = document.getElementById('content');
        this.game = new Phaser.Game(800, 600, Phaser.WEBGL, content.id, { preload: this.preload, create: this.create, update: this.update });
    }
    Main.prototype.preload = function () {
        var frame0 = ['.....00..00.....', '...0050..0500...', '..06650..05660..', '..06750..05760..', '.066750..057660.', '.067550..055760.', '067750....057760', '067560....065760', '067560....065760', '.06756000065760.', '.06775666657760.', '.06777566577760.', '..067777777760..', '...0676666760...', '....06044060....', '.....030030.....'];
        var t = this.game.create.texture('ship1', frame0, 2, 2, 0);
        console.log(t.baseTexture.source.currentSrc, 'aa');
        frame0 = ['.....00..00.....', '....075..570....', '...0765..5670...', '..0765....5670..', '..0765....5670..', '..0765....5670..', '..0765.55.5670..', '...0765665670...', '...0766006670...', '..05670..07650..', '..05670..07650..', '..056770077650..', '..056677776650..', '.05650077005650.', '.0550.0330.0550.', '..00...00...00..'];
        this.game.create.texture('ship2', frame0, 2, 2, 0);
        frame0 = ['.......00.......', '......0770......', '.....076670.....', '.....076670.....', '....07655670....', '....07655670....', '...0765005670...', '..07650..05670..', '..07650..05670..', '...0760..0670...', '...0765005670...', '..07656DD65670..', '..076765567650..', '.07757666675770.', '0770077337700770', '.00..00..00..00.'];
        this.game.create.texture('ship3', frame0, 2, 2, 0);
        frame0 = ["................", "................", "....00....00....", "...0770..0770...", "..076630036670..", ".07633777733670.", "0765566666755670", "0565760000675650", "0565650..0565650", "0755660000665570", ".07677666676670.", "..077076670770..", "...00.0770.00...", ".......00.......", "................", "................"];
        this.game.create.texture('ship4', frame0, 2, 2, 0);
        frame0 = ['.......00.......', '......0770......', '.....076670.....', '....07600670....', '...0560..0650...', '..055050050550..', '...0560550650...', '..076765567670..', '...0767667670...', '..076567765670..', '.07653366335670.', '..076653356670..', '.07076655667070.', '0737637667367370', '0770337007330770', '.00.000..000.00.'];
        this.game.create.texture('ship5', frame0, 2, 2, 0);
        frame0 = ['......0..0......', '.....060060.....', '....05677650....', '...0565665650...', '..077555555770..', '...0775555770...', '..077756657770..', '.07556655665570.', '0756577667756570', '0753700770073570', '07360EE00EE06370', '0736000..0006370', '07560......06570', '.07350....05370.', '..0750....0570..', '...000....000...'];
        this.game.create.texture('ship6', frame0, 2, 2, 0);
        frame0 = ['................', '....000..000....', '...0220..0220...', '..02280..08220..', '.0.280....08220.', '0228760..0678220', '0228765005678220', '0E876556655678E0', '0E87655..55678E0', '0E876556655678E0', '0228765665678220', '.02287666678220.', '..022877778220..', '...0228008220...', '....02033020....', '.....00..00.....'];
        this.game.create.texture('player', frame0, 2, 2, 0);
        frame0 = ['................', '...0000..0000...', '..077670076770..', '.07556566565570.', '.07567655676570.', '.06677655677660.', '.07566533566670.', '..065535535560..', '..065535535560..', '.07566533566570.', '.06677655677660.', '.07567655676570.', '.07556566565570.', '..077670076770..', '...0000..0000...', '................'];
        this.game.create.texture('bullet1', frame0, 1, 1, 0);
        frame0 = ['................', '.....00..00.....', '...0066006600...', '..055656656550..', '..056765567650..', '.06677655677660.', '.06566533566660.', '..065535535560..', '..065535535560..', '.06566533566560.', '.06677655677660.', '..056765567650..', '..055656656550..', '...0066006600...', '.....00..00.....', '................'];
        this.game.create.texture('bullet2', frame0, 1, 1, 0);
        frame0 = ['................', '................', '.....00..00.....', '.....050050.....', '......0550......', '..00..0330..00..', '..050033330050..', '...0533553350...', '...0533553350...', '..050033330050..', '..00..0330..00..', '......0550......', '.....050050.....', '.....00..00.....', '................', '................'];
        this.game.create.texture('bullet3', frame0, 1, 1, 0);
    };
    Main.prototype.create = function () {
        var _this = this;
        var w = this.game.width, h = this.game.height;
        this.next = 0;
        this.rate = 100;
        this.game.stage.backgroundColor = '#000';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.data = this.game.make.bitmapData(w, h);
        this.data.addToWorld();
        for (var i = 0; i < 200; i++) {
            var x = Math.floor(Math.random() * w);
            var y = Math.floor(Math.random() * h);
            var size = Math.random();
            this.data.rect(x, y, 2 * size, 2 * size, '#ffffff');
            var starGlow = this.data.context.createRadialGradient(x, y, 0, x, y, size * 10);
            starGlow.addColorStop(0, 'rgba(190, 190, 190, 0.2)');
            starGlow.addColorStop(0.5, 'rgba(50, 50, 50, 0.2)');
            starGlow.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
            this.data.circle(x, y, size * 10, starGlow);
        }
        var spawnGlow = this.data.context.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w > h ? h : w);
        spawnGlow.addColorStop(0, 'rgba(190, 190, 190, 0.2)');
        spawnGlow.addColorStop(0.0625, 'rgba(50, 50, 50, 0.2)');
        spawnGlow.addColorStop(0.125, 'rgba(0, 0, 0, 0.3)');
        this.data.circle(w / 2, h / 2, w > h ? h : w, spawnGlow);
        var ux = new GameUX(0, 14, this.game);
        this.player = new Player(w / 2, h / 2, this.game);
        this.enemies = [];
        var lastDown = 0, lastUp = 0;
        this.game.input.keyboard.addCallbacks(this, function (event) {
            if (lastDown != 0)
                return;
            ux.onDown(event.keyCode);
            var point = ux.getPoint(event.keyCode);
            if (point != null)
                _this.player.fireTo(point);
            lastDown = event.keyCode;
        }, function (event) {
            ux.onUp(event.keyCode);
            if (lastDown == event.keyCode)
                lastDown = 0;
            lastUp = event.keyCode;
        }, function (char) {
        });
    };
    Main.prototype.update = function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            console.log('a');
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }
        if (this.game.time.now > this.next && this.enemies.length < 20) {
            this.next = this.game.time.now + this.rate;
            var enemy = new Enemy(this.game);
            this.enemies.push(enemy);
        }
    };
    Main.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Main;
}());
window.onload = function () {
    var main = new Main();
};
var GameUX = (function () {
    function GameUX(aiming, fontSize, game) {
        this.aiming = aiming;
        this.keys = {};
        this.codes = [65, 81, 87, 69, 83, 68, 82, 70, 84, 71, 89, 72, 85, 74, 73, 75, 79, 80, 76, 77, 78, 66, 86, 67, 88, 90];
        var style = { font: fontSize + "px Arial", fill: "rgba(255, 255, 255, 0.4)", align: "center" };
        this.letterAngle = 360 / this.codes.length;
        this.halfW = game.width / 2;
        this.halfH = game.height / 2;
        for (var i = 0; i < this.codes.length; i++) {
            this.keys[this.codes[i]] = game.add.text(0, 0, String.fromCharCode(this.codes[i]), style);
        }
        this.setAiming(aiming);
    }
    GameUX.prototype.setAiming = function (value) {
        switch (value) {
            case 0:
                for (var i = 0; i < this.codes.length; i++) {
                    var key = this.keys[this.codes[i]];
                    var angle = (this.letterAngle * i) * GameUX.Radian;
                    var x = this.halfW * Math.cos(angle);
                    var y = this.halfH * Math.sin(angle);
                    x *= -1;
                    y *= -1;
                    if (y + this.halfH > this.halfH / 2)
                        y -= +key.fontSize;
                    if (x + this.halfW > this.halfW / 2)
                        x -= +key.fontSize;
                    key.x = x + this.halfW;
                    key.y = y + this.halfH;
                }
                break;
            case 1:
                for (var i = 0; i < this.codes.length; i++) {
                    var key = this.keys[this.codes[i]];
                    var angle = (this.letterAngle * i) * GameUX.Radian;
                    var x = this.halfW * Math.cos(angle);
                    var y = this.halfH * Math.sin(angle);
                    var absX = Math.abs(x);
                    var absY = Math.abs(y);
                    var u = absX, m = this.halfW;
                    if (absX < absY) {
                        u = absY;
                        m = this.halfH;
                    }
                    var rX = x / u * m + this.halfW, rY = y / u * m + this.halfH;
                    rX = this.halfW * 2 - rX;
                    rY = this.halfH * 2 - rY;
                    if (rX > this.halfW)
                        rX -= +key.fontSize;
                    if (rY > this.halfH)
                        rY -= +key.fontSize;
                    key.x = rX;
                    key.y = rY;
                }
                break;
        }
        this.aiming = value;
    };
    GameUX.prototype.getPoint = function (code) {
        var key = this.keys[code];
        if (!key)
            return null;
        return key.position;
    };
    GameUX.prototype.onDown = function (code) {
        var key = this.keys[code];
        if (!key)
            return;
        key.fill = '#fff';
    };
    GameUX.prototype.onUp = function (code) {
        var key = this.keys[code];
        if (!key)
            return;
        key.fill = 'rgba(255, 255, 255, 0.4)';
    };
    GameUX.prototype.setVisible = function (value) {
        for (var name in this.keys)
            this.keys[name].visible = value;
    };
    GameUX.Radian = Math.PI / 180;
    return GameUX;
}());
var Player = (function () {
    function Player(x, y, game) {
        this.fireRate = 100;
        this.nextFire = 0;
        this.game = game;
        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.set(0.5);
        this.offsetAngle = 90 * (Math.PI / 180);
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet3');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowRotation = false;
    }
    Player.prototype.fireTo = function (point) {
        var angle = Phaser.Math.angleBetweenPoints(this.sprite.position, point);
        this.sprite.rotation = angle + this.offsetAngle;
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.sprite.x - 8, this.sprite.y - 8);
            this.game.physics.arcade.moveToXY(bullet, point.x, point.y, 600);
        }
    };
    return Player;
}());
var Bullet = (function () {
    function Bullet(game) {
    }
    return Bullet;
}());
var ResourcePool = (function () {
    function ResourcePool() {
        this.iterator = 0;
        this.items = [];
    }
    ResourcePool.prototype.Get = function () {
        if (this.iterator < 0)
            return null;
        var o = this.items[this.iterator];
        this.items[this.iterator--] = null;
        return o;
    };
    ResourcePool.prototype.Release = function (o) {
        if (this.iterator < this.items.length)
            this.items[this.iterator] = o;
        else
            this.items.push(o);
        this.iterator++;
    };
    return ResourcePool;
}());
var Enemy = (function () {
    function Enemy(game) {
        this.game = game;
        var texture = 'ship' + Main.getRandomInt(1, 6);
        this.radius = Main.getRandomInt(100, 400);
        this.angle = Main.getRandomInt(0, 360) * GameUX.Radian;
        var x = this.game.width / 2;
        var y = this.game.height / 2;
        this.sprite = game.add.sprite(x, y, texture);
        this.sprite.pivot.x = Main.getRandomInt(100, this.game.height - 200);
        this.sprite.anchor.set(0.5);
        this.sprite.alpha = 0;
        this.rotationSpeed = this.sprite.pivot.x / 10000;
    }
    Enemy.prototype.update = function () {
        if (this.sprite.alpha < 1.0)
            this.sprite.alpha += 0.05;
        this.sprite.rotation += this.rotationSpeed;
    };
    return Enemy;
}());
