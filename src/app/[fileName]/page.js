"use client"
import { useEffect, useState,use, useRef, useCallback } from "react"
import axios from "axios";
import TranscriptionItem from '../components/transcriptionItem.js'
import SparkleIcon from "../components/SparkleIcon.js";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Roboto from "./../fonts/Roboto-Regular.ttf"
import RobotoBold from "./../fonts/Roboto-Bold.ttf"

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/ffmpeg/ffmpeg-core.js"
});

export default function Page({params}) {
         const {fileName } = use( params);
         const[isTranscribing, setisTranscribing] = useState(false)
         const[isfetchingInfo, setisfetchingInfo] = useState(false)
         const[awsTrancription, setawsTranscription] = useState([])
         const[primaryColor,setprimaryColor] = useState('#FFFFFF')
         const[outlineColor,setoutlineColor] = useState('#000000')
         const[progress, setprogress] = useState(1)

           const videoRef = useRef(null);
           const [loaded, setLoaded] = useState(false);
           const ffmpegRef = useRef(null);

//  Constructs the URL. You are calling /api/transciption, and adding a query parameter filename=xyz 
// where xyz is the value of the filename variable.
  useEffect(() => {
    function getTranscription() {
        setisfetchingInfo(true)
      axios.get('/api/transcribe?filename=' + fileName).then(response => {
        setisfetchingInfo(false)
        console.log(response)
        const status = response.data?.status
        const transcription = response.data?.transcription

        if(status === 'IN_PROGRESS') {
          setisTranscribing(true)
          setTimeout(getTranscription,3000)
        }
        else {
          setisTranscribing(false)
          transcription.results.items.forEach((item,key)=> {
            if(!(item.start_time)) {
                const prev = transcription.results.items[key - 1]
                prev.alternatives[0].content += item.alternatives[0].content
                delete transcription.results.items[key]
            }
          });
          setawsTranscription(transcription.results.items)
        }
      })
    }

      getTranscription();
    
  }, [fileName]);

 const load = useCallback(async () => {
  if (!ffmpegRef.current) {
    ffmpegRef.current = ffmpeg;
  }
  
  // Check if FFmpeg is already loaded
  if (ffmpegRef.current.isLoaded()) {
    console.log('FFmpeg is already loaded');
    setLoaded(true);
    return;
  }
  
  await ffmpegRef.current.load({
    coreURL: "/ffmpeg/ffmpeg-core.js",
    wasmURL: "/ffmpeg/ffmpeg-core.wasm",
    workerURL: "/ffmpeg/ffmpeg-core.worker.js",
  });

  ffmpegRef.current.FS('writeFile', '/tmp/Roboto.ttf', await fetchFile(Roboto))
  ffmpegRef.current.FS('writeFile', '/tmp/Roboto-Bold.ttf', await fetchFile(RobotoBold))

  setLoaded(true);

}, [ffmpegRef, setLoaded]);

  useEffect(() => {
    if (videoRef.current) {
      const url = `/api/proxy-video?fileName=${fileName}`;
      videoRef.current.src = url;
      console.log("Video source set to:", url);
    }
    if (!loaded) {
      load();
    }
  }, [fileName, loaded, load]);


    // if (isTranscribing) {
    //     return <div>transcribing your video</div>;
    // }

    // if (isfetchingInfo) {
    //     return <div>fetching information.......</div>;
    // }

    if (isTranscribing) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="w-12 h-12 border-4 border-[#9747FF] border-t-white rounded-full animate-spin mb-4"></div>
      <div className="text-lg font-medium text-gray-700">Transcribing your video...</div>
    </div>
  );
}

