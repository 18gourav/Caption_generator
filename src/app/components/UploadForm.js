'use client'
import axios from "axios";
import UploadIcon from "./UploadIcon.js";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

function UploadForm() {

    const router = useRouter();

    const[isUploading, setIsUploading] = useState(false)

    async function Upload(ev) {

        ev.preventDefault();
        // console.log(ev);

        const Files = ev.target.files;
        if (Files.length > 0) {
            const File = Files[0];

            setIsUploading(true);

           try {
            //in this segment i created a from data object to send the file to the server
            const formData = new FormData();
            formData.append('File', File);
            const res = await axios.post('/api/upload', formData);
            console.log(res.data);

            setIsUploading(false);

            //in this segment i am redirecting the user to the uploaded file
            //i am using the newName property from the response data to create the url
            const fileName = res.data.newName;
            router.push('/' + fileName);    

           } catch (error) {
             console.log(error)
           }

        }

    };

    return(
        <>
          {isUploading && (
           <div className="bg-black/80 fixed inset-0 flex flex-col items-center justify-center z-50">
            <div className="bg-gray-900/95 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 border-4 border-[#9747FF] border-t-white rounded-full animate-spin mb-6"></div>
                <div className="text-white text-2xl font-semibold mb-2">Uploading your video...</div>
                <div className="text-gray-400 text-lg">Please wait while we process your file</div>
              </div>
            </div>
           </div>
          )}


        <div className="flex justify-center">
        <label className="flex gap-2 bg-gradient-to-r from-[#9747FF] to-purple-600 hover:from-purple-600 hover:to-[#9747FF] px-8 py-4 rounded-full mt-8 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white font-semibold">
           <UploadIcon/>
           <input onChange={Upload} type="file" className="hidden" accept="video/*"/>
          Choose Video File</label>
        </div>

        </>
    )
}

export default UploadForm