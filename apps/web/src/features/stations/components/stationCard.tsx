import RatingIcon from "@/components/icons/ratingIcon";
import ReliabilityIcon from "@/components/icons/reliabilityIcon";
import { Station } from "@/types/api/station";

type StationCardProps = {
  station: Station;
};

const StationCard = ({ station }: StationCardProps) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 cursor-pointer group">
      <div className="relative pb-[100%]">
        <img
          className="absolute h-full w-full object-cover transition-transform group-hover:scale-105"
          src={station.imgUrl}
          alt={`${station.name} cover art`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          <div
            title={`Popularity: ${station.popularity ?? "-"}`}
            className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full"
          >
            <RatingIcon className="h-3 w-3 text-yellow-400" />
            <span>{station.popularity ?? "-"}</span>
          </div>
          <div
            title={`Reliability: ${station.reliability}`}
            className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full"
          >
            <ReliabilityIcon className="h-3 w-3 text-green-400" />
            <span>{station.reliability}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">
          {station.name}
        </h3>
        <p className="text-sm text-gray-400 mt-1 h-10 overflow-hidden text-ellipsis">
          {station.description}
        </p>
      </div>
    </div>
  );
};

export default StationCard;
