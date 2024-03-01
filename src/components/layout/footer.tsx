import { terms_condition_path } from "../../config/config";

const FooterComponent = () => {
  return (
    <footer className="footer bg-light">
      <div className="container-fluid d-flex flex-md-row flex-column justify-content-between align-items-md-center gap-1 container-p-x py-3 px-5" >
        <div>
          <a href="/" target="_blank" className="footer-text fw-bolder">
            Azkroflyz
          </a>{" "}
          © 2024
        </div>
        <div>
          <a href="/void" className="footer-link me-4">
            Help
          </a>
          <a href="/void" className="footer-link me-4">
            Contact
          </a>
          <a href={terms_condition_path} className="footer-link">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
