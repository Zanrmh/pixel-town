import { FieldConfig } from '../engine/historicalObject';
import { Player } from './player';

// Tệp này tập trung vào việc biểu diễn và quản lý vị trí của các đối tượng trong trò chơi, cụ thể là vị trí của người chơi.
export type Location = {
  // Unpacked player position.
  x: number;
  y: number;

  // Normalized facing vector.
  dx: number;
  dy: number;

  speed: number;
};

export const locationFields: FieldConfig = [
  { name: 'x', precision: 8 },
  { name: 'y', precision: 8 },
  { name: 'dx', precision: 8 },
  { name: 'dy', precision: 8 },
  { name: 'speed', precision: 16 },
];

export function playerLocation(player: Player): Location {
  return {
    x: player.position.x,
    y: player.position.y,
    dx: player.facing.dx,
    dy: player.facing.dy,
    speed: player.speed,
  };
}
