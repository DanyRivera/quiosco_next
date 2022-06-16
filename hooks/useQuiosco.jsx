import { useContext } from "react";
import QuiscoContext from "../context/QuiscoProvider";

const useQuiosco = () => {
    return useContext(QuiscoContext);
}

export default useQuiosco;