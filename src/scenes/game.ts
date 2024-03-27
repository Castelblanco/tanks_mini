import { GameObjects, Scene, Types, Math as PhaserMath, Input, Geom } from 'phaser';
import { Bullet, Tank } from '../game_objects/index';

import { collideWorldBounds } from '@helpers/index';

const COLOR_RED = 0xff0000;
const COLOR_BLUE = 0x0000ff;
const COLOR_GREED = 0x00ff00;

export class GameScene extends Scene {
    tank!: Tank;
    wall!: GameObjects.Sprite;
    cursor1!: Types.Input.Keyboard.CursorKeys;
    tankBase!: Types.Physics.Arcade.SpriteWithDynamicBody;
    canyon!: GameObjects.Sprite;
    rotationTank!: number;
    velocityTank!: number;

    gameWidth!: number;
    gameHeight!: number;

    constructor() {
        super({ key: GameScene.name });
    }

    init = () => {
        this.velocityTank = 0.3;
        this.rotationTank = 0.003;
        this.gameWidth = +this.game.config.width;
        this.gameHeight = +this.game.config.height;
    };

    create = () => {
        this.anims.fromJSON(this.cache.json.get('bullets_anim'));
        this.anims.fromJSON(this.cache.json.get('tanks_anim'));

        this.wall = this.matter.add.sprite(200, 200, 'wall', undefined, {
            isStatic: true,
        });

        this.cursor1 = this.input.keyboard?.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
            space: Input.Keyboard.KeyCodes.SPACE,
        }) as Types.Input.Keyboard.CursorKeys;
        this.tank = new Tank(this, 100, 100, COLOR_BLUE, this.cursor1, this.wall);
    };

    update(_: number, delta: number): void {
        this.tank.moveTank(delta);
        this.shot();

        // this.moveTank(delta);
    }

    // moveTank = (delta: number) => {
    //     const { right, left, up, down } = this.cursor1;
    //     const { rotation } = this.tankBase;

    //     if (right.isDown) this.tankBase.rotation += this.rotationTank * delta;
    //     if (left.isDown) this.tankBase.rotation -= this.rotationTank * delta;

    //     if (up.isDown) {
    //         this.tankBase.y -= Math.cos(rotation) * this.velocityTank * delta;
    //         this.tankBase.x += Math.sin(rotation) * this.velocityTank * delta;
    //     }

    //     if (down.isDown) {
    //         this.tankBase.y += Math.cos(rotation) * this.velocityTank * delta;
    //         this.tankBase.x -= Math.sin(rotation) * this.velocityTank * delta;
    //     }
    // };

    shot = () => {
        if (this.cursor1.space.isDown) {
            this.tank.anims.play('shot-bullet');
        }
    };
}
