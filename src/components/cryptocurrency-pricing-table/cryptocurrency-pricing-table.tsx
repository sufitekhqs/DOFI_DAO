'use client';

import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa";
import { FcShare } from "react-icons/fc";
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyAccordionTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-accordion-table';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';

import { useIDO } from '@/hooks/livePricing';
import { Globe } from 'lucide-react';
import ToastNotification from '../ui/toast-notification';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import routes from '@/config/routes';
import { useCopyToClipboard } from 'react-use';

const COLUMNS = [
  // {
  //   Header: () => <div className="px-1"></div>,
  //   accessor: 'symbol',
  //   // @ts-ignore
  //   Cell: ({ cell: { value } }) => (
  //     <div className="">
  //       <Star />
  //     </div>
  //   ),
  //   minWidth: 40,
  //   maxWidth: 20,
  // },
  {
    Header: '#',
    accessor: 'Token ID',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">{row.index + 1}</div>
      </div>
    ),
    minWidth: 40,
    maxWidth: 20,
  },
  {
    Header: () => <div className="">DIO Name</div>,
    accessor: 'name',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-600 dark:text-white" />
        <div className="ltr:text-left rtl:text-left">{row.original.name}</div>
      </div>
    ),
    minWidth: 100,
    maxWidth: 200,
  },
  {
    Header: () => <div className="">Price</div>,
    accessor: 'current_price',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="">{row.original.nftID?.price ? `$${row.original.nftID?.price}` : "--"}</div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Investors</div>,
    accessor: 'currentw_price',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex w-auto items-center justify-center">
          {row.original.investors?.length}
        </div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 70,
  },
  {
    Header: () => <div className="">Soft Cap</div>,
    accessor: 'price_change_percentage_1h_in_currency',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center">
        <div className="flex w-auto items-center justify-center">
          ${row.original.softCap}
        </div>
      </div>
    ),
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Total Supply</div>,
    accessor: 'price_change_percentage_24h_in_currency',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center ltr:text-left rtl:text-left">
          {row.original.totalSupply}
        </div>
      </div>
    ),
    maxWidth: 100,
  },
  
  {
    Header: () => <div className="">status</div>,
    accessor: 'total_volume',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className={`flex h-auto w-[140px] items-center justify-center rounded-full px-4 py-1 text-sm font-medium shadow-md
    ${row.original.status === 'successful'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : row.original.status === 'failed'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : row.original.status === 'active'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
            }`}
        >
          {row.original.status}
        </div>
      </div>
    ),
    maxWidth: 300,
  },
  {
    Header: () => <div className="">Share</div>,
    accessor: 'share',
    // @ts-ignore
    Cell: ({ row }) => {
      const [copyButtonStatus, setCopyButtonStatus] = useState(false);
      const [_, copyToClipboard] = useCopyToClipboard();

      const shareUrl = `${process.env.NEXT_PUBLIC_FRONT_END_ENDPOINT}${routes.idoDetail}/${row.original._id}`;

      function handleCopyToClipboard(e: React.MouseEvent) {
        e.stopPropagation(); // prevent row redirect
        copyToClipboard(shareUrl);
        setCopyButtonStatus(true);
        ToastNotification('success', 'Now you can share DIO!');
        setTimeout(() => {
          setCopyButtonStatus(false); // ✅ reset correctly
        }, 2500);
      }

      return (
        <div
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleCopyToClipboard}
        >
          <FaShareAlt size={30}/>
        </div>
      );
    },
    maxWidth: 90,
  },
];

export default function CryptocurrencyPricingTable() {
  const { ido, isLoading } = useIDO();
  //@ts-ignore
  const data = React.useMemo(() => ido?.data ?? [], [ido?.data]);
  const columns = React.useMemo(() => COLUMNS, []);
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  return isMounted &&
    ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
    <CryptocurrencyDrawerTable columns={columns} data={data} />
  ) : (
    <CryptocurrencyAccordionTable
      columns={columns}
      data={data}
      isLoading={isLoading}
    />
  );
}
