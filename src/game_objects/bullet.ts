import { Physics, Scene, Types } from 'phaser';

export class Bullet extends Physics.Matter.Sprite {
    constructor(scene: Scene, x: number, y: number, velX: number, velY: number) {
        super(scene.matter.world, x, y, 'bullets');
        scene.add.existing(this);
        scene.matter.body.setInertia(this.body as MatterJS.BodyType, Infinity);

        this.setScale(0.7);
        this.setFrictionAir(0);

        this.setVelocity(velX, velY);
        this.setBounce(1);

        setTimeout(() => this.anims.play('remove'), 5000);

        this.on('animationcomplete', (e: Types.Animations.Animation) => {
            if (e.key === 'remove') this.destroy();
        });
    }
}
