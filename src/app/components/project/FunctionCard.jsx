import { useState } from "react";
import { useLang } from "../../context/LangContext";
import Image from "next/image";

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

    return content.split("\n").map((line, index) => {
      // Handle images
      const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        return (
          <div key={index} className="my-4">
            <img
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="rounded-lg shadow"
            />
          </div>
        );
      }

      // Handle video links
      const videoMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (videoMatch && line.includes("📽️")) {
        return (
          <div key={index} className="my-4">
            <video
              src={videoMatch[2]}
              controls
              className="rounded-lg shadow w-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      // Handle headers
      if (line.startsWith("###")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-4">
            {line.replace("###", "").trim()}
          </h3>
        );
      }

      // Handle horizontal rules
      if (line.trim() === "---") {
        return <hr key={index} className="my-6 border-gray-300" />;
      }

      // Handle lists
      if (line.trim().startsWith("-")) {
        return (
          <li key={index} className="ml-4 mb-2">
            {line.replace("-", "").trim()}
          </li>
        );
      }

      // Regular text
      return (
        <p key={index} className="mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Function Card */}
      <div
        onClick={openModal}
        className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
      >
        {image && (
          <Image
            src={image}
            alt={title[lang]}
            width={400}
            height={200}
            className="w-full h-60 rounded mb-4 max-h-60 object-contain pt-4"
          />
        )}
        <div className="p-6">
          <h3 className="text-2xl text-gray-900 font-semibold mb-2">
            {title[lang]}
          </h3>
          <p className="text-gray-900 mb-4 text-lg">{description[lang]}</p>
        </div>
      </div>

      {/* Modal/Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#1a1f2b] rounded-xl p-6 w-2/3 mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{title[lang]}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {lang === "en" ? "Description" : "설명"}
                </h3>
                <p className="text-gray-200 text-xl">{description[lang]}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {lang === "en" ? "Details" : "상세 정보"}
                </h3>
                <div className="text-gray-200 text-xl">{details[lang]}</div>
              </div>

              {documentation && (
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {lang === "en" ? "Documentation" : "문서"}
                  </h3>
                  <div className="prose max-w-none text-gray-200 text-xl">
                    {renderMarkdown(processDocumentation(documentation[lang]))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
