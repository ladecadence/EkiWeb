import { useEffect, useState } from 'react'
import './App.css'
import { ApiTelemetry } from './models/apitelemetry';
import { getTelemetry } from './services/data';
import ekiIcon from './assets/eki2-bn-small.png';
import Clock from './components/clock';
import LastImage from './components/lastimage';
import Missions from './components/missions';
import { apiSSE, apiServer } from './services/api';
import PosMap from './components/posmap';

function App() {

  const [telemetry, setTelemetry] = useState([] as ApiTelemetry[]);
  const [selectedMission, setSelectedMission] = useState("");
  const [updateTelemetry, setUpdateTelemetry] = useState(0);
  const [updateImage, setUpdateImage] = useState(0);

  useEffect(() => {
    const fetchTelemetry = async () => {
      const d: ApiTelemetry[] = await getTelemetry(selectedMission);
      if (d.length > 0) {
        setTelemetry(d);
      }
    }
    if (selectedMission != "") { fetchTelemetry() };
  }, [selectedMission, updateTelemetry])

  function checkUpdateMessage(msg: string) {
    console.log(msg)
    if (msg == "DATA") {
      setUpdateTelemetry(updateTelemetry + 1);
    } else if (msg == "IMAGE") {
      setUpdateImage(updateImage + 1);
    }
  }

  useEffect(() => {
    const sse = new EventSource(apiServer + apiSSE, { withCredentials: false });
    sse.onerror = () => {
      console.log("SSE Error");
      sse.close();
    }
    sse.onmessage = e => checkUpdateMessage(e.data);
    return () => {
      sse.close();
    };

  },[])

  return (
    <>
      <div className='main'>
        <div className='header'>
          <img src={ekiIcon} alt='Logo' height={50}></img>
          <strong className='headername'>EKI</strong><span className='headername'>TRACKER</span>
        </div>
        <div className='sidebar'>
          <div className='sidebar_section'>MISSION</div>
          <Missions updateMission={setSelectedMission}></Missions>
          <div>
            <div className='sidebar_section'>LAST DATA</div>
            {(telemetry.length > 0) ?
              <table className='telem'>
                <tbody>
                  <tr><th>GPS</th><th>{telemetry[telemetry.length - 1].lat}{telemetry[telemetry.length - 1].ns}, {telemetry[telemetry.length - 1].lon}{telemetry[telemetry.length - 1].ew}</th></tr>
                  <tr><th>Alt</th><th>{telemetry[telemetry.length - 1].alt} m</th></tr>
                  <tr><th>Sats</th><th>{telemetry[telemetry.length - 1].sats}</th></tr>
                  <tr><th>Hdg</th><th>{telemetry[telemetry.length - 1].hdg} º</th></tr>
                  <tr><th>Speed</th><th>{telemetry[telemetry.length - 1].spd} kn</th></tr>
                  <tr><th>A. rate</th><th>{telemetry[telemetry.length - 1].arate} m/s</th></tr>
                  <tr><th>Baro</th><th>{telemetry[telemetry.length - 1].baro} mBar</th></tr>
                  <tr><th>Temp int</th><th>{telemetry[telemetry.length - 1].tin} ºC</th></tr>
                  <tr><th>Temp ext</th><th>{telemetry[telemetry.length - 1].tout} ºC</th></tr>
                  <tr><th>Batt</th><th>{telemetry[telemetry.length - 1].vbat} V</th></tr>
                  <tr><th>Date</th><th>{telemetry[telemetry.length - 1].date}</th></tr>
                  <tr><th>Time</th><th>{telemetry[telemetry.length - 1].time}</th></tr>
                </tbody>
              </table> : 'loading...'
            }
          </div>
          <div className='sidebar_section'>LAST IMAGE</div>
          <div className='ssdvimg'>
            <LastImage selectedMission={selectedMission} updateImage={updateImage}></LastImage>
          </div>
          <div className='sidebar_section'>LOCAL TIME</div>
          <div className='clock'>
            <Clock></Clock>
          </div>
        </div>
        <div className="map">
          <PosMap telemetry={telemetry}></PosMap>
        </div>
      </div >
    </>
  )
}

export default App
