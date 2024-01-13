import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { agentTables } from './agent/schema';
import { pixelTownTables } from './pixelTown/schema';
import { conversationId, playerId } from './pixelTown/ids';
import { engineTables } from './engine/schema';
// định nghĩa một phần của schema database trong ứng dụng Convex. Nó tập trung vào việc lưu trữ thông tin về nhạc và tin nhắn, có thể liên quan đến trò chơi hoặc mô phỏng "Pixel Town".
export default defineSchema({
  music: defineTable({
    storageId: v.string(),
    type: v.union(v.literal('background'), v.literal('player')),
  }),

  messages: defineTable({
    conversationId,
    messageUuid: v.string(),
    author: playerId,
    text: v.string(),
  })
    .index('conversationId', ['conversationId'])
    .index('messageUuid', ['conversationId', 'messageUuid']),

  ...agentTables,
  ...pixelTownTables,
  ...engineTables,
});
