import { useState } from "react";

const PairEmployeesLogic = () => {
    const { loadedFile, setLoadedFile } = useState("");

    const loadFile = () => {
        return "test";
    };

    return {
        loadFile : loadFile,
    };
}

export default PairEmployeesLogic;
