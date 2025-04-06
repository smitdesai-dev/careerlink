import { useNavigate } from "react-router-dom";
import "../css/errorpage.css";

function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/");
  };
  return (
    <>
      <div id="error-background">
        <img src="roboterrorpage.jpg" alt="" id="error-img" />
        <input
          type="button"
          value="Go Back Home"
          id="error-button"
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default ErrorPage;
