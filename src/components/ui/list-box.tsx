import { Fragment } from 'react';
import {
  Listbox as HeadlessListbox,
  ListboxOption as HeadlessListboxOption,
  ListboxOptions as HeadlessListboxOptions,
  ListboxButton as HeadlessListboxButton,
} from '@headlessui/react';
import cn from '@/utils/cn';
import { Transition } from '@/components/ui/transition';
import { ChevronDown } from '@/components/icons/chevron-down';

export type ListboxOption = {
  name: string;
  value: string;
};

interface ListboxTypes {
  options: ListboxOption[];
  selectedOption: ListboxOption;
  onChange: React.Dispatch<React.SetStateAction<ListboxOption>>;
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
  variant?: 'ghost' | 'solid' | 'transparent';
  className?: string;
}

const listboxVariantClasses = {
  ghost:
    'transition-shadow border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600',
  solid:
    'transition-colors bg-gray-100 hover:bg-gray-200/70 dark:bg-gray-800 dark:hover:bg-gray-700',
  transparent: '',
};

export default function Listbox({
  options,
  onChange,
  onSelect,
  variant = 'ghost',
  selectedOption,
  className,
  children,
}: ListboxTypes) {
  return (
    <div className={cn('relative', className)}>
      <HeadlessListbox value={selectedOption} onChange={onChange}>
        <HeadlessListboxButton
          className={cn(
            'text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm font-medium outline-none duration-200 sm:h-12 sm:px-5',
            listboxVariantClasses[variant],
          )}
        >
          <div className="flex items-center">{selectedOption?.name}</div>
          <ChevronDown />
        </HeadlessListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeadlessListboxOptions className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
            {options.map((option) => (
              <HeadlessListboxOption key={option.value} value={option}>
                {({ selected }) => (
                  <div
                    onClick={() => onSelect && onSelect(option.value)}
                    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100 ${
                      selected
                        ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                    }`}
                  >
                    {option.name}
                  </div>
                )}
              </HeadlessListboxOption>
            ))}
            {/* any custom / external link or element */}
            {children && children}
          </HeadlessListboxOptions>
        </Transition>
      </HeadlessListbox>
    </div>
  );
}
