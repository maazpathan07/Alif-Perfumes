import Login from "../components/Login/Login";
import SEO from "../components/SEO/SEO";

function LoginPage() {
  return (
    <>
      <SEO
        title="Admin Login"
        description="Authorized admin login portal for ALIF PERFUMES store management."
        robots="noindex, nofollow"
      />
      <Login />
    </>
  );
}

export default LoginPage;