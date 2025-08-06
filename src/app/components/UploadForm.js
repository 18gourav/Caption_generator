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
           <div className="bg-gray-900/80 fixed inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-4xl ">Uploading....</div>
            <div className="text-white/40 text-xl">please wait</div>
           </div>
          )}


        <div className="flex justify-center">
        <label className="flex gap-1 bg-green-600 px-5 py-3 rounded-full mt-8 cursor-pointer">
           <UploadIcon/>
           <input onChange={Upload} type="file" className="hidden"/>
          Choose file</label>
        </div>

        </>
    )
}

export default UploadForm