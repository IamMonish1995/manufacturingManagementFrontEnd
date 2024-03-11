import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getallitems = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getallitems`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
