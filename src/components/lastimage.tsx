import { useEffect, useState } from "react";
import { getLastImage } from "../services/image";

interface imageProps {
  selectedMission: string;
  updateImage: number;
}

function LastImage({ selectedMission = "", updateImage }: imageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastImg, setLastImg] = useState("");

  useEffect(() => {
    const fetchLastImg = async () => {
      const url = await getLastImage(selectedMission);
      setLastImg(url);
    }
    if (selectedMission != "") { fetchLastImg() };
  }, [selectedMission, updateImage])

  return (
    <>
      { lastImg != "" ? <img src={lastImg} alt="Last image" onClick={() => setDialogOpen(!dialogOpen)} /> : 'loading...'}
      { dialogOpen && (
        <dialog
          className="image_dialog"
          style={{ position: 'absolute' }}
          open
          onClick={() => setDialogOpen(!dialogOpen)}
        >
          <img
            className="image_popup"
            src={lastImg}
            onClick={() => setDialogOpen(!dialogOpen)}
            alt="Last image"
          />
        </dialog>
      )}
    </>
  )

}

export default LastImage