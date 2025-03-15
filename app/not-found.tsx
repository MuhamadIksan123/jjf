import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="h-[80px] w-full border-b-blackJ border-2 z-50 px-5 py-3">
        <div className="container">
          <Link href={'/'} className="relative h-full flex">
            <div className="my-auto">
              <Image src="/img/logo/logo.svg" alt="Logo Kemenag" width={50} height={50} loading="lazy" className="object-cover" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[400px] h-[400px]">
          <Image src={'/img/404.svg'} alt="not found" fill className="object-contain" />
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <h1 className="font-black text-2xl text-blackJ  text-center"> It looks like you're lost.</h1>
          <p className="text-blackJ text-center">Let's head back to the homepage to find your way.</p>
          <button className="bg-blackJ text-white rounded-lg py-2 px-3">
            <Link href={'/'}>Back to Home</Link>
          </button>
        </div>
      </div>
      <div className="h-[50px] w-full bg-dark z-50 text-white text-center fixed bottom-0 flex items-center justify-center">️&#169; 2025 Kementerian Agama Republik Indonesia</div>
    </div>
  );
}
