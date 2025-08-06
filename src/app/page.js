import DemoSection from "./components/DemoSection.js";
import PageHeader from "./components/PageHeader.js";
import UploadForm from "./components/UploadForm.js";


export default function Home() {
  
  return (
    <>
      <PageHeader 
      h1="Add epic caption to your videos"
      h2="Just upload the video and we will do the rest"
      />

      <UploadForm />

      <DemoSection/>

      
    </>
  );
}
