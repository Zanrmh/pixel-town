# Kiến Trúc

Tài liệu này khám phá kiến trúc tổng quan của Pixel Town và các lớp khác nhau của nó. Chúng tôi sẽ
bắt đầu với một tổng quan ngắn gọn và sau đó đi sâu vào từng thành phần. Tổng quan sẽ
đủ để sử dụng Pixel Town và thay đổi hành vi của trò chơi hoặc nhân vật. Đọc tiếp phần sâu hơn
nếu bạn quan tâm hoặc gặp giới hạn của bộ động cơ.

Tài liệu này giả định rằng người đọc có kiến thức cơ bản về Convex. Nếu bạn mới làm quen với Convex, hãy xem
hướng dẫn Convex để bắt đầu.

## Tổng Quan

Pixel Town được chia thành một số lớp:

Lớp logic trò chơi phía server trong convex/aiTown: Lớp này định nghĩa trạng thái mà Pixel Town duy trì,
cách nó phát triển theo thời gian, và cách nó phản ứng với đầu vào của người dùng. Cả con người và nhân vật tự động đều gửi đầu vào
mà bộ động cơ trò chơi xử lý.
Giao diện người dùng trò chơi phía client trong src/: Pixel Town sử dụng pixi-react để hiển thị trạng thái trò chơi
cho người dùng qua trình duyệt.
Bộ động cơ trò chơi trong convex/engine: Để dễ dàng tùy chỉnh luật trò chơi, chúng tôi đã tách
bộ động cơ trò chơi ra khỏi luật trò chơi cụ thể của Pixel Town. Bộ động cơ trò chơi có trách nhiệm lưu và tải trạng thái trò chơi từ cơ sở dữ liệu, điều phối việc đưa đầu vào vào bộ động cơ,
và thực sự chạy bộ động cơ trò chơi trong các hàm Convex.
Nhân vật trong convex/agent: Nhân vật chạy như một phần của vòng lặp trò chơi, và có thể khởi động các
hàm Convex bất đồng bộ để xử lý công việc dài hơn, như nói chuyện với LLM. Những hàm này có thể lưu trạng thái
trong bảng riêng biệt, hoặc gửi đầu vào vào bộ động cơ trò chơi để thay đổi trạng thái trò chơi. Nội bộ, nhân vật của chúng tôi
sử dụng sự kết hợp của hệ thống dựa trên quy tắc đơn giản và nói chuyện với LLM.
Vì vậy, nếu bạn muốn điều chỉnh hành vi của nhân vật nhưng giữ nguyên cơ chế trò chơi, hãy xem convex/agent
để thấy công việc bất đồng bộ, và convex/aiTown/agent.ts cho logic vòng lặp trò chơi.
Nếu bạn muốn thêm các yếu tố chơi game mới (mà cả con người và nhân vật đều có thể tương tác), hãy
thêm tính năng vào convex/aiTown, hiển thị nó trong giao diện người dùng ở src/, và phản ứng với nó trong convex/aiTown/agent.ts.

Nếu bạn có phần trò chơi nhạy cảm với độ trễ, bạn có thể di chuyển chúng ra khỏi bộ động cơ
vào các bảng, truy vấn, và biến đổi Convex thông thường, chỉ ghi lại các điểm quan trọng vào trạng thái trò chơi. Xem
"Mô hình dữ liệu tin nhắn" bên dưới cho ví dụ.

## Logic Trò Chơi Pixel Town (convex/aiTown)

### Mô Hình Dữ Liệu

Mô hình dữ liệu của Pixel Town có một số khái niệm:

Thế giới (convex/aiTown/world.ts) đại diện cho một bản đồ với nhiều người chơi tương tác với nhau.
Người chơi (convex/aiTown/player.ts) là nhân vật chính trong trò chơi. Người chơi có tên và
mô tả đọc được, và có thể được liên kết với một người dùng con người. Tại bất kỳ thời điểm nào, một người chơi có thể đang điều hướng
đến một điểm đến và có một vị trí hiện tại.
Cuộc trò chuyện (convex/aiTown/conversations.ts) được tạo bởi một người chơi và kết thúc vào một thời điểm nào đó.
Thành viên cuộc trò chuyện (convex/aiTown/conversationMembership.ts) chỉ ra rằng một người chơi là thành viên
của một cuộc trò chuyện. Người chơi chỉ có thể ở trong một cuộc trò chuyện tại bất kỳ thời điểm nào, và cuộc trò chuyện
hiện tại có đúng hai thành viên. Thành viên có thể ở trong một trong ba trạng thái:
invited: Người chơi đã được mời vào cuộc trò chuyện nhưng chưa chấp nhận.
walkingOver: Người chơi đã chấp nhận lời mời vào cuộc trò chuyện nhưng còn quá xa để nói chuyện. Người chơi sẽ tự động tham gia cuộc trò chuyện khi họ đủ gần.
participating: Người chơi đang tham gia tích cực vào cuộc trò chuyện.

