import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
import { CgProfile } from 'react-icons/cg';
// static data
import { authorData } from '@/data/static/author';

const AuthorProfilePage = () => {
  return (
    <>
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          quality={100}
          className="!h-full w-full !object-cover"
          alt="Cover Image"
        />
      </div>
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <div className="rounded-full z-10 mx-auto -mt-12 flex w-[10%] justify-center bg-white dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20">
          <CgProfile width={100} className="text-[100px]" />
        </div>

        {/* <Avatar
          size="xl"
          image={authorData?.avatar?.thumbnail}
          alt="Author"
          className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
        /> */}
      </div>
        <Profile />
    </>
  );
};

export default AuthorProfilePage;
