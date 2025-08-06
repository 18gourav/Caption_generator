import { useState } from "react"

export default function TranscriptionItem({ item}) {
        const[startTime, setstartTime] = useState(item.start_time)
        const[endTime, setendTime] = useState(item.end_time)
        const[content, setcontentTime] = useState(item.alternatives[0].content)
        
    return(

        <div key={item.start_time}
        className="my-1 grid grid-cols-3 gap-1 items-center"
        >
                    <input type="text"
                    className="bg-white/20 p-1 rounded-md"
                    value={startTime}
                    onChange={ev=>{
                        setstartTime(ev.target.value)
                    }}
                    />

                     <input type="text"
                      className="bg-white/20 p-1 rounded-md"
                    value={endTime}
                    onChange={ev=>{
                        setendTime(ev.target.value)
                    }}
                    />
                     <input type="text"
                      className="bg-white/20 p-1 rounded-md"
                    value={content}
                    onChange={ev=>{
                        setcontentTime(ev.target.value)
                    }}
                    />
                    
                </div>
    )
}