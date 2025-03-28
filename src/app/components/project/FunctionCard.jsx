import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import Image from 'next/image';

export default function FunctionCard({
  title,
  description,
  image,
  availability,
  details,
  documentation,
  media,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLang();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to process media placeholders in documentation
  const processDocumentation = (doc) => {
    if (!doc || !media) return doc;
    return doc.replace(/\{media\.(\w+)\.(\w+)\}/g, (match, feature, type) => {
      return media[feature]?.[type] || match;
    });
  };

  // Function to render markdown content with images and videos
  const renderMarkdown = (content) => {
    if (!content) return null;

    return content.split('\n').map((line, index) => {
      // Handle images
      const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        return (
          <div key={index} className="my-4">
            <Image
              src={imageMatch[2]}
              alt={imageMatch[1]}
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        );
      }

      // Handle video links
      const videoMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (videoMatch && line.includes('📽️')) {
        return (
          <div key={index} className="my-4">
            <video
              controls
              className="w-full rounded-lg shadow-lg"
              src={videoMatch[2]}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      // Handle headers
      if (line.startsWith('###')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-4">{line.replace('###', '').trim()}</h3>;
      }

      // Handle horizontal rules
      if (line.trim() === '---') {
        return <hr key={index} className="my-6 border-gray-300 dark:border-gray-700" />;
      }

      // Handle lists
      if (line.trim().startsWith('-')) {
        return <li key={index} className="ml-4 mb-2">{line.replace('-', '').trim()}</li>;
      }

      // Regular text
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  return (
    <>
      {/* Function Card */}
      <div 
        onClick={openModal}
        className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
      >
        {image && (
          <Image 
            src={image} 
            alt={title[lang]} 
            width={400}
            height={200}
            className="w-full h-48 rounded mb-4 max-h-60 object-contain" 
          />
        )}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{title[lang]}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description[lang]}</p>
          <div className="flex items-center gap-2">
            <span 
              className={`px-3 py-1 rounded-full text-sm ${
                availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {availability ? (lang === 'en' ? 'Available' : '사용 가능') : (lang === 'en' ? 'Unavailable' : '사용 불가')}
            </span>
          </div>
        </div>
      </div>

      {/* Modal/Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{title[lang]}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {image && (
              <Image 
                src={image} 
                alt={title[lang]} 
                width={800}
                height={400}
                className="w-full rounded-lg mb-4 max-h-80 object-contain" 
              />
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{lang === 'en' ? 'Description' : '설명'}</h3>
                <p className="text-gray-600 dark:text-gray-300">{description[lang]}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{lang === 'en' ? 'Details' : '상세 정보'}</h3>
                <div className="text-gray-600 dark:text-gray-300">
                  {details[lang]}
                </div>
              </div>

              {documentation && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">{lang === 'en' ? 'Documentation' : '문서'}</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    {renderMarkdown(processDocumentation(documentation[lang]))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <span 
                  className={`px-3 py-1 rounded-full text-sm ${
                    availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {availability ? (lang === 'en' ? 'Available' : '사용 가능') : (lang === 'en' ? 'Unavailable' : '사용 불가')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}