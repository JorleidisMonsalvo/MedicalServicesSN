import Login from "../components/Login";
import { useStateContext } from "../context/StateContext";
import HomeUser from "../components/HomeUser";
export default function Home() {
  const { isLogged } = useStateContext();
  return <div> {!isLogged ? <Login /> : <HomeUser />}</div>;
}
