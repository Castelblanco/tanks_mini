import { Scene } from 'phaser';
import { GameScene } from './scenes';

export class Preload extends Scene {
    constructor() {
        super({ key: Preload.name });
    }

    preload = () => {
        this.load.setPath('images');

        this.load.image('wall', 'wall.png');

        // Load Spritesheet
        this.importSpriteSheet('tanks', true);
        this.importSpriteSheet('bullets', true);
        this.importSpriteSheet('tanks-missile-laser');
        this.importSpriteSheet('power-ups');

        // this.load.on('progress', (p: number) => {
        //     console.log(p);
        // });
    };

    create = () => this.scene.start(GameScene.name);

    importSpriteSheet = (name: string, anims?: boolean) => {
        if (anims) this.load.json(`${name}_anim`, `sprite_sheets/${name}/anim.json`);
        this.load.atlas(
            name,
            `sprite_sheets/${name}/image.png`,
            `sprite_sheets/${name}/atlas.json`
        );
    };
}
