import { POWERUPS, TANKS_TYPE } from '@common/enums';

export const ifChangeRefTank: Record<POWERUPS, TANKS_TYPE> = {
    [POWERUPS.HEAVY]: TANKS_TYPE.HEAVY,
    [POWERUPS.LASER_MEGA]: TANKS_TYPE.LASER_MEGA,
    [POWERUPS.LASER]: TANKS_TYPE.LASER,
    [POWERUPS.MINE]: TANKS_TYPE.MINE,
    [POWERUPS.MINIGUN]: TANKS_TYPE.MINIGUN,
    [POWERUPS.MISIILE_CTRL]: TANKS_TYPE.MISIILE_CTRL,
    [POWERUPS.MISIILE]: TANKS_TYPE.MISIILE,
    [POWERUPS.SHUTGUN]: TANKS_TYPE.SHUTGUN,
    [POWERUPS.WALL_DESTROY]: TANKS_TYPE.WALL_DESTROY,
};

export const ifChangeFrameTank: Record<POWERUPS, string> = {
    [POWERUPS.HEAVY]: 'tank-heavy_0',
    [POWERUPS.LASER_MEGA]: 'tank-laser-mega_0',
    [POWERUPS.LASER]: 'tank-laser',
    [POWERUPS.MINE]: 'tank-mine',
    [POWERUPS.MINIGUN]: 'tank-minigun_0',
    [POWERUPS.MISIILE_CTRL]: 'tank-missile-ctrl',
    [POWERUPS.MISIILE]: 'tank-missile',
    [POWERUPS.SHUTGUN]: 'tank-shutgun_0',
    [POWERUPS.WALL_DESTROY]: 'tank_0',
};

export const ifChangeAnimsTank: Record<TANKS_TYPE, string | null> = {
    [TANKS_TYPE.DEFAULT]: 'shot-bullet',
    [TANKS_TYPE.HEAVY]: 'shot-heavy',
    [TANKS_TYPE.LASER_MEGA]: 'shot-laser-mega',
    [TANKS_TYPE.MINIGUN]: 'shot-minigun',
    [TANKS_TYPE.SHUTGUN]: 'shot-shutgun',
    [TANKS_TYPE.LASER]: TANKS_TYPE.LASER,
    [TANKS_TYPE.MINE]: TANKS_TYPE.MINE,
    [TANKS_TYPE.MISIILE_CTRL]: TANKS_TYPE.MISIILE_CTRL,
    [TANKS_TYPE.MISIILE]: TANKS_TYPE.MISIILE,
    [TANKS_TYPE.WALL_DESTROY]: null,
};
