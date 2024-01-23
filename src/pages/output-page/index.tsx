import React, { useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";
import { formatTextValue } from "../input-page";

interface Profile {
  [key: string]: string | number | null;
}

interface TitleCount {
  title: string;
  count: number;
}

// function calculateAverageJobChanges(
//   desiredTitle: string,
//   profiles: Profile[]
// ): number {
//   const totalDurations = profiles.map((profile) => {
//     const mappedTitleIndex = [...Array(8).keys()].find((index) => {
//       const mappedTitleKey = `mapped_title_${index}`;
//       return profile[mappedTitleKey] === desiredTitle;
//     });
//   });

//   return 0;
// }
function calculateAverageDuration(
  desiredTitle: string,
  profiles: Profile[]
): number {
  // Calculate total duration for each profile based on desired title's position
  const totalDurations = profiles.map((profile) => {
    const mappedTitleIndex = [...Array(8).keys()].find((index) => {
      const mappedTitleKey = `mapped_title_${index}`;
      return profile[mappedTitleKey] === desiredTitle;
    });

    if (mappedTitleIndex !== undefined) {
      let totalDuration = 0;
      for (let i = mappedTitleIndex; i <= 7; i++) {
        const jobDurationKey = `job_${i}_duration`;
        const jobDuration = profile[jobDurationKey];

        if (jobDuration !== null && typeof jobDuration === "number") {
          totalDuration += jobDuration;
        }
      }
      return totalDuration;
    } else {
      return 0; // Return 0 if desired title not found in mapped titles
    }
  });

  // Filter out profiles with 0 total duration
  const nonZeroDurations = totalDurations.filter((duration) => duration > 0);

  // Calculate the average duration
  const totalDurationSum = nonZeroDurations.reduce(
    (sum, duration) => sum + duration,
    0
  );
  const averageDuration =
    nonZeroDurations.length > 0
      ? totalDurationSum / nonZeroDurations.length
      : 0;

  return Math.round(averageDuration);
}

function getTopTitles(profiles: Profile[]): TitleCount[] {
  const allMappedTitles: string[] = [];

  // Collect all non-null mapped_titles from each profile
  profiles.forEach((profile) => {
    for (let i = 0; i <= 7; i++) {
      const mappedTitle = profile[`mapped_title_${i}`];

      if (mappedTitle !== null && typeof mappedTitle === "string") {
        allMappedTitles.push(mappedTitle);
      }
    }
  });

  // Count the occurrences of each mapped_title
  const titleCounts: Record<string, number> = {};
  allMappedTitles.forEach((title) => {
    titleCounts[title] = (titleCounts[title] || 0) + 1;
  });

  // Convert titleCounts into an array of objects for sorting
  const sortedTitles: TitleCount[] = Object.keys(titleCounts).map((title) => ({
    title,
    count: titleCounts[title],
  }));

  // Sort titles based on the count in descending order
  sortedTitles.sort((a, b) => b.count - a.count);

  // Select the top 5 titles
  const top5Titles = sortedTitles.slice(0, 5);

  return top5Titles;
}
interface OutputPageProps {
  storedDataString: string; // Define the type for storedDataString
}

const OutputPage: React.FC<OutputPageProps> = ({ storedDataString }) => {
  //   const storedDataString = sessionStorage.getItem("input-data");
  //eslint-disable-next-line
  const [educationAndDesiredOutput, setEducationAndDesiredOutput] = useState(
    []
  );
  const [educationOutput, setEducationOutput] = useState([]);
  const [top5TitleData, setTop5TitleData] = useState<TitleCount[]>([]);
  const [percentageWithTitle, setPercentageWithTitle] = useState<number>(0);
  const [yearsTaken, setYearsTaken] = useState<number>(0);
  const [percentageWithEducation, setPercentageWithEducation] =
    useState<number>(0);

  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  useEffect(() => {
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const formData = new FormData();

    formData.append("desired_title", storedData?.DesiredTitle);

    formData.append("ug_degree", storedData?.UGDegree);
    formData.append("ug_tier", storedData?.UGTier);

    if (educationOutput?.length > 0) {
      console.log("enter");

      AxiosInstance.post("api/linkedin/education-desired-output", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const response = await res.data;
          console.log("🚀 ~ .then ~ response:", response);

          setEducationAndDesiredOutput(response);

          const percentageWithTitle =
            (response?.length / storedData?.DesiredTitleMatch) * 100 || 0;
          console.log("🚀 ~ .then ~ percentageWithTitle:", percentageWithTitle);

          const percentageWithEducation =
            (response?.length / educationOutput.length) * 100 || 0;

          const averageDuration = calculateAverageDuration(
            storedData?.DesiredTitle,
            response
          );
          setYearsTaken(Math.round(averageDuration / 12));

          setPercentageWithEducation(Math.round(percentageWithEducation));

          setPercentageWithTitle(Math.round(percentageWithTitle));
        })

        .catch((err) => console.log(err));
    }
  }, [educationOutput, storedDataString]);

  useEffect(() => {
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const formData = new FormData();

    formData.append("ug_degree", storedData?.UGDegree);
    formData.append("ug_tier", storedData?.UGTier);
    console.log("enter-1");

    AxiosInstance.post("api/linkedin/education-output", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        setEducationOutput(response);
        const topTitles = getTopTitles(response);
        setTop5TitleData(topTitles);
      })

      .catch((err) => console.log(err));
  }, [storedDataString]);

  return (
    <div>
      <div className="container p-3">
        <section id="counts" className="counts pt-3">
          <div className="container" data-aos="fade-up">
            <div className="d-flex flex-wrap ">
              <div className="col-lg-4  col-md-6 mt-5 mt-md-0">
                <div className="count-box">
                  <span data-toggle="counter-up">{percentageWithTitle}%</span>
                  <p>
                    {" "}
                    Percentage of profiles from your background made it to{" "}
                    {storedData?.DesiredTitle}{" "}
                  </p>
                </div>
              </div>

              <div className="col-lg-4  col-md-6  mt-lg-0">
                <div className="count-box">
                  <span data-toggle="counter-up">
                    {percentageWithEducation}%
                  </span>
                  <p>
                    {" "}
                    Percentage of profiles from your educational background{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-4  col-md-6">
                <div className="count-box">
                  <span data-toggle="counter-up">{yearsTaken}</span>
                  <p>
                    <p>
                      Average Years required to go from education to desired
                      title
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h3>Top 5 Titles</h3>
        {top5TitleData.map((item: TitleCount) => (
          <p key={item.title}>{formatTextValue(item.title)}</p>
        ))}
      </div>
    </div>
  );
};

export default OutputPage;
