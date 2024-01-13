import { httpRouter } from 'convex/server';
import { handleReplicateWebhook } from './music';
// Đoạn code này thiết lập một endpoint HTTP để xử lý các webhook đến liên quan đến việc sao chép nhạc
const http = httpRouter();
http.route({
  path: '/replicate_webhook',
  method: 'POST',
  handler: handleReplicateWebhook,
});
export default http;
