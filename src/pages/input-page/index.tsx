import React, { useEffect, useState } from "react";
import { Select } from "antd";
import AxiosInstance from "../../components/axios";

const { Option } = Select;

const DegreeOptions = [
  "Bachelors Degree",
  "BCA",
  "BE",
  "BBA",
  "BCom",
  "BSC",
  "CA",
  "Masters Degree",
  "MCA",
  "MBA",
  "MCom",
  "MSC",
  "MTECH",
  "MA",
  "PGDBA",
  "Bachelor of Laws",
  "Master of Laws",
];
const JobTitleOptions = [
  "Account Manager",
  "Business Analyst",
  "CEO",
  "CFO",
  "Co-Founder",
  "Consultant",
  "Founder",
  "Founder and CEO",
  "Head-HR",
  "Internship",
  "Manager",
  "President",
  "Product Manager",
  "Project Manager",
  "Software Developer",
  "Software Engineer",
  "Vice President",
];
const experienceOptions = [
  "Less than 1 year",
  "1 years",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "Greater than 6 years",
];
const collegeTierOptions = ["1", "2", "3", "4"];

const InputPage: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentTitleMatch, setCurrentTitleMatch] = useState<number>(0);
  const [UGDegree, setUGDegree] = useState<string>("");
  const [UGDegreeMatch, setUGDegreeMatch] = useState<number>(0);
  const [additionalDegree, setAdditionalDegree] = useState<string>("");
  const [additionalDegreeMatch, setAdditionalDegreeMatch] = useState<number>(0);
  const [UGTier, setUGTier] = useState<string>("");
  const [UGTierMatch, setUGTierMatch] = useState<number>(0);
  const [experience, setExperience] = useState<string>("");
  const [experienceMatch, setExperienceMatch] = useState<number>(0);
  const [desiredTitle, setDesiredTitle] = useState<string>("");
  const [desiredTitleMatch, setDesiredTitleMatch] = useState<number>(0);
  const [currentAndDesiredTitleMatch, SetCurrentAndDesiredTitleMatch] =
    useState<number>(0);
  const [ugAndAdditionalDegreeMatch, SetUgDegreeAndAdditional] =
    useState<number>(0);
  const [ugDegreeAndUGTierMatch, SetUgDegreeAndUGTierMatch] =
    useState<number>(0);
  const [currentAndFutureAndDegree, SetCurrentAndFutureAndDegree] =
    useState<number>(0);
  const [allTitleAndAllDegree, SetAllTitleAndAllDegree] = useState<number>(0);

  useEffect(() => {
    if (
      currentTitle ||
      desiredTitle ||
      UGDegree ||
      additionalDegree ||
      UGTier ||
      experience
    ) {
      handleOnChangeFetch();
    }
    //eslint-disable-next-line
  }, [
    currentTitle,
    desiredTitle,
    UGDegree,
    additionalDegree,
    UGTier,
    experience,
  ]);
  const handleOnChangeFetch = () => {
    const formData = new FormData();

    formData.append("current_title", currentTitle);
    formData.append("desired_title", desiredTitle);

    formData.append("ug_degree", UGDegree);
    formData.append("additional_degree", additionalDegree);
    formData.append("ug_tier", UGTier);

    formData.append("experience", experience);

    AxiosInstance.post("api/linkedin/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        const dataObject = response[0];

        setCurrentTitleMatch(dataObject.row_counts_current_title);
        setDesiredTitleMatch(dataObject.row_counts_desired_title);

        setUGDegreeMatch(dataObject.row_counts_ug_degree);
        setAdditionalDegreeMatch(dataObject.row_counts_additional_degree);
        setUGTierMatch(dataObject.row_counts_ug_tier);

        setExperienceMatch(dataObject.row_counts_experience);

        SetCurrentAndDesiredTitleMatch(
          dataObject.row_counts_desired_and_current_title
        );
        SetUgDegreeAndAdditional(dataObject.row_counts_ug_and_add_title);

        SetUgDegreeAndUGTierMatch(dataObject.row_counts_ug_degree_and_ug_tier);
        SetCurrentAndFutureAndDegree(
          dataObject.row_counts_ug_degree_and_current_and_desired_title
        );
        SetAllTitleAndAllDegree(dataObject.row_counts_all_degree_and_all_title);
      })
      .catch((err) => console.log(err));
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
          }}
        >
          <h3 className="mt-3">Fill the details below</h3>
          <div className="text-left bg-light col-10 shadow mt-3 p-3">
            <div className=" form-group">
              <label>Current title</label>
              <Select
                value={currentTitle}
                onChange={(value) => setCurrentTitle(value)}
                style={{ width: "100%" }}
              >
                <Option value="" disabled>
                  Select a title
                </Option>
                {JobTitleOptions.sort().map((title, index) => (
                  <Option key={index} value={title}>
                    {title}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group">
              <label>Under Graduate Degree</label>
              <Select
                value={UGDegree}
                onChange={(value) => setUGDegree(value)}
                style={{ width: "100%" }}
              >
                <Option value="" disabled>
                  Select a degree
                </Option>
                {DegreeOptions.sort().map((degree, index) => (
                  <Option key={index} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </div>

            <div className=" form-group">
              <label>Additional Degree</label>
              <Select
                value={additionalDegree}
                onChange={(value) => setAdditionalDegree(value)}
                style={{ width: "100%" }}
              >
                <Option value="" disabled>
                  Select a degree
                </Option>
                {DegreeOptions.sort().map((degree, index) => (
                  <Option key={index} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group">
              <label> Under Graduate College Tier</label>
              <Select
                value={UGTier}
                onChange={(value) => setUGTier(value)}
                style={{ width: "100%" }}
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
            <div className=" form-group">
              <label> Experience</label>
              <Select
                value={experience}
                onChange={(value) => setExperience(value)}
                style={{ width: "100%" }}
              >
                <Option value="" disabled>
                  Select a Experience
                </Option>
                {experienceOptions.map((exp, index) => (
                  <Option key={index} value={exp}>
                    {exp}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" form-group">
              <label> Desired Title </label>
              <Select
                value={desiredTitle}
                onChange={(value) => setDesiredTitle(value)}
                style={{ width: "100%" }}
              >
                <Option value="" disabled>
                  Select a title
                </Option>
                {JobTitleOptions.sort().map((title, index) => (
                  <Option key={index} value={title}>
                    {title}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div
          className="col-12 col-lg-6 border vh-100"
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "start",
            overflowY:"scroll"
          }}
        >
          <h1 className="mt-3">Profiles matching</h1>

          <section id="counts" className="counts pt-3">
            <div className="container" data-aos="fade-up">
              <div className="d-flex flex-wrap ">
                <div className={`col-lg-4  col-md-6`}>
                  <div className="count-box">
                    <span data-toggle="counter-up">{currentTitleMatch}</span>
                    <p>
                      <p>Current Title</p>
                    </p>
                  </div>
                </div>

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
                    <p> Additional Degree </p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-4  col-md-6">
                  <div className="count-box">
                    <span data-toggle="counter-up">{UGTierMatch}</span>
                    <p>
                      <p>UG College Tier</p>
                    </p>
                  </div>
                </div>

                <div className="col-lg-4  col-md-6 mt-3 mt-md-0">
                  <div className="count-box">
                    <span data-toggle="counter-up">{experienceMatch}</span>
                    <p> Experience</p>
                  </div>
                </div>

                <div className="col-lg-4  col-md-6  mt-lg-0">
                  <div className="count-box">
                    <span data-toggle="counter-up">{desiredTitleMatch}</span>
                    <p> Desired Title </p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-4  col-md-6">
                  <div className="count-box">
                    <span data-toggle="counter-up">
                      {currentAndDesiredTitleMatch}
                    </span>
                    <p>
                      <p>Current Title and Desired Title </p>
                    </p>
                  </div>
                </div>

                <div className="col-lg-4  col-md-6 mt-3 mt-md-0">
                  <div className="count-box">
                    <span data-toggle="counter-up">
                      {ugAndAdditionalDegreeMatch}
                    </span>
                    <p> UG Degree and Additional Degree </p>
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
              <div className="d-flex flex-wrap mt-5">
                <div className="col-lg-4  col-md-6 mt-5 mt-lg-0">
                  <div className="count-box">
                    <span data-toggle="counter-up">
                      {currentAndFutureAndDegree}
                    </span>
                    <p> Current Title , Desired Title and UG Degree </p>
                  </div>
                </div>
                <div className="col-lg-4  col-md-6 mt-5 mt-lg-0">
                  <div className="count-box">
                    <span data-toggle="counter-up">{allTitleAndAllDegree}</span>
                    <p> All Titles and All Degrees </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
