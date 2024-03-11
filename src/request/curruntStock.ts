import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getcurruntstock = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getcurruntstock`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
