class GameUX {
    /*
    *  0 - Radial (Default)
    *  1 - Linear
    */
    private aiming: number
    private keys: { [key: string]: Phaser.Text; };
    private codes: Array<number>;

    private letterAngle: number;
    private halfW: number;
    private halfH: number;

    public static Radian = Math.PI / 180;

    constructor(aiming: number, fontSize: number, game: Phaser.Game) {
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

    public setAiming(value: number) {
        switch (value) {
            case 0: // Radial
                for (var i = 0; i < this.codes.length; i++) {
                    var key = this.keys[this.codes[i]];

                    var angle = (this.letterAngle * i) * GameUX.Radian;
                    var x = this.halfW * Math.cos(angle);
                    var y = this.halfH * Math.sin(angle);

                    x *= -1;
                    y *= -1;
                    if (y + this.halfH > this.halfH / 2) y -= +key.fontSize;
                    if (x + this.halfW > this.halfW / 2) x -= +key.fontSize;

                    key.x = x + this.halfW;
                    key.y = y + this.halfH;
                }
                break;
            case 1: // Linear
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
                    if (rX > this.halfW) rX -= +key.fontSize;
                    if (rY > this.halfH) rY -= +key.fontSize;

                    key.x = rX;
                    key.y = rY;
                }
                break;
        }
        this.aiming = value;
    }

    public getPoint(code: number): Phaser.Point {
        var key = this.keys[code];
        if (!key)
            return null;
        return key.position;
    }

    public onDown(code: number) {
        var key = this.keys[code];
        if (!key)
            return;
        key.fill = '#fff';
    }

    public onUp(code: number) {
        var key = this.keys[code];
        if (!key)
            return;
        key.fill = 'rgba(255, 255, 255, 0.4)';
    }

    public setVisible(value: boolean) {
        for (var name in this.keys)
            this.keys[name].visible = value;
    }
}
