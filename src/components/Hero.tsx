import Navbar from './Navbar'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Navbar */}
      <Navbar />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-[120px]">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
          Gentle touch. Radiant presence.
        </h1>
        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl">
          Expert beauty and holistic wellness, delivered with warmth and intention.
        </p>
        <button className="mt-6 md:mt-9 bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow">
          Begin your renewal
        </button>
      </div>

      {/* Sound indicator (desktop only) */}
      <div className="hidden md:flex absolute bottom-8 left-8 items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-3 h-[2px] bg-white/60" />
        </div>
        <div className="flex flex-col">
          <span className="text-white/60 text-xs">Experience</span>
          <span className="text-white/60 text-xs">with sound</span>
        </div>
      </div>
    </section>
  )
}