### Sơ Đồ

Có ba loại chính của bảng:

Bảng động cơ (convex/engine/schema.ts) để duy trì trạng thái nội bộ của động cơ.
Bảng trò chơi (convex/aiTown/schema.ts) cho trạng thái trò chơi. Để giữ trạng thái trò chơi nhỏ gọn và hiệu quả để
đọc và viết, chúng tôi lưu mô hình dữ liệu của Pixel Town qua một số bảng. Xem convex/aiTown/schema.ts để biết tổng quan.
Bảng nhân vật (convex/agent/schema.ts) cho trạng thái nhân vật. Nhân vật có thể tự do đọc và viết vào các bảng này
trong các hành động của họ.

### Đầu vào (convex/aiTown/inputs.ts)

Pixel Town sửa đổi mô hình dữ liệu của mình bằng cách xử lý đầu vào. Đầu vào được gửi bởi người chơi và đại diện và được xử lý bởi trình động cơ trò chơi. Chúng tôi xác định đầu vào trong đối tượng inputs trong convex/aiTown/inputs.ts. Sử dụng hàm inputHandler để xây dựng một trình xử lý đầu vào, chỉ định một bộ xác nhận Convex cho các đối số để đảm bảo an toàn kiểu từ đầu đến cuối.

Tham gia (join) và rời khỏi (leave) trò chơi.
Di chuyển một người chơi đến một vị trí cụ thể (moveTo): Di chuyển trong Pixel Town tương tự như trò chơi RTS, nơi người chơi chỉ định nơi họ muốn đến, và động cơ tìm ra cách để đến đó.
Bắt đầu một cuộc trò chuyện (startConversation), chấp nhận lời mời (acceptInvite), từ chối lời mời (rejectInvite), và rời khỏi cuộc trò chuyện (leaveConversation). Để theo dõi chỉ báo đánh máy, bạn sử dụng startTyping và finishSendingMessage. Những cái này được nhập từ game/conversations.ts.
Đầu vào của đại diện được nhập từ aiTown/agentInputs.ts cho những việc như nhớ cuộc trò chuyện, quyết định phải làm gì, v.v.
Phương thức thực hiện của từng đầu vào này kiểm tra các điều kiện không thay đổi và cập nhật trạng thái trò chơi theo ý muốn. Ví dụ, đầu vào moveTo kiểm tra xem người chơi có đang tham gia cuộc trò chuyện hay không, ném lỗi nói với họ phải rời khỏi cuộc trò chuyện trước nếu vậy, và sau đó cập nhật trạng thái tìm đường của họ với điểm đến mong muốn.

### Mô phỏng

Ngoài việc xử lý đầu vào của người chơi, trạng thái trò chơi có thể thay đổi theo thời gian trong nền khi mô phỏng chạy thời gian về phía trước. Ví dụ, nếu một người chơi đã quyết định di chuyển dọc theo một con đường, vị trí của họ sẽ dần dần cập nhật khi thời gian trôi đi. Tương tự, nếu hai người chơi va vào nhau, họ sẽ nhận thấy và lập kế hoạch lại con đường của mình, cố gắng tránh các chướng ngại vật.

### Mô hình dữ liệu tin nhắn

Chúng tôi quản lý các bảng theo dõi tin nhắn trò chuyện trong các bảng riêng biệt không liên quan đến động cơ trò chơi. Điều này vì một số lý do:

Mô phỏng cốt lõi không cần biết về tin nhắn, vì vậy việc giữ chúng ra ngoài giúp trạng thái trò chơi nhỏ gọn.
Tin nhắn được cập nhật rất thường xuyên (khi phát ra từ OpenAI) và được hưởng lợi từ độ trễ đầu vào thấp, vì vậy chúng không phù hợp với động cơ.
Xem "Mục tiêu thiết kế và hạn chế" bên dưới.
Tin nhắn (convex/schema.ts) nằm trong một cuộc trò chuyện và chỉ ra tác giả và văn bản tin nhắn. Mỗi cuộc trò chuyện có một trạng thái đánh máy trong bảng cuộc trò chuyện cho biết một người chơi hiện đang đánh máy. Người chơi vẫn có thể gửi tin nhắn trong khi người chơi khác đang đánh máy, nhưng việc có chỉ báo giúp đại diện (và con người) không nói chồng lên nhau.

