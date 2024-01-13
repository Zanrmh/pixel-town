import Game from './components/Game.tsx';

import { ToastContainer } from 'react-toastify';
import helpImg from '../assets/help.svg';
import { useState } from 'react';
import ReactModal from 'react-modal';
import MusicButton from './components/buttons/MusicButton.tsx';
import Button from './components/buttons/Button.tsx';
import FreezeButton from './components/FreezeButton.tsx';
import { MAX_HUMAN_PLAYERS } from '../convex/constants.ts';

export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between font-body game-background">
      <ReactModal
        isOpen={helpModalOpen}
        onRequestClose={() => setHelpModalOpen(false)}
        style={modalStyles}
        contentLabel="Help modal"
        ariaHideApp={false}
      >
        <div className="font-body">
          <h1 className="text-center text-6xl font-bold font-display game-title">Ho Tro</h1>
          <p className="text-3xl">Chào mừng đến với Thị Trấn Pixel (Pixel Town).</p>
          <h2 className="text-4xl mt-4 game-title">Giới thiệu:</h2>
          <p className="text-2xl">
            Pixel Town là một game mô phỏng những cuộc trò chuyện của con người. Những nhân vật
            trong đó được training tính cách và sở thích khác nhau, nhờ OpenAI để có thể tạo các
            cuộc hội thoại mới. Cuộc hội thoại sẽ được bắt đầu khi 2 nhân vật đến gần nhau.
          </p>
          <h2 className="text-4xl mt-4 game-title">Cách Chơi:</h2>
          <p className="text-2xl">
            Kéo và thả chuột để di chuyển quanh thị trấn, cuộn chuột vào và ra để thu phóng. Bạn có
            thể nhập vào nhân vật để xem lịch sử trò chuyện của họ.
          </p>
          <p className="text-2xl mt-4">
            Thị Trấn Pixel chỉ hỗ trợ tối đa {MAX_HUMAN_PLAYERS} người chơi một lúc.
          </p>
        </div>
      </ReactModal>
      <div className="w-full min-h-screen relative isolate overflow-hidden p-6 lg:px-8 lg:py-0 shadow-2xl flex flex-col justify-center">
        <h1 className="mx-auto text-center text-6xl sm:text-7xl lg:text-8xl font-bold font-display leading-none tracking-wide game-title">
          Pixel Town
        </h1>

        <p className="text-3xl max-w-xs md:max-w-xl lg:max-w-none mx-auto text-center sm:text-3xl md:text-4xl text-white leading-tight shadow-solid">
          Một thị trấn ảo, nơi các nhân vật AI sinh sống, trò chuyện và giao lưu.
        </p>

        <Game />

        <footer className="absolute bottom-0 left-0 w-full flex items-center mt-4 gap-3 p-6 flex-wrap pointer-events-none">
          <div className="flex gap-4 flex-grow pointer-events-none">
            <FreezeButton />
            <MusicButton />
            <Button imgUrl={helpImg} onClick={() => setHelpModalOpen(true)}>
              Hỗ trợ
            </Button>
          </div>
        </footer>
        <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
      </div>
    </main>
  );
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 75%)',
    zIndex: 12,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',

    border: '10px solid rgb(23, 20, 33)',
    borderRadius: '0',
    background: 'rgb(35, 38, 58)',
    color: 'white',
    fontFamily: '"Upheaval Pro", "sans-serif"',
  },
};
