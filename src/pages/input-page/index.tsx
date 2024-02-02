import React, { useEffect, useState } from "react";
import { Select } from "antd";
import AxiosInstance from "../../config/axios";

import { useApplicationContext } from "../../context/app-context";
import { colleges } from "../../components/constants/college-options";
import { collegeTierList } from "../../components/constants/college-tier-list";
import { formatTextValue } from "../../utils/tool-helper-functions";

const { Option } = Select;

const UGDegreeOptions = [
  "BE",
  "Bachelors Degree",
  "BCOM",
  "BBA",
  "CA",
  "BA",
  "BCA",
  "BSC",
  "Bachelor of Laws",
];

const customJobOptions = [
  { title: "Account Manager" },
  { title: "Business Analyst" },
  { title: "Consultant" },
  { title: "Software Developer" },
  { title: "Project Manager" },
  { title: "Product Manager" },
  { title: "Head of HR" },
  { title: "President" },
  { title: "CFO" },
  { title: "CEO" },
  { title: "Founder" },
  { title: "Founder and CEO" },
];

const companySectorsOptions = [
  { company_sector: "Software" },
  { company_sector: "Hospitality" },
  { company_sector: "Professional Services" },
  { company_sector: "Planning and Design" },
  { company_sector: "Construction" },
  { company_sector: "Financial Services" },
  { company_sector: "Manufacturing" },
  { company_sector: "Media" },
  { company_sector: "Publishing" },
  { company_sector: "Education" },
  { company_sector: "Telecommunications" },
  { company_sector: "Consumer" },
  { company_sector: "Government" },
  { company_sector: "Healthcare" },
  { company_sector: "Real Estate" },
  { company_sector: "Sports" },
  { company_sector: "FMCG" },
  { company_sector: "Transport, Supply Chain, and Logistics" },
  { company_sector: "Resources" },
];

const companySizeOptions = [
  { company_size: "3-9" },
  { company_size: "1-3" },
  { company_size: "50-250" },
  { company_size: "9-50" },
  { company_size: "Unknown" },
  { company_size: "1000-5000" },
  { company_size: "5000+" },
  { company_size: "250-1000" },
];
// const PGDegreeOptions = [
//   "MBA",
//   "Masters Degree",
//   "PGDBA",
//   "MTECH",
//   "MCOM",
//   "MA",
//   "MCA",
//   "MSC",
//   "Master of Laws",
// ];

// interface UGCollegeTierList {
//   institute_value: string;
//   tier_value: number;
//   ug_degree: string;
// }

// interface CompanySize {
//   company_size: string;
// }

// interface CompanySectors {
//   company_sector: string;
// }

interface JobTitleOptions {
  title: string;
}

const collegeTierOptions = ["1", "2", "3", "4"];

