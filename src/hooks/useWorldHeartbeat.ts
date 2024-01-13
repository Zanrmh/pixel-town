import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../convex/_generated/api';
import { WORLD_HEARTBEAT_INTERVAL } from '../../convex/constants';
// cung cấp một hook React gọi là useWorldHeartbeat để gửi nhịp tim định kỳ đến máy chủ nhằm duy trì trạng thái hoạt động của thế giới trong một ứng dụng Convex
export function useWorldHeartbeat() {
  const worldStatus = useQuery(api.world.defaultWorldStatus);
  const worldId = worldStatus?.worldId;

  // Send a periodic heartbeat to our world to keep it alive.
  const heartbeat = useMutation(api.world.heartbeatWorld);
  useEffect(() => {
    const sendHeartBeat = () => {
      if (!worldStatus) {
        return;
      }
      // Don't send a heartbeat if we've observed one sufficiently close
      // to the present.
      if (Date.now() - WORLD_HEARTBEAT_INTERVAL / 2 < worldStatus.lastViewed) {
        return;
      }
      void heartbeat({ worldId: worldStatus.worldId });
    };
    sendHeartBeat();
    const id = setInterval(sendHeartBeat, WORLD_HEARTBEAT_INTERVAL);
    return () => clearInterval(id);
    // Rerun if the `worldId` changes but not `worldStatus`, since don't want to
    // resend the heartbeat whenever its last viewed timestamp changes.
  }, [worldId, heartbeat]);
}
