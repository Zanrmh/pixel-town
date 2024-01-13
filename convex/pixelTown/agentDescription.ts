import { ObjectType, v } from 'convex/values';
import { GameId, agentId, parseGameId } from './ids';

//Định nghĩa một lớp AgentDescription để mô tả thông tin cơ bản về một nhân vật (agent) trong trò chơi.

export class AgentDescription {
  agentId: GameId<'agents'>;
  identity: string;
  plan: string;

  constructor(serialized: SerializedAgentDescription) {
    const { agentId, identity, plan } = serialized;
    this.agentId = parseGameId('agents', agentId);
    this.identity = identity;
    this.plan = plan;
  }

  serialize(): SerializedAgentDescription {
    const { agentId, identity, plan } = this;
    return {
      agentId: this.agentId,
      identity: this.identity,
      plan: this.plan,
    };
  }
}

export const serializedAgentDescription = {
  agentId,
  identity: v.string(),
  plan: v.string(),
};
export type SerializedAgentDescription = ObjectType<typeof serializedAgentDescription>;
