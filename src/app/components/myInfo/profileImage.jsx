import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="md:w-1/2 flex justify-center relative">
      <div className="rounded-full overflow-hidden border-4 border-[#38bdf8] shadow-lg w-64 h-64">
        <Image
          src="/images/profile-img.jpg"
          alt="Michael's portrait"
          width={300}
          height={300}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div>
  );
}
