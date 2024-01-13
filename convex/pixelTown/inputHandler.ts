import { ObjectType, PropertyValidators, Value } from 'convex/values';
import type { Game } from './game';

//định nghĩa một hàm inputHandler dùng để khai báo các hàm xử lý đầu vào trong trò chơi.
export function inputHandler<ArgsValidator extends PropertyValidators, Return extends Value>(def: {
  args: ArgsValidator;
  handler: (game: Game, now: number, args: ObjectType<ArgsValidator>) => Return;
}) {
  return def;
}
