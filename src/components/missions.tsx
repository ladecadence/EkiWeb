import { useEffect, useState } from "react";
import { ApiMission } from "../models/apimissions";
import { getMissions } from "../services/mission";

interface MissionProps {
    updateMission(mission: string): void;
}

function Missions({updateMission = f => f}: MissionProps) {
    const [missions, setMissions] = useState([] as ApiMission[]);
    
  useEffect(() => {
    const fetchMissions = async () => {
      const m: ApiMission[] = await getMissions();
      if (m.length > 0) {
        setMissions(m);
        updateMission(m[0].name)
      }
    }
    fetchMissions();
  }, [])


  return(
    <form>
            {(missions.length > 0) ?
              <select name='mission' className="select">
                {missions.map((mission, i) => <option value={mission.name} key={i}>{mission.name}</option>)}
              </select> : 'loading...'
            }
    </form>
  )

}

export default Missions;