Các bảng riêng biệt được truy vấn và sửa đổi bằng các truy vấn và đột biến Convex thông thường không trực tiếp đi qua mô phỏng.

## Động cơ trò chơi (convex/engine)

Dựa trên mô tả về hành vi trò chơi Pixel Town trong phần trước, lớp AbstractGame trong convex/engine/abstractGame.ts thực hiện việc chạy mô phỏng thực sự. Động cơ trò chơi có một số trách nhiệm:

Phối hợp đầu vào người chơi đến, đưa chúng vào mô phỏng, và gửi kết quả của chúng (hoặc lỗi) đến máy khách.
Chạy mô phỏng theo thời gian.
Lưu và tải trạng thái trò chơi từ cơ sở dữ liệu.
Quản lý việc thực hiện hành vi trò chơi, sử dụng hiệu quả nguồn lực Convex và giảm thiểu độ trễ đầu vào.
Hành vi trò chơi của Pixel Town được thực hiện trong lớp con Game.

### Xử lý đầu vào

Người dùng gửi đầu vào thông qua hàm insertInput, đưa chúng vào bảng inputs, gán một số đầu vào duy nhất tăng đơn điệu và đóng dấu đầu vào với thời gian máy chủ nhận được. Sau đó, động cơ xử lý đầu vào, ghi kết quả của chúng trở lại hàng inputs. Khách hàng quan tâm có thể đăng ký trạng thái của một đầu vào với truy vấn inputStatus.

Game cung cấp một phương thức trừu tượng handleInput mà AiTown triển khai với hành vi cụ thể của nó.

### Chạy mô phỏng

Lớp Game chỉ định cách nó mô phỏng thời gian về phía trước với phương thức tick:

tick(now) chạy mô phỏng về phía trước cho đến thời điểm đã cho.
Ticks được chạy với tần suất cao, có thể cấu hình với tickDuration (mili giây). Vì Pixel Town có chuyển động mượt mà cho việc di chuyển người chơi, nó chạy 60 ticks mỗi giây.
Việc phân chia logic trò chơi thành các hệ thống riêng biệt mà có thể được tiến triển độc lập là một ý tưởng tốt. Ví dụ, phương thức tick của Pixel Town thúc đẩy việc tìm đường với Player.tickPathfinding, vị trí của người chơi với Player.tickPosition, cuộc trò chuyện với Conversation.tick, và logic đại lý với Agent.tick.
Để tránh việc thực hiện một đột biến Convex 60 lần mỗi giây (điều này sẽ tốn kém và chậm), động cơ tích hợp nhiều tích vào một bước. Pixel Town chỉ chạy các bước một lần mỗi giây. Dưới đây là cách thức một bước hoạt động:

Tải trạng thái trò chơi vào bộ nhớ.
Quyết định thời gian chạy.
Thực hiện nhiều tích cho khoảng thời gian của chúng ta, xen kẽ giữa việc cấp dữ liệu vào với handleInput và thúc đẩy mô phỏng với tick.
Viết trạng thái trò chơi cập nhật trở lại cơ sở dữ liệu.
Một bất biến cốt lõi là động cơ trò chơi hoàn toàn "đơn luồng" cho mỗi thế giới, vì vậy không bao giờ có hai lần chạy bước của động cơ chồng lên nhau về thời gian. Không cần phải suy nghĩ về các điều kiện đua hoặc đồng thời làm cho viết mã động cơ trò chơi dễ dàng hơn nhiều.

Tuy nhiên, việc bảo tồn bất biến này là một chút tinh vi. Nếu động cơ đang nhàn rỗi trong một phút và một đầu vào đến, chúng ta muốn chạy động cơ ngay lập tức nhưng sau đó hủy bỏ nó sau khi phút đó kết thúc. Nếu chúng ta không cẩn thận, một điều kiện đua có thể gây ra chúng ta chạy nhiều bản sao của động cơ nếu một đầu vào đến ngay khi hết giờ nhàn rỗi!

