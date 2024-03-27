import { GameObjects, Scene, Types, Math as PhaserMath, Input } from 'phaser';
import { Bullet, Tank } from '../game_objects/index';
import { POWERUPS } from '@common/enums/index';

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

        const powerup = this.matter.add
            .sprite(400, 400, 'power-ups', POWERUPS.HEAVY, {
                isStatic: true,
            })
            .setScale(1.5);

        this.cursor1 = this.input.keyboard?.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
            space: Input.Keyboard.KeyCodes.SPACE,
        }) as Types.Input.Keyboard.CursorKeys;
        this.tank = new Tank(this, 100, 100, COLOR_BLUE, this.cursor1);

        this.tank.setOnCollideWith(powerup, () => {
            this.tank.changeShot(POWERUPS.HEAVY);
            powerup.destroy();
        });
    };

    update(_: number, delta: number): void {
        this.tank.move(delta);
        this.tank.shot();
    }
}
