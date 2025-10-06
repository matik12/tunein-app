import { Outlet } from "@tanstack/react-router";
import { AudioPlayer, AudioPlayerProvider } from "../ui/audioPlayer";
import Container from "../ui/container";
import MusicIcon from "../icons/musicIcon";

const RootLayout = () => {
  return (
    <AudioPlayerProvider>
      <div className="bg-slate-900 text-white min-h-screen font-sans">
        <header className="py-4 border-b border-slate-800">
          <Container className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MusicIcon className="w-10 h-10 text-blue-500" />
              <h1 className="text-2xl font-bold tracking-tighter">
                TuneIn Radio
              </h1>
            </div>
          </Container>
        </header>

        <main>
          <Container className="py-6 pb-32">
            {/* Add padding-bottom to avoid overlap with player */}
            <Outlet />
          </Container>
        </main>

        {/* Audio Player is rendered here, outside the main content flow */}
        <AudioPlayer />
      </div>
    </AudioPlayerProvider>
  );
};

export default RootLayout;