Cách tiếp cận của chúng ta là lưu trữ một số thế hệ với động cơ tăng dần theo thời gian. Tất cả các lần chạy động cơ đã lên lịch chứa số thế hệ mong đợi của chúng như một đối số. Sau đó, nếu chúng ta muốn hủy bỏ một lần chạy động cơ trong tương lai, chúng ta có thể tăng số thế hệ lên một, và sau đó chúng ta được đảm bảo rằng lần chạy tiếp theo sẽ thất bại ngay lập tức khi nó nhận thấy rằng số thế hệ của động cơ không khớp với số mong đợi của nó.

### Quản lý trạng thái động cơ

Các lớp World, Player, Conversation, và Agent phối hợp tải dữ liệu vào bộ nhớ từ cơ sở dữ liệu, chỉnh sửa nó theo quy tắc trò chơi, và tuần tự hóa nó để viết trở lại ra cơ sở dữ liệu. Dưới đây là dòng chảy:

Bộ lập lịch Convex gọi hành động convex/aiTown/main.ts:runStep.
Hành động runStep gọi convex/aiTown/game.ts:loadWorld để tải trạng thái trò chơi hiện tại. Truy vấn này gọi Game.load, nạp tất cả trạng thái trò chơi của một thế giới từ các bảng thích hợp, và trả về một đối tượng GameState, chứa các phiên bản tuần tự hóa của tất cả các người chơi, đại lý, v.v.
Hành động runStep truyền GameState cho hàm tạo Game, phân tích các phiên bản tuần tự hóa của tất cả các đối tượng trò chơi của chúng ta sử dụng các hàm tạo của họ. Ví dụ, new Player(serializedPlayer) phân tích biểu diễn cơ sở dữ liệu thành lớp Player trong bộ nhớ.
Động cơ chạy mô phỏng, chỉnh sửa các đối tượng trò chơi trong bộ nhớ.
Ở cuối một bước, khuôn khổ gọi Game.saveStep, tính toán một sự khác biệt của trạng thái trò chơi kể từ đầu bước và truyền sự khác biệt đó đến đột biến convex/aiTown/game.ts:saveWorld.
Đột biến saveWorld áp dụng sự khác biệt đó vào cơ sở dữ liệu, chú ý nếu có bất kỳ đối tượng nào bị xóa cần được lưu trữ, cập nhật đồ thị participatedTogether, và khởi động bất kỳ công việc lịch trình nào để chạy.
Vì động cơ là người chỉnh sửa duy nhất của trạng thái trò chơi, nó tiếp tục chạy các bước trong một khoảng thời gian mà không lặp lại các bước 1 đến 3 một lần nữa.
Giống như chúng ta giả định rằng động cơ trò chơi là "đơn luồng", chúng ta cũng giả định rằng động cơ trò chơi chỉ có các bảng lưu trữ trạng thái động cơ trò chơi. Chỉ có động cơ trò chơi mới nên lập trình chỉnh sửa những bảng này, vì vậy các thành phần bên ngoài động cơ chỉ có thể biến đổi chúng bằng cách gửi đầu vào.

### Bảng Lịch sử

Nếu chúng ta chỉ ghi các cập nhật vào cơ sở dữ liệu vào cuối mỗi bước, và các bước chỉ chạy một lần mỗi giây, các đại lượng liên tục như vị trí sẽ chỉ cập nhật mỗi giây một lần. Điều này, vì thế, phá hủy mục đích chính của việc có các tích tắc (ticks) tần suất cao: Vị trí của người chơi sẽ nhảy múa và trông giật gân.

Để giải quyết điều này, chúng ta theo dõi các giá trị lịch sử của các đại lượng như vị trí trong mỗi bước, lưu trữ giá trị vào cuối mỗi tích tắc. Sau đó, máy khách nhận cả giá trị hiện tại và giá trị lịch sử của bước trước, và có thể "phát lại" lịch sử để làm cho chuyển động mượt mà hơn.

Trò chơi theo dõi các đại lượng này tại cuối mỗi tích tắc bằng cách đưa chúng vào một HistoricalObject. Đối tượng này theo dõi các thay đổi theo thời gian một cách hiệu quả và tuần tự hóa chúng vào một bộ đệm mà máy khách có thể sử dụng để phát lại lịch sử của nó. Có một số hạn chế đối với HistoricalObject:

