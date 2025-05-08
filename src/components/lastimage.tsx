import { useEffect, useState } from "react";
import { getLastImage } from "../services/image";

interface imageProps {
  selectedMission: string;
  updateImage: number;
}

function LastImage({ selectedMission = "", updateImage }: imageProps) {
    const [lastImg, setLastImg] = useState("");
    
    useEffect(() => {
        const fetchLastImg = async () => {
          const url = await getLastImage(selectedMission);
          setLastImg(url);
        }
        if (selectedMission != "") { fetchLastImg() };
      }, [selectedMission, updateImage])
    
    return (
        lastImg != "" ? <img src={lastImg} alt="LastImg" /> : 'loading...'
    )

}

export default LastImage