import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SupportCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  large?: boolean;
}

const SupportCard: React.FC<SupportCardProps> = ({
  title,
  description,
  imageUrl,
  link,
  large = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${large ? 'mb-6' : 'mb-4'}`}>
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
          Read more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SupportCard;
