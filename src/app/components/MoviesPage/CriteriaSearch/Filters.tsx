"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import Runtime from "./Filters/Runtime";
import Button from "./Filters/GenreButton";
import DateInput from "./Filters/Date";
import { useRouter, useSearchParams } from "next/navigation";

type filterQuery = {
  selectedGenres: string | undefined | string[];
  runtime: string | undefined;
  date: string | undefined;
};

interface props {
  option: filterQuery | undefined;
  setOption: any;
  genres: {
    genres: [
      {
        id: number;
        name: string;
      }
    ];
  };
}

const Filters: React.FC<props> = ({ option, setOption, genres }) => {
  const router = useRouter();
  const {
    with_genres,
    with_runtime_gte,
    with_runtime_lte,
    release_date_gte,
    release_date_lte,
  }: any = useSearchParams();

  const [collapse, setCollapse] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string | string[]>(
    with_genres !== undefined ? with_genres : ""
  );
  const [runtime, setRuntime] = useState<string>("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (selectedGenres !== "")
      setFilters((prev) => {
        return { ...prev, selectedGenres };
      });
    if (date !== "")
      setFilters((prev) => {
        return { ...prev, date };
      });
    if (runtime !== "")
      setFilters((prev) => {
        return { ...prev, runtime };
      });

    setOption(filters);
  }, [selectedGenres, runtime, date]);

  useEffect(() => {
    setOption(filters);
  }, [filters]);

  return (
    <div className="text-lg gray border-2 border-slate-300 rounded my-5 ">
      <div
        className="cursor-pointer flex flex-row justify-between p-4 "
        onClick={() => setCollapse(!collapse)}
      >
        <p>Filters</p>
        {collapse && <KeyboardArrowDownIcon />}
        {!collapse && <KeyboardArrowRightIcon />}
      </div>
      {collapse && (
        <div className="border-t-2 ">
          <div className="p-4">
            <p>Date:</p>
            <hr />
            <DateInput
              release_date_gte={release_date_gte}
              release_date_lte={release_date_lte}
              date={date}
              setDate={setDate}
            />
          </div>
          <div className="px-4 py-2">
            <p>Genres:</p>
            <hr />
            <div className="mt-2">
              {genres?.genres.map((genre) => (
                <Button
                  key={genre.id}
                  name={genre.name}
                  id={genre.id}
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                  with_genres={with_genres}
                />
              ))}
            </div>
          </div>
          <div className="p-4">
            <p>Runtime:</p>
            <hr />
            <Runtime
              runtime={runtime}
              setRuntime={setRuntime}
              with_runtime_gte={with_runtime_gte}
              with_runtime_lte={with_runtime_lte}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