if (isfetchingInfo) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="w-12 h-12 border-4 border-[#9747FF] border-t-white rounded-full animate-spin mb-4"></div>
      <div className="text-lg font-medium text-gray-700">Fetching information...</div>
    </div>
  );
}


  function secondToHHMMSSMS(TimeString) 
  {
      const d = new Date(parseFloat(TimeString) * 1000)
      return d.toISOString().slice(11,23).replace('.',',')
  }

  function toffmpegColor(rgb) {
    const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3)
    return '&H' + bgr + '&'
  }
    
  function transcriptionitemtoSrt() {
    let srt = ''
    let i = 1;

    awsTrancription.forEach(item => {
      srt += i + '\n';

      //timestamps
      srt += secondToHHMMSSMS(item.start_time) + ' --> ' + secondToHHMMSSMS(item.end_time) + '\n';

      //content
      srt += item.alternatives[0].content + '\n';
      srt += '\n';
      i++

    })

    return srt

  }

  const transcode = async () => {
    if (!loaded || !ffmpegRef.current) {
      alert('FFmpeg is still loading. Please wait...');
      return;
    }

    try {
      const srt = transcriptionitemtoSrt()
      // Write input file using proxy to avoid CORS
      ffmpegRef.current.FS('writeFile', fileName, await fetchFile(
        `/api/proxy-video?fileName=${fileName}`
      ));
      ffmpegRef.current.FS('writeFile','subs.srt',srt)

  videoRef.current.src = `/api/proxy-video?fileName=${fileName}`;
   await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration 
  ffmpegRef.current.setLogger(({ message }) => {
    const regexResult = /time=([0-9:.]+)/.exec(message);
    if (regexResult && regexResult?.[1]) {
      const howMuchIsDone = regexResult?.[1];
      const [hours, minutes, seconds] = howMuchIsDone.split(':');
      const doneTotalSeconds = hours * 3600 + minutes * 60 + parseFloat(seconds);
      // Make sure 'duration' is defined or replace with actual duration value
      const videoProgress = doneTotalSeconds / duration; // Replace 1 with actual duration if available
      setprogress(videoProgress);

    }
  });

      // Run ffmpeg
      await ffmpegRef.current.run("-i", fileName,
      '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toffmpegColor(primaryColor)},OutlineColour=${toffmpegColor(outlineColor)}'`,
      'output.mp4');

      // Read output file
      const data = ffmpegRef.current.FS('readFile', 'output.mp4');

      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
    } catch (error) {
      console.error('Error during transcoding:', error);
      alert('Error processing video. Please try again.');
    }

    setprogress(1)

  };

    return (
        <div className="grid grid-cols-2 gap-16 top-10">
            <div className="max-w-xs">
                <div className="flex gap-1 sticky top-0 bg-violet-800">
                    <div className="w-24">From</div>
                    <div className="w-24">End</div>
                    <div className="w-24">Content</div>
                </div>
                {awsTrancription.length > 0 && awsTrancription.map((item, idx) => (
                    <TranscriptionItem key={idx} item={item} />
                ))}
            </div>

            <div>
                <button
                    className="bg-green-600 flex py-2 px-6 mb-5 mt-3 gap-1 rounded-full cursor-pointer"
                    onClick={transcode}
                >
                    <SparkleIcon />
                    Apply Captions
                </button>

                <div>
                  primary color:
                  <input type="color"
                     value={primaryColor}
                     onChange={ev => setprimaryColor(ev.target.value)}
                  />
                </div>
                <br/>

                outline color:
                <input type="color"
                     value={outlineColor}
                     onChange={ev => setoutlineColor(ev.target.value)}
                  />

                <h2 className="text-2xl mb-4 text-white/60">Result</h2>
              
                <div className="rounded-xl overflow-hidden relative">
                   {progress && progress < 1 && (
                  <div className="absolute inset-0 bg-black/80 flex items-center">
                     <div className="w-full text-center">
                     <div className="bg-[#9747FF]/50 mx-8 rounded-lg overflow-hidden relative">
                      <div className="bg-[#9747FF] h-8"
                     style={{width:progress * 100+'%'}}>
                  <h3 className="text-white text-xl absolute inset-0 py-1">
                    {parseInt(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

                   <video
                    ref={videoRef}
                    src={`/api/proxy-video?fileName=${fileName}`}
                    controls
                />
                </div>
           
            </div>
        </div>
    );
}