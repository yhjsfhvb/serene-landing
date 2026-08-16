import { useRef, useEffect } from 'react'

const RAINBOW_IMG = 'https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png'
const CLOUD_IMG = 'https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png'

const QUOTE_TEXT =
  '\u201CSerene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess — just support that lets you feel radiant.\u201D'

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const rainbowRef = useRef<HTMLImageElement>(null)
  const leftCloudRef = useRef<HTMLImageElement>(null)
  const rightCloudRef = useRef<HTMLImageElement>(null)

  // Animation state (mutable refs to avoid re-renders)
  const state = useRef({
    rainbowY: 120,
    leftCloudX: -200,
    leftCloudY: 0,
    leftCloudOpacity: 0,
    rightCloudX: 200,
    rightCloudY: 0,
    rightCloudOpacity: 0,
  })

  useEffect(() => {
    let rafId: number

    const animate = () => {
      const section = sectionRef.current
      if (!section) {
        rafId = requestAnimationFrame(animate)
        return
      }

      const rect = section.getBoundingClientRect()
      const wh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)))

      const s = state.current

      // Rainbow: +120px → -160px, lerp factor 0.06
      const targetRainbowY = 120 + progress * (-280)
      s.rainbowY += (targetRainbowY - s.rainbowY) * 0.06

      // Clouds: in view at progress 0.12–0.92
      const inView = progress >= 0.12 && progress <= 0.92
      const targetLeftX = inView ? 0 : -200
      const targetRightX = inView ? 0 : 200
      const targetOpacity = inView ? 1 : 0
      const targetCloudY = progress * -50

      // Left cloud, lerp factor 0.04
      s.leftCloudX += (targetLeftX - s.leftCloudX) * 0.04
      s.leftCloudY += (targetCloudY - s.leftCloudY) * 0.04
      s.leftCloudOpacity += (targetOpacity - s.leftCloudOpacity) * 0.04

      // Right cloud, lerp factor 0.04
      s.rightCloudX += (targetRightX - s.rightCloudX) * 0.04
      s.rightCloudY += (targetCloudY - s.rightCloudY) * 0.04
      s.rightCloudOpacity += (targetOpacity - s.rightCloudOpacity) * 0.04

      // Apply transforms via translate3d for GPU acceleration
      if (rainbowRef.current) {
        rainbowRef.current.style.transform = `translate3d(0, ${s.rainbowY}px, 0)`
      }
      if (leftCloudRef.current) {
        leftCloudRef.current.style.transform = `translate3d(${s.leftCloudX}px, ${s.leftCloudY}px, 0)`
        leftCloudRef.current.style.opacity = String(s.leftCloudOpacity)
      }
      if (rightCloudRef.current) {
        rightCloudRef.current.style.transform = `translate3d(${s.rightCloudX}px, ${s.rightCloudY}px, 0)`
        rightCloudRef.current.style.opacity = String(s.rightCloudOpacity)
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
    >
      {/* Rainbow image — parallax vertical movement */}
      <img
        ref={rainbowRef}
        src={RAINBOW_IMG}
        alt=""
        className="absolute inset-x-0 top-0 z-30 w-full will-change-transform pointer-events-none"
        style={{ transform: 'translate3d(0, 120px, 0)' }}
      />

      {/* Left cloud */}
      <img
        ref={leftCloudRef}
        src={CLOUD_IMG}
        alt=""
        className="absolute left-0 bottom-[10%] z-10 hidden sm:block w-[500px] md:w-[650px] will-change-transform pointer-events-none"
        style={{ marginLeft: '-50%', opacity: 0, transform: 'translate3d(-200px, 0, 0)' }}
      />

      {/* Right cloud (flipped) */}
      <img
        ref={rightCloudRef}
        src={CLOUD_IMG}
        alt=""
        className="absolute right-0 bottom-[15%] z-10 hidden sm:block w-[500px] md:w-[650px] scale-x-[-1] will-change-transform pointer-events-none"
        style={{ marginRight: '-75%', opacity: 0, transform: 'translate3d(200px, 0, 0)' }}
      />

      {/* Quote content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]">
            {QUOTE_TEXT}
          </p>
          <p className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide">
            Dr. Mia Callahan — Founder
          </p>
        </div>
      </div>
    </section>
  )
}
