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
    <Link href={link}>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 rounded mb-4 max-h-60 object-contain" />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Live Demo →
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