Các đối tượng lịch sử chỉ có thể có giá trị số (dạng số thực) và không thể có các đối tượng lồng nhau hoặc trường tùy chọn.
Các đối tượng lịch sử phải khai báo những trường nào họ muốn theo dõi.
Chúng tôi lưu trữ "vị trí" của mỗi người chơi (tức là vị trí, hướng và tốc độ của họ) trong một HistoricalObject và ghi nó vào tài liệu worlds vào cuối mỗi bước khi tính toán sự khác biệt.

## Giao diện người dùng trò chơi phía máy khách (src/)

Một nguyên tắc hướng dẫn cho kiến trúc Pixel Town là giữ việc sử dụng càng gần với việc sử dụng "Convex thông thường" càng tốt. Vì vậy, trạng thái trò chơi được lưu trữ trong các bảng thông thường, và giao diện người dùng chỉ sử dụng các móc useQuery thông thường để tải trạng thái đó và hiển thị nó trong giao diện người dùng.

Một ngoại lệ là đối với các bảng lịch sử, chúng cung cấp trạng thái mới nhất vào một móc useHistoricalValue phân tích bộ đệm lịch sử và phát lại thời gian về phía trước cho chuyển động mượt mà. Để giữ thời gian phát lại đồng bộ giữa nhiều bộ đệm lịch sử, chúng tôi cung cấp một móc useHistoricalTime cho phần trên cùng của ứng dụng của bạn giữ theo dõi thời gian hiện tại và trả lại nó cho bạn để chuyển xuống các thành phần.

Chúng tôi cũng cung cấp một móc useSendInput bọc useMutation và tự động gửi đầu vào đến máy chủ và đợi động cơ xử lý chúng và trả lại kết quả của chúng.

## Kiến trúc đại lý (convex/agent)

### Vòng lặp đại lý (convex/game/agents.ts)

Các đại lý sẽ thực hiện bất kỳ thay đổi trạng thái trò chơi nào, và lên lịch các hoạt động để làm bất cứ điều gì yêu cầu một yêu cầu lâu dài hoặc truy cập các bảng không phải trò chơi. Dòng chảy nói chung là:

Logic trong Agent.tick có thể đọc và sửa đổi trạng thái trò chơi khi thời gian tiến triển, chẳng hạn như chờ đợi cho đến khi đại lý ở gần người chơi khác để bắt đầu nói chuyện.
Khi có điều gì đó cần nói chuyện với một LLM hoặc đọc/ghi dữ liệu bên ngoài, nó gọi startOperation với một tham chiếu đến một hàm Convex: thường là một internalAction.
Hàm này có thể đọc trạng thái từ các bảng trò chơi và các bảng khác thông qua các hàm internalQuery.
Nó thực hiện các nhiệm vụ kéo dài, và có thể viết dữ liệu thông qua internalMutation. Trạng thái trò chơi không nên được viết, mà nên được gửi qua inputs (được mô tả trong phần trước).
Các đầu vào được gửi từ các hành động với ctx.runMutation(api.game.main.sendInput, {...}) từ các hành động hoặc thông qua insertInput từ các đột biến. Chúng được tham chiếu bằng tên của chúng dưới dạng một chuỗi, như moveTo.
Các đầu vào được xác định với inputHandler và được cấp một phiên bản của trò chơi AiTown để sửa đổi, tương tự như vòng lặp trò chơi. Thực tế, những điều này được gọi là một phần của vòng lặp trò chơi trước tickAgent.
Khi một hoạt động được thực hiện, nó xóa inProgressOperation. Điều này là để đảm bảo rằng một đại lý chỉ cố gắng làm một việc một lúc.
Agent.tick sau đó có thể quan sát trạng thái trò chơi mới và tiếp tục đưa ra quyết định.
Cuộc trò chuyện (convex/agent/conversations.ts)
Mã đại lý gọi vào lớp cuộc trò chuyện, thực hiện kỹ thuật đặt câu hỏi để tiêm cá tính và ký ức vào các phản hồi GPT. Nó có các chức năng để bắt đầu một cuộc trò chuyện (startConversation), tiếp tục sau tin nhắn đầu tiên (continueConversation), và lịch sự rời khỏi một cuộc trò chuyện (leaveConversation). Mỗi chức năng tải dữ liệu có cấu trúc từ cơ sở dữ liệu, truy vấn lớp ký ức cho ý kiến của đại lý về người chơi họ đang nói chuyện, và sau đó gọi

### Cuộc trò chuyện (convex/agent/conversations.ts)

