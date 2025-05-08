import { useState } from "react";

function Clock() {
    const [date, setDate] = useState(new Date());
  
    setInterval(() => {
        setDate(new Date());
    }, 1000);

    return (
        <main>
          <section>
            {date.getHours().toString().padStart(2, '0')} : {date.getMinutes().toString().padStart(2, '0')} : {date.getSeconds().toString().padStart(2, '0')}
          </section>
        </main>
      );
    }
    
    export default Clock;  