import { Scene, Types, Physics } from 'phaser';
import { Bullet } from './bullet';
import { POWERUPS, TANKS_TYPE } from '@common/enums/index';
import { ifChangeAnimsTank, ifChangeFrameTank, ifChangeRefTank } from '@common/constants';

export class Tank extends Physics.Matter.Sprite {
    bullets: Bullet[];
    velocityBullets: number;
    rotationTank: number;
    velocityTank: number;
    controller: Types.Input.Keyboard.CursorKeys;
    bodyPhysics: MatterJS.BodyType;
    ref: TANKS_TYPE;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        color: number,
        controller: Types.Input.Keyboard.CursorKeys
    ) {
        super(scene.matter.world, x, y, 'tanks', 'tank_0');
        this.ref = TANKS_TYPE.DEFAULT;
        this.tint = color;
        this.bullets = [];
        this.controller = controller;
        this.velocityBullets = 4;
        this.velocityTank = 0.3;
        this.rotationTank = 0.003;
        this.setOrigin(0.5, 0.5);
        this.setScale(0.8);

        this.shotEndAnim(scene);

        this.bodyPhysics = this.body as MatterJS.BodyType;
        this.setFrictionAir(0.5);
        scene.add.existing(this);
    }

    move = (delta: number) => {
        const { right, left, up, down } = this.controller;
        const { rotation } = this;

        if (right.isDown) this.rotation += this.rotationTank * delta;
        if (left.isDown) this.rotation -= this.rotationTank * delta;

        if (up.isDown) {
            this.x += Math.cos(rotation) * this.velocityTank * delta;
            this.y += Math.sin(rotation) * this.velocityTank * delta;
        }

        if (down.isDown) {
            this.x += Math.cos(rotation) * this.velocityTank * delta * -1;
            this.y += Math.sin(rotation) * this.velocityTank * delta * -1;
        }
    };

    changeShot = (powerup: POWERUPS) => {
        this.ref = ifChangeRefTank[powerup];
        this.setFrame(ifChangeFrameTank[powerup]);
    };

    shot = () => {
        if (!this.controller.space.isDown) return;

        const anim = ifChangeAnimsTank[this.ref];
        if (!anim) return;

        if (anim === TANKS_TYPE.LASER) return this.shotLaser();
        if (anim === TANKS_TYPE.MINE) return this.shotMine();
        if (anim === TANKS_TYPE.MISIILE_CTRL) return this.shotMissileCtrl();
        if (anim === TANKS_TYPE.MISIILE) return this.shotMissile();

        this.anims.play(anim);
    };

    shotEndAnim = (scene: Scene) => {
        this.on('animationcomplete', (e: Types.Animations.Animation) => {
            if (e.key === 'shot-bullet') {
                this.bullets = this.bullets.filter((bullet) => bullet.visible);
                if (this.bullets.length >= 4) return;

                const rotationX = Math.cos(this.rotation);
                const rotationY = Math.sin(this.rotation);
                const velocityX = rotationX * this.velocityBullets * 1.8;
                const velocityY = rotationY * this.velocityBullets * 1.8;

                this.bullets.push(
                    new Bullet(
                        scene,
                        this.x + rotationX * (this.width / 1.4),
                        this.y + rotationY * this.height,
                        velocityX,
                        velocityY
                    )
                );
            }
        });
    };

    shotLaser = () => {
        console.log('shot laser');
    };

    shotMine = () => {
        console.log('shot laser');
    };

    shotMissileCtrl = () => {
        console.log('shot laser');
    };

    shotMissile = () => {
        console.log('shot laser');
    };
}