Mã nguồn của đại lý gọi vào lớp cuộc trò chuyện, nơi thực hiện kỹ thuật xây dựng lời nhắc để đưa tính cách và ký ức vào các phản hồi của GPT. Nó có các chức năng để bắt đầu một cuộc trò chuyện (startConversation), tiếp tục sau tin nhắn đầu tiên (continueConversation), và rời cuộc trò chuyện một cách lịch sự (leaveConversation). Mỗi chức năng tải dữ liệu có cấu trúc từ cơ sở dữ liệu, truy vấn lớp ký ức để xác định ý kiến của đại lý về người chơi mà họ đang trò chuyện, sau đó gọi vào khách hàng OpenAI (convex/util/openai.ts).

### Ký ức (convex/agent/memory.ts)

Sau mỗi cuộc trò chuyện, GPT tóm tắt lịch sử tin nhắn của nó, và chúng tôi tính toán một embedding của văn bản tóm tắt và ghi nó vào cơ sở dữ liệu vector của Convex. Sau đó, khi bắt đầu một cuộc trò chuyện mới với Danny, chúng tôi nhúng "Bạn nghĩ gì về Danny?", tìm ba ký ức tương tự nhất, và lấy văn bản tóm tắt của chúng để đưa vào lời nhắc cuộc trò chuyện.

### Bộ nhớ đệm Embedding (convex/agent/embeddingsCache.ts)

Để tránh việc tính toán cùng một embedding đi đi lại lại, chúng tôi lưu trữ các embedding bằng cách sử dụng băm văn bản của chúng trong một bảng Convex.

### Mục tiêu và hạn chế trong thiết kế

Động cơ trò chơi Pixel Town có một số mục tiêu thiết kế:

Cố gắng giữ cho ứng dụng gần với ứng dụng Convex thông thường nhất có thể. Sử dụng các hook khách hàng thông thường (như useQuery) khi có thể và lưu trạng thái trò chơi trong các bảng thông thường.
Cố gắng giống với các động cơ hiện có càng nhiều càng tốt, để dễ dàng thay đổi hành vi. Chúng tôi chọn mô hình dựa trên tick() cho mô phỏng vì nó thường được sử dụng ở nơi khác và trực quan.
Tách rời hành vi của đại lý khỏi động cơ trò chơi. Thật tuyệt khi cho phép người chơi con người và đại lý AI làm tất cả những điều giống nhau trong trò chơi.
Những mục tiêu thiết kế này ngụ ý một số hạn chế cố hữu:

Tất cả dữ liệu được tải vào bộ nhớ mỗi bước. Trạng thái trò chơi hoạt động được tải bởi trò chơi phải đủ nhỏ để vừa với bộ nhớ và cần được tải và lưu thường xuyên. Hãy cố gắng giữ trạng thái trò chơi dưới vài chục kilobyte: Trò chơi yêu cầu hàng chục nghìn đối tượng tương tác với nhau có thể không phải là một sự phù hợp tốt.
Tất cả đầu vào được cung cấp qua cơ sở dữ liệu trong bảng inputs, vì vậy các ứng dụng yêu cầu đầu vào rất lớn hoặc thường xuyên có thể không phải là sự phù hợp tốt.
Độ trễ đầu vào sẽ khoảng một RTT (thời gian để đầu vào đến máy chủ và phản hồi trở lại) cộng với một nửa kích thước bước (để chờ đợi đầu vào máy chủ khi đầu vào đang chờ bước tiếp theo). Các giá trị lịch sử thêm một nửa kích thước bước của độ trễ đầu vào vì giá trị của chúng được xem một chút trong quá khứ. Như được cấu hình, điều này sẽ khoảng 1,5 giây độ trễ đầu vào, điều này sẽ không phù hợp cho trò chơi cạnh tranh. Bạn có thể cấu hình kích thước bước nhỏ hơn (ví dụ: 250ms) sẽ giảm độ trễ đầu vào nhưng tăng thêm cuộc gọi hàm Convex và băng thông cơ sở dữ liệu.
Động cơ trò chơi được thiết kế để là đơn luồng. JavaScript hoạt động trên các đối tượng đơn giản trong bộ nhớ có thể nhanh chóng đáng ngạc nhiên, nhưng nếu mô phỏng của bạn rất tốn kém về mặt tính toán, nó có thể không phải là sự phù hợp tốt trên động cơ Pixel Town hiện nay.
