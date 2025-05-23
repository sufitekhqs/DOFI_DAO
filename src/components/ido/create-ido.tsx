import { useState } from 'react';
import { parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { FaSackDollar } from 'react-icons/fa6';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { useCreateIDO } from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';
interface CreateIDOProps {
  data: any;
}
export default function CreateIDO({ data }: CreateIDOProps) {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { loading, isConfetti } = useSelector((state: any) => state.ido);
  const [totalFraction, setTotalfraction] = useState('');
  const [priceFraction, setPricefraction] = useState('');
  const { mutate: submitCreate, isError, error } = useCreateIDO();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address:  process.env.NEXT_PUBLIC_DAO_TOKEN as `0x${string}`,
        abi: daoTokenABI,
        functionName: 'transferFrom',
        args: [
          address,
          '0xA50673D518847dF8A5dc928B905c54c35930b949',
          data?.tokenId,
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        submitCreate({
          //@ts-ignore
          nftID: data?._id,
          name: `${data?.name} DIO`,
          tokenSymbol: 'DAO NFT',
          totalSupply: totalFraction,
          pricePerToken: priceFraction,
          startTime: 1745600400000,
          endTime: 1745600400000,
          creator: address,
          address: address,
          description: 'token',
        });
      } else {
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(true));
      console.log(error);
    }
  };
  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
        <h1 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white flex items-end  justify-end text-end w-full">
        Step 2 / <span className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">2</span>
      </h1>
      <h1 className="flex shrink-0 items-center justify-center text-center text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
        DIO
      </h1>
      <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
        <h2 className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
          Total Fraction
        </h2>
        <input
          type="number"
          value={totalFraction || ''}
          onChange={(e) => setTotalfraction(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
          placeholder="total fraction"
        />
      </label>

      <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
        <h2 className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
          Price Per Fraction
        </h2>
        <input
          type="number"
          value={priceFraction || ''}
          onChange={(e) => setPricefraction(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
          placeholder="price per fraction"
        />
      </label>

      <div className="mb-4 flex w-full flex-col">
        <h1 className="mb-2 flex shrink-0 items-center justify-center text-center text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
          Domain DAO Privilege
        </h1>
        <div className="mb-4 flex w-full flex-col">
          <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
            <FaSackDollar color="#FFFF00" /> Revenue Sharing
          </h2>
          <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
            Earn a share of revenue generated from domain monetization, leasing,
            or resales.
          </p>
        </div>
        <div className="mb-4 flex w-full flex-col">
          <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
            <AiOutlineGlobal color="#0000FF" /> Domain Utility Decisions
          </h2>
          <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
            Vote on how the ENS domain is used across dApps, marketplaces, or
            DAOs.
          </p>
        </div>
        <div className="mb-4 flex w-full flex-col">
          <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
            <GiBrain color="#FF00FF" /> Name Service Innovation
          </h2>
          <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
            Collaborate on experiments like subdomain leasing, identity use
            cases, or zk integrations.
          </p>
        </div>
        <div className="mb-4 flex w-full flex-col">
          <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
            <FaLock color="#FFFF00" /> Token-Gated Access
          </h2>
          <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
            Get exclusive access to token-holder-only tools, chats, and
            community calls.
          </p>
        </div>
      </div>
      <Button
        size="large"
        shape="rounded"
        onClick={() => handleBuy()}
        fullWidth={true}
        className="uppercase xs:tracking-widest"
        disabled={loading}
      >
        {loading ? (
          <>
            <BeatLoader color="#000" />
          </>
        ) : (
          'Create DIO'
        )}
      </Button>
    </div>
  );
}
