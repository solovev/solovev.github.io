class Main {
    private game: Phaser.Game;

    constructor() {
        var content = document.getElementById('content');
        this.game = new Phaser.Game(800, 600, Phaser.WEBGL, content.id, { preload: this.preload, create: this.create, update: this.update });
    }

    private preload() {
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
    }

    innerCircle: Phaser.Circle;
    outerCircle: Phaser.Circle;
    data: Phaser.BitmapData;

    player: Player;
    enemies: Array<Enemy>;

    next: number;
    rate: number;

    private create() {
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


        //var lastDown = 0, lastUp = 0;
        this.game.input.keyboard.addCallbacks(this,
            (event: KeyboardEvent) => { // onDown
                //if (lastDown != 0)
                //    return;

                ux.onDown(event.keyCode);

                var point = ux.getPoint(event.keyCode);
                if (point != null)
                    this.player.fireTo(point);


                //lastDown = event.keyCode;
            },
            (event: KeyboardEvent) => { // onUp
                ux.onUp(event.keyCode);

                //if (lastDown == event.keyCode)
                //    lastDown = 0;
                //lastUp = event.keyCode;
            },
            (char: string) => { // onPress
            }
        );
    }

    private update() {
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
    }

    public static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

window.onload = () => {
    var main = new Main();
};
