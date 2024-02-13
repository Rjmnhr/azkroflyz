import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../config/axios";

const OtpVerification = () => {
  const [warning, setWarning] = useState<string>("");
  const [otpPin, setOtpPin] = useState<string[]>(Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    if (/^\d?$/.test(input)) {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index] = input;

      if (input && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      setOtpPin(updatedOtpPin);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otpPin[index] === "") {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index - 1] = "";
      setOtpPin(updatedOtpPin);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (
      event.key === "ArrowRight" &&
      index < 5 &&
      otpPin[index] !== ""
    ) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const joinedOtpPin = otpPin.join("");

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: joinedOtpPin,
    })
      .then(async (response) => {
        const data = await response.data;
        console.log(data);
        if (response.status !== 200) {
          alert("something wrong");
          return;
        }
        createProfile();
      })
      .catch((err) => {
        setWarning("Invalid OTP");
        console.log(err);
      });
  };
  const email = localStorage.getItem("email") || "";
  const first_name = localStorage.getItem("first_name") || "";
  const last_name = localStorage.getItem("last_name") || "";
  const password = localStorage.getItem("password") || "";

  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("password");
  };

  const createProfile = () => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);

    AxiosInstance.post("/api/user/register-azkroflyz", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;
        console.log(data);

        clearLocalStorage();
        navigate("/tool");
      })
      .catch((err) => {
        console.log(err);
        alert("something is wrong");
        navigate("/login");
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="left-container">
          <h1>2ndStorey</h1>
        </div>
        <div className="right-container">
          <div className="right-sub-container">
            <div>
              <div>
                <h3>Enter Verification Code</h3>
              </div>
              <p style={{ width: "80%" }}>
                Please type in the <span>4-digit code</span>
                sent to your email. If it does not appear in your Inbox, please
                check your Updates, Quarantined or Spam folders.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {otpPin.map((otp, index) => (
                <input
                  style={{
                    width: "12px",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid black",
                    outline: "none",
                  }}
                  key={index}
                  type="number"
                  id={`otp-${index}`}
                  ref={(ref) => {
                    if (inputRefs?.current && inputRefs.current[index]) {
                      inputRefs.current[index] = ref!;
                    }
                  }}
                  value={otp}
                  onChange={(event) => handleInputChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  maxLength={1}
                />
              ))}

              <p style={{ color: "red" }}>{warning}</p>
              <br />
              <button type="submit">Next</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
