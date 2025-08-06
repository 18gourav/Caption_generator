import SparkleIcon from "./SparkleIcon.js";

function DemoSection() {
    return(
        <div className="flex justify-center gap-12 items-center mt-12 ">

         <div 
      className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl">
        </div>

     <div>
      <SparkleIcon/>
     </div>

      <div
        className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"
      ></div>

      </div>

    )
}

export default DemoSection;