import { ReactElement } from 'react';
import WaveBackground from '@/components/client/wave-background/wave-background';
// import Image from 'next/image';
// import troggleLogo from '@/../public/troggle-translucent-text.webp';
import WelcomeCard from '@/components/server/welcome-card/welcome-card';

/**
 * Home page component
 *
 * Renders the full-screen wave background and the WelcomeCard.
 * The logo section is currently commented out.
 *
 * @returns {ReactElement} The home page JSX element
 */
export default function Home(): ReactElement {
  return (
    <div className="relative w-full flex min-h-screen">
      {/* Animated wave background */}
      <WaveBackground />

      {/* Commented out temporarily */}
      {/*
      <div className="absolute z-10 pl-2 pt-2">
        <Image
          src={troggleLogo}
          alt="Troggle Logo"
          width={100}
          height={90}
          className="mx-auto"
        />
      </div>
      */}

      {/* Welcome card overlay */}
      <WelcomeCard />
    </div>
  );
}
