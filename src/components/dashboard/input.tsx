import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Select } from "antd";
import AxiosInstance from "../../config/axios";

import { useApplicationContext } from "../../context/app-context";
import { colleges } from "../constants/college-options";
import { collegeTierList } from "../constants/college-tier-list";
import { formatTextValue } from "../../utils/tool-helper-functions";
import { useNavigate } from "react-router-dom";
import {
  DesiredCompanyOptions,
  UGDegreeOptions,
  companySectorsOptions,
  companySizeOptions,
  customJobOptions,
} from "../constants/input-options";

const { Option } = Select;

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

const InputComponent: React.FC = () => {
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
    setUgDegreeAndCompanyMatch,
    setDesiredTitle,
    setIsInputsEntered,
    setDesiredTitleMatch,
    setSelectedCompanies,
    selectedCompanies,
    setByFactor,
    setDisplayFactor,
    byFactor,

    desiredTitle,
    desiredTitleMatch,
  } = useApplicationContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (byFactor === "title") {
      setDisplayFactor(desiredTitle);
    } else {
      setDisplayFactor("Selected companies");
    }
    //eslint-disable-next-line
  }, [byFactor, desiredTitle]);

  // useEffect(() => {
  //   if (
  //     desiredTitle ||
  //     UGDegree ||
  //     UGTier ||
  //     selectedCompanySector ||
  //     selectedCompanySize ||
  //     selectedCompanies
  //   ) {
  //     handleOnChangeFetch();
  //   }
  //   //eslint-disable-next-line
  // }, [
  //   desiredTitle,
  //   UGDegree,
  //   byFactor,
  //   UGTier,
  //   selectedCompanySector,
  //   selectedCompanySize,
  //   selectedCompanies,
  // ]);
  const handleOnChangeFetch = () => {
    setIsInputsEntered(true);
    handleFormSubmit();
    const formData = new FormData();
    formData.append("desired_title", desiredTitle);
    formData.append("ug_degree", UGDegree);
    formData.append("ug_tier", UGTier);
    formData.append("company_size", selectedCompanySize);
    formData.append("company_sector", selectedCompanySector);
    formData.append("companies", JSON.stringify(selectedCompanies));
    formData.append("byFactor", byFactor);
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
        setUgDegreeAndCompanyMatch(
          dataObject.row_counts_ug_and_desired_company
        );
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

  // useEffect(() => {
  //   if (desiredTitle && UGTier && UGDegree  ) {
  //     setIsInputsEntered(true);
  //   }
  //   //eslint-disable-next-line
  // }, [desiredTitle, UGTier, UGDegree]);

  const handleSelectCompanies = (value: string[]) => {
    setSelectedCompanies(value);
  };

  useEffect(() => {
    if (selectedCompanies?.length === 0) {
      setByFactor("title");
    }
    //eslint-disable-next-line
  }, [selectedCompanies]);
  const handleRadioChange = (e: RadioChangeEvent) => {
    setByFactor(e.target.value);
  };
  return (
    <div>
      <div className="container-fluid d-lg-flex p-0">
        <div
          className="col-12 col-lg-12   p-3  "
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
            <div className=" form-group mb-3">
              <label className="mb-3">Desired popular companies</label>
              <Select
                placeholder="Select companies"
                onChange={handleSelectCompanies}
                mode="multiple"
                style={{ width: "100%" }}
              >
                {DesiredCompanyOptions.map((company, index) => (
                  <Option key={index} value={company.value}>
                    {formatTextValue(company.label)}
                  </Option>
                ))}
              </Select>
            </div>
            <p>Show the results based on</p>
            <Radio.Group
              onChange={(e) => handleRadioChange(e)}
              value={byFactor}
            >
              <Radio value="title">Title</Radio>
              <Radio
                disabled={selectedCompanies.length > 0 ? false : true}
                value="company"
              >
                Company
              </Radio>
            </Radio.Group>
            {isMobile ? (
              <button
                onClick={() => navigate("/tool")}
                className="btn btn-primary w-100 mt-5"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleOnChangeFetch}
                className="btn btn-primary w-100 mt-5"
              >
               Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputComponent;

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
