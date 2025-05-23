import cn from '@/utils/cn';
import {
  TabPanel as HLTabPanel,
  TabPanels as HLTabPanels,
  Tab
} from '@headlessui/react';
import { LayoutGroup, motion } from 'framer-motion';

export { Tab };

//
// Tab Item framer motion variant
//
export function TabItem({
  children,
  className,
  tabItemLayoutId = 'activeTabIndicator',
}: React.PropsWithChildren<{ className?: string; tabItemLayoutId?: string }>) {
  return (
    <Tab
      className={({ selected }) =>
        cn(
          'relative py-2 uppercase tracking-wider hover:text-gray-900 focus:outline-none dark:hover:text-gray-100 xs:py-2.5 sm:py-3',
          {
            'font-medium text-brand dark:text-gray-100': selected,
            'text-gray-600 dark:text-gray-400': !selected,
          },
          className,
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="flex w-full justify-between px-3 md:px-0">
            {children}
          </span>
          {selected && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 z-[1] h-0.5 w-full overflow-hidden rounded-full bg-brand dark:bg-gray-400 md:z-10"
              layoutId={tabItemLayoutId}
            />
          )}
        </>
      )}
    </Tab>
  );
}

//
// Tab Panels framer motion variant
//
export function TabPanels({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <HLTabPanels className={className}>
      <LayoutGroup>
        <>{children}</>
      </LayoutGroup>
    </HLTabPanels>
  );
}

//
// Tab Panel framer motion variant
//
export function TabPanel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <HLTabPanel className={className}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 32 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </HLTabPanel>
  );
}
