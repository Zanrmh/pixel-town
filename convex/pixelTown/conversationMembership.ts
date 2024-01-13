import { ObjectType, v } from 'convex/values';
import { GameId, parseGameId, playerId } from './ids';

export const serializedConversationMembership = {
  playerId,
  invited: v.number(),
  status: v.union(
    v.object({ kind: v.literal('invited') }),
    v.object({ kind: v.literal('walkingOver') }),
    v.object({ kind: v.literal('participating'), started: v.number() }),
  ),
};
export type SerializedConversationMembership = ObjectType<typeof serializedConversationMembership>;

export class ConversationMembership {
  playerId: GameId<'players'>;
  invited: number;
  status:
    | { kind: 'invited' }
    | { kind: 'walkingOver' }
    | { kind: 'participating'; started: number };

  constructor(serialized: SerializedConversationMembership) {
    const { playerId, invited, status } = serialized;
    this.playerId = parseGameId('players', playerId);
    this.invited = invited;
    this.status = status;
  }
  // mô tả thành phần ConversationMembership, thể hiện sự tham gia của một người chơi trong một cuộc trò chuyện.
  serialize(): SerializedConversationMembership {
    const { playerId, invited, status } = this;
    return {
      playerId,
      invited,
      status,
    };
  }
}
