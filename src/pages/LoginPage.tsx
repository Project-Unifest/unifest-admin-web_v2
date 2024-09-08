import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/LoginPage.css";
import { axiosClient } from "../apis/axios";

const LoginPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosClient.post(`/login`, {
        email: email,
        password: password,
      });
      setAccessToken(response.headers.authorization);
      setRefreshToken(response.headers.refreshtoken);
    } catch (error) {
      console.error("Login error:", error);
    }
    navigator("/");
  };
  const onClickHandler = () => {
    localStorage.setItem("accessToken", "1234");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <div className="LoginDiv" style={{ width: "580px" }}>
        <div className="LoginTitleDiv">유니페스 총학생회 관리페이지</div>
        <div className="LoginBoldDiv">로그인</div>
        <div>
          <form className="LoginForm" onSubmit={handleSubmit}>
            <div>
              <input
                className="inputIDPW"
                placeholder="아이디를 입력해주세요"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <input
                className="inputIDPW"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div style={{ display: "flex", margin: "20px 0px 0px 0px" }}>
              <input className="inputChk" type="checkbox"></input>
              <label>자동 로그인</label>
            </div>
            <div>
              <button className="LoginBtn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
