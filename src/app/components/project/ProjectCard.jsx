import Link from "next/link";

export default function ProjectCard({
  title,
  description,
  image,
  tags = [],
  link,
  github,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden">
      {/* Clickable Link Wrapper */}
      <Link href={link}>
        <div className="cursor-pointer">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-60 object-contain border-b pt-4"
            />
          )}

          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom links (GitHub / Live Demo) */}
      <div className="px-6 pb-6 flex gap-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // 👈 prevents Link navigation
            className="text-blue-400 hover:underline"
          >
            Live Demo →
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // 👈 prevents Link navigation
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
