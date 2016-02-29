class Player {
    sprite: Phaser.Sprite;
    offsetAngle: number;

    game: Phaser.Game;
    bullets: Phaser.Group;

    fireRate = 100;
    nextFire = 0;

    constructor(x: number, y: number, game: Phaser.Game) {
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

    public fireTo(point: Phaser.Point) {
        var angle = Phaser.Math.angleBetweenPoints(this.sprite.position, point);
        this.sprite.rotation = angle + this.offsetAngle;

        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.reset(this.sprite.x - 8, this.sprite.y - 8);

            this.game.physics.arcade.moveToXY(bullet, point.x, point.y, 300);
        }
    }
}

class Bullet {
    constructor(game: Phaser.Game) {

    }
}
