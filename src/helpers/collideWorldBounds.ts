import { Math } from 'phaser';

export const collideWorldBounds = (x: number, limit: number) => Math.Clamp(x, 0, limit);
