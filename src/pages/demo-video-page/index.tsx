import FooterComponent from "../../components/layout/footer";
import NavBar from "../../components/layout/navbar";
import BgVideo from "../../videos/demo.mp4";

const DemoVideo = () => {
  return (
    <div>
   <NavBar background={"white"} />
      <div
        style={{
          marginTop: "100px",
          display: "grid",
          placeItems: "center",
          height: "90vh",
        }}
        className="container"
      >
        <div>
          <video
            style={{
              width: "75%",
              height: "75%",
              objectFit: "contain",
            }}
            src={BgVideo}
            autoPlay
            controls
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default DemoVideo;
