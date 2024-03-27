import Phaser, { Scale } from 'phaser';
import { GameScene } from './scenes';
import { BootLoader } from './boot_loader';
import { Preload } from './preload';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1200,
    height: 800,
    backgroundColor: '#999',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0,
                x: 0,
            },
            setBounds: {
                left: true,
                right: true,
                top: true,
                bottom: true,
            },
            debug: import.meta.env.DEV,
        },
    },
    scene: [BootLoader, Preload, GameScene],
};

export default new Phaser.Game(config);
