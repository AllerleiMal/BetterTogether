import { Outlet } from "react-router-dom";
import AppTabs from "./AppTabs";

const Root = () => {
    return (
      <div style={{height: "100%"}}>
        <AppTabs />
        <div style={{display: "flex", height: "100%"}}>
          <Outlet />
        </div>
      </div>
    );
}

export default Root;