import { Scene } from 'phaser';
import { Preload } from './preload';

export class BootLoader extends Scene {
    constructor() {
        super({ key: BootLoader.name });
    }

    create = () => {
        this.scene.start(Preload.name);
    };
}
