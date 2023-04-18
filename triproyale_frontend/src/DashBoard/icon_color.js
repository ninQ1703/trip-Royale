import { IconContext } from "react-icons";

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{ color: "green" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}