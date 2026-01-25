const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/background-video.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="video-overlay absolute inset-0" />
    </div>
  );
};

export default VideoBackground;
