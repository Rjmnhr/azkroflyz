import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const CareerTimeline = ({
  job0,
  data0,
  tenure0,
  job1,
  data1,
  tenure1,
  job2,
  data2,
  tenure2,
  job3,
  data3,
  tenure3,
  job4,
  data4,
  tenure4,
}) => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#696cff", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="Desired Job"
        dateClassName="custom-date-class"
        iconStyle={{
          background: "rgb(33, 150, 243)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the content horizontally
        }}
        icon={
          <img
            width={30}
            src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707309329/iu6qlnitgtd15i3fmnoq.png"
            alt=""
          />
        }
      >
        <h3 className="vertical-timeline-element-title">{job0}</h3>
        <h5 className="mt-2" style={{ color: "rgb(213, 213, 213)" }}>
          {" "}
          Average Tenure : {tenure0 ? tenure0 : 1} years
        </h5>
        <p>Common Sectors</p>
        <p className="m-0">{data0.sectors.join(", ")}</p>
        <p>Common Company sizes</p>
        <p className="m-0"> {data0.sizes.join(", ")}</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="Previous Job 1"
        iconStyle={{
          background: "rgb(33, 150, 243,0.9)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the content horizontally
        }}
        icon={
          <img
            width={30}
            src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707309329/iu6qlnitgtd15i3fmnoq.png"
            alt=""
          />
        }
      >
        <h3 className="vertical-timeline-element-title">{job1}</h3>
        <h5 className="mt-2" style={{ color: " rgb(66, 65, 65)" }}>
          {" "}
          Average Tenure : {tenure1 ? tenure1 : 1} years
        </h5>
        <p>Common Sectors</p>
        <p className="m-0">{data1.sectors.join(", ")}</p>
        <p>Common Company sizes</p>
        <p className="m-0"> {data1.sizes.join(", ")}</p>
      </VerticalTimelineElement>
      {job2 ? (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Previous Job 2"
          iconStyle={{
            background: "rgb(33, 150, 243,0.8)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center the content horizontally
          }}
          icon={
            <img
              width={30}
              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707309329/iu6qlnitgtd15i3fmnoq.png"
              alt=""
            />
          }
        >
          <h3 className="vertical-timeline-element-title">{job2}</h3>
          <h5 className="mt-2" style={{ color: " rgb(66, 65, 65)" }}>
            {" "}
            Average Tenure : {tenure2 ? tenure2 : 1} years
          </h5>
          <p>Common Sectors</p>
          <p className="m-0">{data2.sectors.join(", ")}</p>
          <p>Common Company sizes</p>
          <p className="m-0"> {data2.sizes.join(", ")}</p>
        </VerticalTimelineElement>
      ) : (
        ""
      )}
      {job3 ? (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Previous Job 3"
          iconStyle={{
            background: "rgb(33, 150, 243,0.7)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center the content horizontally
          }}
          icon={
            <img
              width={30}
              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707309329/iu6qlnitgtd15i3fmnoq.png"
              alt=""
            />
          }
        >
          <h3 className="vertical-timeline-element-title">{job3}</h3>
          <h5 className="mt-2" style={{ color: " rgb(66, 65, 65)" }}>
            {" "}
            Average Tenure : {tenure3 ? tenure3 : 1} years
          </h5>
          <p>Common Sectors</p>
          <p className="m-0">{data3.sectors.join(", ")}</p>
          <p>Common Company sizes</p>
          <p className="m-0"> {data3.sizes.join(", ")}</p>
        </VerticalTimelineElement>
      ) : (
        ""
      )}
      {job4 ? (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Previous Job 4"
          iconStyle={{
            background: "rgb(33, 150, 243,0.6)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center the content horizontally
          }}
          icon={
            <img
              width={30}
              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707309329/iu6qlnitgtd15i3fmnoq.png"
              alt=""
            />
          }
        >
          <h3 className="vertical-timeline-element-title">{job4}</h3>
          <h5 className="mt-2" style={{ color: " rgb(66, 65, 65)" }}>
            {" "}
            Average Tenure : {tenure4 ? tenure4 : 1} years
          </h5>
          <p>Common Sectors</p>
          <p className="m-0">{data4.sectors.join(", ")}</p>
          <p>Common Company sizes</p>
          <p className="m-0"> {data4.sizes.join(", ")}</p>
        </VerticalTimelineElement>
      ) : (
        ""
      )}
    </VerticalTimeline>
  );
};
