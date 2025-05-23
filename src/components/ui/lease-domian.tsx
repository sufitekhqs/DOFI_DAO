import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { StaticImageData } from 'next/image';


export default function LeaseDomainCard({ item, className = '' }:any) {

  const { openModal } = useModal();
 
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <img src={item?.nft?.imageUrl} width={600} alt="no-image" />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <div className="flex justify-end">
          <div
            onClick={() => openModal('PAY_TOKEN_AMOUNT',item?.nft?.name)}
            className="inline-flex h-8 border border-white shrink-0 cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
          >
            Pay
          </div>
        </div>
      </div>
    </div>
  );
}
