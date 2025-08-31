import { ReactElement } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import troggleLogo from '../../../../public/troggle-translucent.webp';

/**
 * WelcomeCard component
 *
 * Renders a centered card with the Troggle logo, welcome message,
 * and Login/Register buttons. Uses glass morphism styling.
 *
 * @returns {ReactElement} The welcome card JSX element
 */
const WelcomeCard = (): ReactElement => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl w-80 m-auto
      bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl h-90"
    >
      {/* Logo */}
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={troggleLogo}
          alt="Troggle Logo"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Welcome message */}
      <h1 className="text-center text-white text-xl font-bold mb-6 drop-shadow-lg">
        Welcome to Troggle, Cosmic Explorer!
      </h1>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
        >
          Login
        </Button>
        <Button
          variant="default"
          className="backdrop-blur-sm bg-indigo-500/80 hover:bg-indigo-600/90"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default WelcomeCard;
