import FunctionCard from "./FunctionCard";
import { functions } from "./horsepower/horsepowerFunctionsData";

export default function FunctionGrid({ functions }) {
  if (!functions || functions.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {functions.map((func, index) => (
        <FunctionCard
          key={index}
          title={func.title}
          description={func.description}
          image={func.image}
          availability={func.availability}
          details={func.details}
          documentation={func.documentation}
          media={func.media}
        />
      ))}
    </div>
  );
}
