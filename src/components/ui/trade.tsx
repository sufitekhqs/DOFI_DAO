'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'
import cn from '@/utils/cn';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import ActiveLink from '@/components/ui/links/active-link';
import AnchorLink from '@/components/ui/links/anchor-link';
import { RangeIcon } from '@/components/icons/range-icon';
import { ExportIcon } from '@/components/icons/export-icon';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useLayout } from '@/lib/hooks/use-layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { coinList } from '@/data/static/coin-list';
// dynamic import
const Listbox = dynamic(() => import('@/components/ui/list-box'));

const tradeMenu: any = [
  // {
  //   name: 'Liquidity',
  //   value: routes.liquidity,
  // },
  // {
  //   name: 'Vote',
  //   value: routes.vote,
  // },
];

function ActiveNavLink({ href, title, isActive, className }: any) {
  const { layout } = useLayout();
  return (
    <ActiveLink
      href={{
        pathname:
          (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) + href,
      }}
      className={cn(
        'relative z-[1] inline-flex items-center px-3 py-1.5',
        className,
      )}
      activeClassName="font-medium text-white"
    >
      <span>{title}</span>
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-large"
          layoutId="activeNavLinkIndicator"
        />
      )}
    </ActiveLink>
  );
}

export default function Trade({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { layout } = useLayout();
  const pathname =
    routes.home +
    usePathname()
      ?.split('/')
      .slice(layout === LAYOUT_OPTIONS.MODERN ? 1 : 2)
      .join('/');
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const currentPath = tradeMenu.findIndex((item: any) => item.value === pathname);
  let [selectedMenuItem, setSelectedMenuItem] = useState(tradeMenu[0]);
  function handleRouteOnSelect(path: string) {
    router.push(path);
  }
  useEffect(() => {
    setSelectedMenuItem(tradeMenu[currentPath]);
  }, [currentPath]);
  return (
    <div className="">
      <div className="bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 py-5 px-4 rounded-md shadow-lg">
        <h2 className="mb-2 text-base font-bold uppercase dark:text-gray-100 xl:text-[28px] text-white">
          SWAP
        </h2>
        <p className="text-sm text-white/80 dark:text-gray-300">

          Seamlessly swap NFTs across multiple blockchain networks with real-time valuation and gas fee optimization to ensure accurate and secure transactions.
        </p>
      </div>
      <div className="pt-8 text-sm xl:pt-10">
        <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-[16px] font-medium mb-6">SWAP Domain Fractions</h1>
            <div className="flex gap-[5px] items-center mb-6">
              {coinList?.map((coin, index) => (
                <div key={index} className="w-4 h-4">
                  {React.cloneElement(coin.icon, { className: "w-full h-full" })}
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence mode={'wait'}>
            <motion.div
              initial="exit"
              animate="enter"
              exit="exit"
              variants={fadeInBottom('easeIn', 0.25)}
            >
              {children}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
