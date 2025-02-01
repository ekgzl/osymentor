"use client";

export function VideoCard1Comp() {
  return (
    <div className={"max-w-full w-auto sm:h-[599px] bt:h-[599px] lg:h-[500px] h-[18rem] "}>
      {/*  pbject cover ile div ölçülerini koruyor ve video içeriğini div içinde tamamen kapsıyor */}
      <video className="h-full w-full rounded-2xl object-cover object-center" autoPlay>
        <source
          src="https://www.shutterstock.com/shutterstock/videos/3604596277/preview/stock-footage-vertical-video-expressive-media-star-using-microphone-to-shoot-video-doing-frantic-gesturing.webm"
          type="video/mp4"
        />
        Tarayıcın videoyu desteklemiyor.
      </video>
    </div>
  );
}