const InputPage: React.FC = () => {
  const [UGDegree, setUGDegree] = useState<string>("");

  const [selectedUgCollege, setSelectedUgCollege] = useState<string>("");
  const [obtainedTierValue, setObtainedTierValue] = useState<string>("");
  const [UGTier, setUGTier] = useState<string>("");
  //eslint-disable-next-line

  const companySize = companySizeOptions;
  // const [companySectors, setCompanySectors] = useState<CompanySectors[]>([]);
  const companySectors = companySectorsOptions;
  //eslint-disable-next-line
  const [jobTitleOptions, setJobTitleOptions] = useState<JobTitleOptions[]>([]);
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>("");
  //eslint-disable-next-line
  const [isCollegeListLoaded, setIsCollegeListLoaded] =
    useState<boolean>(false);
  const [isTierEditing, setIsTierEditing] = useState<boolean>(false);
  // const [collegeOptions, setCollegeOptions] = useState<UGCollegeTierList[]>([]);
  const collegeOptions = colleges;
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);

  // const [UGCollegeTierList, setUGCollegeTierList] = useState<
  //   UGCollegeTierList[]
  // >([]);

  const UGCollegeTierList = collegeTierList;

  //eslint-disable-next-line
  const [ugAndAdditionalDegreeMatch, setUgDegreeAndAdditional] =
    useState<number>(0);

  const [selectedCompanySector, setSelectedCompanySector] =
    useState<string>("");
  const {
    setStoredDataString,
    setSelectedCompanySizeMatch,
    setSelectedCompanySectorMatch,
    setTotalCount,
    setUGDegreeMatch,
    setUGTierMatch,
    setUgDegreeAndUGTierMatch,
    setUgDegreeAndDesiredMatch,
    setDesiredTitle,
    setIsInputsEntered,
    setDesiredTitleMatch,

    desiredTitle,
    desiredTitleMatch,
  } = useApplicationContext();

  useEffect(() => {
    if (
      desiredTitle ||
      UGDegree ||
      UGTier ||
      selectedCompanySector ||
      selectedCompanySize
    ) {
      handleOnChangeFetch();
    }
    //eslint-disable-next-line
  }, [
    desiredTitle,
    UGDegree,

    UGTier,
    selectedCompanySector,
    selectedCompanySize,
  ]);
  const handleOnChangeFetch = () => {
    handleFormSubmit();
    const formData = new FormData();
    formData.append("desired_title", desiredTitle);
    formData.append("ug_degree", UGDegree);
    formData.append("ug_tier", UGTier);
    formData.append("company_size", selectedCompanySize);
    formData.append("company_sector", selectedCompanySector);
    AxiosInstance.post("api/linkedin/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        const dataObject = response[0];

        setDesiredTitleMatch(dataObject.row_counts_desired_title);
        setUGDegreeMatch(dataObject.row_counts_ug_degree);
        setUGTierMatch(dataObject.row_counts_ug_tier);
        setSelectedCompanySizeMatch(dataObject.row_counts_company_size);
        setSelectedCompanySectorMatch(dataObject.row_counts_company_sector);
        setUgDegreeAndAdditional(dataObject.row_counts_ug_and_add_title);
        setUgDegreeAndUGTierMatch(dataObject.row_counts_ug_degree_and_ug_tier);
        setUgDegreeAndDesiredMatch(dataObject.row_counts_ug_and_desired_title);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AxiosInstance.get("api/linkedin/total-count")
      .then(async (res) => {
        const response = await res.data;

        setTotalCount(response[0]["COUNT(*)"]);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log("entered");

  //   AxiosInstance.get("api/linkedin/college-tier")
  //     .then(async (res) => {
  //       const response = await res.data;
  //

  //       setUGCollegeTierList(response);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   AxiosInstance.get("api/linkedin/ug-colleges")
  //     .then(async (res) => {
  //       const response = await res.data;
  //       setIsCollegeListLoaded(true);
  //       const filtered = response.filter(
  //         (item: UGCollegeTierList) => item.institute_value !== null
  //       );
  //

  //       setCollegeOptions(filtered);
  //     })
  //     .catch((err) => console.log(err));
  // }, [UGDegree]);

  // useEffect(() => {
  //   AxiosInstance.get("api/linkedin/company-size")
  //     .then(async (res) => {
  //       const response = await res.data;
  //

  //       setCompanySize(response);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // useEffect(() => {
  //   AxiosInstance.get("api/linkedin/company-sector")
  //     .then(async (res) => {
  //       const response = await res.data;

  //       const filteredResponse = response.filter(
  //         (company: CompanySectors) => company.company_sector !== null
  //       );
  //       console.log(
  //         "🚀 ~ .then ~ filteredResponse:",
  //         JSON.stringify(filteredResponse)
  //       );
  //       setCompanySectors(filteredResponse);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    // Filter out colleges based on the presence of ug_degree
    const filteredData = collegeOptions.filter(
      (entry) => entry.ug_degree !== null && entry.ug_degree === UGDegree
    );

    // Extract unique college names from the filtered data
    const uniqueColleges = Array.from(
      new Set(filteredData.map((entry) => entry.institute_value))
    );

    setFilteredColleges(uniqueColleges);
  }, [collegeOptions, UGDegree]);

  useEffect(() => {
    AxiosInstance.get("api/linkedin/titles")
      .then(async (res) => {
        const response = await res.data;
        const filteredResponse = response.filter(
          (company: JobTitleOptions) => company.title !== null
        );

        setJobTitleOptions(filteredResponse);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCollegeChange = (value: any) => {
    setUGTier("");
    setSelectedUgCollege(value);
    // Filter colleges based on the selected tier
    if (value === "others") {
      setUGTier("4");
      setObtainedTierValue("4");
    } else {
      const filtered = value
        ? UGCollegeTierList.filter(
            (college) => college.institute_value === value
          )
        : UGCollegeTierList;

      setUGTier(JSON.stringify(filtered[0]?.tier_value));
      setObtainedTierValue(JSON.stringify(filtered[0]?.tier_value));
    }
  };

  // Function to extract and parse numerical values from the company size range
  const extractRangeValues = (range: string) => {
    const [min, max] = range.split("-").map((value) => parseInt(value, 10));
    return { min, max };
  };

  // Sort the array based on the extracted numerical values
  const sortedCompanySizes = companySize.sort((a, b) => {
    // Handle the case where one of the company sizes is "Unknown"
    if (a.company_size === "Unknown") return 1;
    if (b.company_size === "Unknown") return -1;

    const aValues = extractRangeValues(a.company_size);
    const bValues = extractRangeValues(b.company_size);

    // Compare the minimum values first, then the maximum values
    return aValues.min - bValues.min || aValues.max - bValues.max;
  });
  const handleFormSubmit = () => {
    // Your logic for handling form submission
    const valuesObject = {
      UGDegree: UGDegree,
      UGTier: UGTier,
      UGCollege: selectedUgCollege,
      DesiredTitle: desiredTitle,
      DesiredTitleMatch: desiredTitleMatch,
      CompanySize: selectedCompanySize,
      CompanySector: selectedCompanySector,
    };

    setStoredDataString(JSON.stringify(valuesObject));

    sessionStorage.setItem("input-data", JSON.stringify(valuesObject));
  };
  const handleEditingSave = () => {
    setIsTierEditing(false);
  };
  const handleEditingReset = () => {
    setIsTierEditing(false);
    setUGTier(obtainedTierValue);
  };
  const handleEditing = () => {
    setIsTierEditing(true);
  };

  useEffect(() => {
    if (desiredTitle && UGTier && UGDegree) {
      setIsInputsEntered(true);
    }
    //eslint-disable-next-line
  }, [desiredTitle, UGTier, UGDegree]);
  return (
    <div>
      <div className="container-fluid d-lg-flex p-0">
        <div
          className="col-12 col-lg-12  vh-100 p-3  "
          style={{
            display: "grid",
            justifyItems: "start",
            alignContent: "start",
          }}
        >
          <div className="text-start  col-10  mt-3 p-3">
            <div className=" form-group mb-3">
              <label className="mb-3">Under Graduate Degree</label>
              <Select
                className="rounded-0"
                value={UGDegree}
                onChange={(value) => setUGDegree(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select UG degree
                </Option>
                {UGDegreeOptions.sort().map((degree, index) => (
                  <Option key={index} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </div>

            <div className=" form-group mb-3">
              <label className="mb-3"> Under Graduate College</label>
              <Select
                disabled={UGDegree ? false : true}
                value={selectedUgCollege}
                onChange={handleCollegeChange}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select UG College
                </Option>
                {filteredColleges.sort().map((college, index) => (
                  <Option key={index} value={college}>
                    {formatTextValue(college)}
                  </Option>
                ))}
                <Option value="others">Others</Option>
              </Select>
            </div>

            {isTierEditing ? (
              <div className=" align-items-center justify-content-between form-group mb-3">
                <div>
                  <label style={{ marginRight: "8px" }} className=" mb-3">
                    {" "}
                    College Tier :{" "}
                  </label>
                  <Select
                    disabled={selectedUgCollege ? false : true}
                    value={UGTier}
                    onChange={(value) => setUGTier(value)}
                    style={{ width: "100px" }}
                  >
                    {collegeTierOptions.sort().map((tier, index) => (
                      <Option key={index} value={tier}>
                        {tier}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <button
                    className="btn-sm btn btn-primary border "
                    style={{ marginRight: "8px" }}
                    onClick={handleEditingSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn-sm btn border"
                    onClick={handleEditingReset}
                  >
                    Default
                  </button>
                </div>
              </div>
            ) : selectedUgCollege ? (
              <div className="d-flex align-items-center justify-content-between my-3">
                <label className="mr-3 mb-3 pt-3">
                  College Tier :
                  <span className="text-primary" style={{ fontWeight: "bold" }}>
                    {" "}
                    {UGTier}
                  </span>
                </label>
                <button className="btn-sm btn border" onClick={handleEditing}>
                  Change
                </button>
              </div>
            ) : (
              ""
            )}

            <div className=" form-group mb-3">
              <label className="mb-3"> Desired Title </label>
              <Select
                value={desiredTitle}
                onChange={(value) => setDesiredTitle(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select Desired title
                </Option>
                {customJobOptions.map((title, index) => (
                  <Option key={index} value={title.title}>
                    {formatTextValue(title.title)}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group mb-3">
              <label className="mb-3"> Your desired company size</label>
              <Select
                value={selectedCompanySize}
                onChange={(value) => setSelectedCompanySize(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select employee count
                </Option>
                {sortedCompanySizes.sort().map((company, index) => (
                  <Option key={index} value={company.company_size}>
                    {company.company_size}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group mb-3">
              <label className="mb-3"> Your desired company sector</label>
              <Select
                value={selectedCompanySector}
                onChange={(value) => setSelectedCompanySector(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select sector
                </Option>
                {companySectors
                  .sort((a, b) =>
                    a.company_sector.localeCompare(b.company_sector)
                  )
                  .map((company, index) => (
                    <Option key={index} value={company.company_sector}>
                      {formatTextValue(company.company_sector)}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
