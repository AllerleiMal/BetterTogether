import { Tab, Tabs } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppTabs = () => {
    // const [value, setValue] = useState<string>(window.location.pathname);
    const navigate = useNavigate();
    const value: string = useMemo(() => window.location.pathname, [window.location.pathname]);

    const handleOnChange = useCallback((event: React.SyntheticEvent<Element, Event>, value: string) => {
        if (value !== window.location.pathname){
            navigate(value);
        }
    }, [value, window.location.pathname]);

    return (
    <Tabs orientation="horizontal" value={value} onChange={handleOnChange} className="">
        <Tab label="Home" value={'/home'}/>
        <Tab label="Catalog" value={'/catalog'}/>
        <Tab label="Rooms" value={'/rooms'}/>
    </Tabs>
    );
}

export default AppTabs;

