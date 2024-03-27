import { GameObjects, Scene, Types, Physics } from 'phaser';
import { Bullet } from './bullet';

const TANK_WIDTH = 50;

export class Tank extends Physics.Matter.Sprite {
    bullets: Bullet[];
    velocityBullets: number;
    rotationTank: number;
    velocityTank: number;
    controller: Types.Input.Keyboard.CursorKeys;
    bodyPhysics: MatterJS.BodyType;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        color: number,
        controller: Types.Input.Keyboard.CursorKeys,
        wall: GameObjects.Sprite
    ) {
        super(scene.matter.world, x, y, 'tanks', 'tank_0');

        this.tint = color;
        this.bullets = [];
        this.controller = controller;
        this.velocityBullets = 4;
        this.velocityTank = 0.3;
        this.rotationTank = 0.003;
        this.setOrigin(0.5, 0.5);

        this.on('animationcomplete', (e: Types.Animations.Animation) => {
            if (e.key === 'shot-bullet') {
                this.bullets = this.bullets.filter((bullet) => bullet.visible);
                if (this.bullets.length >= 4) return;

                const { rotation } = this;
                const rotationX = Math.cos(rotation);
                const rotationY = Math.sin(rotation);
                const velocityX = rotationX * this.velocityBullets * 2;
                const velocityY = rotationY * this.velocityBullets * 2;

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

        this.bodyPhysics = this.body as MatterJS.BodyType;
        this.setFrictionAir(0.5);
        scene.add.existing(this);
    }

    moveTank = (delta: number) => {
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
}
