import React, { useEffect, useState } from "react";
import { Divider, Select } from "antd";
import AxiosInstance from "../../components/axios";
import OutputPage from "../output-page";
import TypingEffect from "../../components/typing-text";

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
const PGDegreeOptions = [
  "MBA",
  "Masters Degree",
  "PGDBA",
  "MTECH",
  "MCOM",
  "MA",
  "MCA",
  "MSC",
  "Master of Laws",
];

// Function to format college names
export const formatTextValue = (name: string): string => {
  // Add your formatting logic here
  // For example, capitalize the first letter of each word
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface UGCollegeTierList {
  institute_value: string;
  tier_value: number;
}

interface CompanySize {
  company_size: string;
}

interface CompanySectors {
  company_sector: string;
}

interface JobTitleOptions {
  title: string;
}

const collegeTierOptions = ["1", "2", "3", "4"];

const InputPage: React.FC = () => {
  const [UGDegree, setUGDegree] = useState<string>("");
  const [UGDegreeMatch, setUGDegreeMatch] = useState<number>(0);
  const [additionalDegree, setAdditionalDegree] = useState<string>("");
  const [selectedUgCollege, setSelectedUgCollege] = useState<string>("");
  const [additionalDegreeMatch, setAdditionalDegreeMatch] = useState<number>(0);
  const [UGTier, setUGTier] = useState<string>("");
  const [UGTierMatch, setUGTierMatch] = useState<number>(0);
  const [companySize, setCompanySize] = useState<CompanySize[]>([]);
  const [companySectors, setCompanySectors] = useState<CompanySectors[]>([]);
  const [jobTitleOptions, setJobTitleOptions] = useState<JobTitleOptions[]>([]);
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>("");
  const [selectedCompanySizeMatch, setSelectedCompanySizeMatch] =
    useState<number>(0);
  const [selectedCompanySector, setSelectedCompanySector] =
    useState<string>("");
  const [selectedCompanySectorMatch, setSelectedCompanySectorMatch] =
    useState<number>(0);
  const [isTierEditing, setIsTierEditing] = useState<boolean>(false);
  const [collegeOptions, setCollegeOptions] = useState<UGCollegeTierList[]>([]);
  const [UGCollegeTierList, setUGCollegeTierList] = useState<
    UGCollegeTierList[]
  >([]);
  const [desiredTitle, setDesiredTitle] = useState<string>("");
  const [desiredTitleMatch, setDesiredTitleMatch] = useState<number>(0);

  const [ugAndAdditionalDegreeMatch, SetUgDegreeAndAdditional] =
    useState<number>(0);
  const [ugDegreeAndUGTierMatch, SetUgDegreeAndUGTierMatch] =
    useState<number>(0);
  const [storedDataString, setStoredDataString] = useState("");

  useEffect(() => {
    if (
      desiredTitle ||
      UGDegree ||
      additionalDegree ||
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
    additionalDegree,
    UGTier,
    selectedCompanySector,
    selectedCompanySize,
  ]);
  const handleOnChangeFetch = () => {
    handleFormSubmit();
    const formData = new FormData();

    formData.append("desired_title", desiredTitle);

    formData.append("ug_degree", UGDegree);
    formData.append("additional_degree", additionalDegree);
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
        setAdditionalDegreeMatch(dataObject.row_counts_additional_degree);
        setUGTierMatch(dataObject.row_counts_ug_tier);
        setSelectedCompanySizeMatch(dataObject.row_counts_company_size);
        setSelectedCompanySectorMatch(dataObject.row_counts_company_sector);
        SetUgDegreeAndAdditional(dataObject.row_counts_ug_and_add_title);
        SetUgDegreeAndUGTierMatch(dataObject.row_counts_ug_degree_and_ug_tier);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AxiosInstance.get("api/linkedin/college-tier")
      .then(async (res) => {
        const response = await res.data;

        setUGCollegeTierList(response);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (UGDegree) {
      AxiosInstance.post("api/linkedin/ug-based-colleges", {
        ug_degree: UGDegree,
      })
        .then(async (res) => {
          const response = await res.data;
          const filtered = response.filter(
            (item: UGCollegeTierList) => item.institute_value !== null
          );

          setCollegeOptions(filtered);
        })
        .catch((err) => console.log(err));
    }
  }, [UGDegree]);

  useEffect(() => {
    AxiosInstance.get("api/linkedin/company-size")
      .then(async (res) => {
        const response = await res.data;

        setCompanySize(response);
      })
      .catch((err) => console.log(err));
  }, []);

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

  useEffect(() => {
    AxiosInstance.get("api/linkedin/company-sector")
      .then(async (res) => {
        const response = await res.data;

        const filteredResponse = response.filter(
          (company: CompanySectors) => company.company_sector !== null
        );
        setCompanySectors(filteredResponse);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleCollegeChange = (value: any) => {
    setUGTier("");
    setSelectedUgCollege(value);
    // Filter colleges based on the selected tier
    if (value === "others") {
      setUGTier("4");
    } else {
      const filtered = value
        ? UGCollegeTierList.filter(
            (college) => college.institute_value === value
          )
        : UGCollegeTierList;

      setUGTier(JSON.stringify(filtered[0].tier_value));
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
      PGDegree: additionalDegree,
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

  const handleEditing = () => {
    setIsTierEditing(true);
  };
  return (
    <div>
      <div className="container-fluid d-lg-flex p-0">
        <div
          className="col-12 col-lg-6  vh-100 p-3 "
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "start",
            background: "#e4edf5",
          }}
        >
          <h3 className="mt-3 invisible">Fill the details below</h3>
          <div className="text-left  col-10  mt-3 p-3">
            <div className=" form-group">
              <label>Under Graduate Degree</label>
              <Select
                className="rounded-0"
                value={UGDegree}
                onChange={(value) => setUGDegree(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select a degree
                </Option>
                {UGDegreeOptions.sort().map((degree, index) => (
                  <Option key={index} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </div>

            <div className=" form-group">
              <label>Post Graduate Degree</label>
              <Select
                value={additionalDegree}
                onChange={(value) => setAdditionalDegree(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select a degree
                </Option>
                {PGDegreeOptions.sort().map((degree, index) => (
                  <Option key={index} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </div>

            <div className=" form-group">
              <label> Under Graduate College</label>
              <Select
                disabled={UGDegree ? false : true}
                value={selectedUgCollege}
                onChange={handleCollegeChange}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select College
                </Option>
                {collegeOptions.sort().map((college, index) => (
                  <Option key={index} value={college.institute_value}>
                    {formatTextValue(college.institute_value)}
                  </Option>
                ))}
                <Option value="others">Others</Option>
              </Select>
            </div>

            {isTierEditing ? (
              <div className=" form-group">
                <label> College Tier</label>
                <Select
                  disabled={selectedUgCollege ? false : true}
                  value={UGTier}
                  onChange={(value) => setUGTier(value)}
                  style={{ width: "100%", height: "40px" }}
                >
                  <Option value="" disabled>
                    Select Tier
                  </Option>
                  {collegeTierOptions.sort().map((tier, index) => (
                    <Option key={index} value={tier}>
                      {tier}
                    </Option>
                  ))}
                </Select>
              </div>
            ) : selectedUgCollege ? (
              <div className="d-flex align-items-center justify-content-between my-3">
                <label className="mr-3">
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

            <div className=" form-group">
              <label> Desired Title </label>
              <Select
                value={desiredTitle}
                onChange={(value) => setDesiredTitle(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select a title
                </Option>
                {jobTitleOptions.sort().map((title, index) => (
                  <Option key={index} value={title.title}>
                    {formatTextValue(title.title)}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group">
              <label> How big of a company do you want? </label>
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
            <div className=" form-group">
              <label> Which sector do you want to work in? </label>
              <Select
                value={selectedCompanySector}
                onChange={(value) => setSelectedCompanySector(value)}
                style={{ width: "100%", height: "40px" }}
              >
                <Option value="" disabled>
                  Select sector
                </Option>
                {companySectors.sort().map((company, index) => (
                  <Option key={index} value={company.company_sector}>
                    {formatTextValue(company.company_sector)}
                  </Option>
                ))}
              </Select>
            </div>
            {/* 
            <Form.Item>
              <Button type="primary" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Form.Item> */}
          </div>
        </div>
        <div
          className="col-12 p-0 col-lg-6 border vh-100"
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "start",
            overflowY: "scroll",
          }}
        >
          {desiredTitle && UGDegree && UGTier ? (
            <div>
              <div className=" p-3">
                <h4 className="my-3">Individual Profiles Matching</h4>

                <section
                  style={{ overflow: "unset" }}
                  id="counts"
                  className="counts p-0"
                >
                  <div className="container" data-aos="fade-up">
                    <div className="d-flex flex-wrap ">
                      <div className="col-lg-4  col-md-6 mt-5 mt-md-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">{UGDegreeMatch}</span>
                          <p> UG Degree </p>
                        </div>
                      </div>

                      <div className="col-lg-4  col-md-6  mt-lg-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {additionalDegreeMatch}
                          </span>
                          <p> PG Degree </p>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-6">
                        <div className="count-box">
                          <span data-toggle="counter-up">{UGTierMatch}</span>
                          <p>
                            <p>UG College Tier</p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap mt-3">
                      <div className="col-lg-4  col-md-6  mt-lg-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {desiredTitleMatch}
                          </span>
                          <p> Desired Title </p>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-6 mt-3 mt-md-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {ugAndAdditionalDegreeMatch}
                          </span>
                          <p> UG Degree and PG Degree </p>
                        </div>
                      </div>

                      <div className="col-lg-4  col-md-6 mt-5 mt-lg-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {ugDegreeAndUGTierMatch}
                          </span>
                          <p> UG Degree and UG Tier </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap mt-3 ">
                      <div className="col-lg-4  col-md-6 mt-5 mt-md-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {selectedCompanySizeMatch}
                          </span>
                          <p> Company Size </p>
                        </div>
                      </div>

                      <div className="col-lg-4  col-md-6  mt-lg-0">
                        <div className="count-box">
                          <span data-toggle="counter-up">
                            {selectedCompanySectorMatch}
                          </span>
                          <p>Company Sector</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <Divider />
              <OutputPage storedDataString={storedDataString} />:
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
                height: "100vh",
              }}
              className="container w-50"
            >
              <TypingEffect />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPage;
