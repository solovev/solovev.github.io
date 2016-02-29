class Enemy {
    sprite: Phaser.Sprite;
    game: Phaser.Game;

    radius: number;
    angle: number;

    rotationSpeed: number;

    constructor(game: Phaser.Game) {
        this.game = game;

        var texture = 'ship' + Main.getRandomInt(1, 6);

        this.radius = Main.getRandomInt(100, 400);//(this.game.width > this.game.height ? this.game.width : this.game.height) + 32;
        this.angle = Main.getRandomInt(0, 360) * GameUX.Radian;

        // var x = this.radius * Math.cos(this.angle);
        // var y = this.radius * Math.sin(this.angle);
        // this.sprite = game.add.sprite(x + game.width / 2, y + game.height / 2, texture);

        // var angle = Phaser.Math.angleBetweenPoints(this.sprite.position, new Phaser.Point(0, 0));
        // this.sprite.rotation = angle + 90 * (Math.PI / 180);
        var x = this.game.width / 2;
        var y = this.game.height / 2;

        this.sprite = game.add.sprite(x, y, texture);

        //this.sprite.pivot.y = 100;
        this.sprite.pivot.x = Main.getRandomInt(100, this.game.height - 200);
        this.sprite.anchor.set(0.5);

        this.sprite.alpha = 0;

        this.rotationSpeed = this.sprite.pivot.x / 10000;
    }

    public update() {
        // var x = this.radius * Math.cos(this.angle);
        // var y = this.radius * Math.sin(this.angle);
        //
        // this.radius--;

        if (this.sprite.alpha < 1.0)
            this.sprite.alpha += 0.05;
        this.sprite.rotation += this.rotationSpeed;

    }
}
