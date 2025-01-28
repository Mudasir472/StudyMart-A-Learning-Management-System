import RightPart from "./RightPart";
import img from "../../assets/Group 236.svg"
import profile from "../../assets/image 12.svg"
import Review from "./Review";
import Description from "./Description";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseProvider";
function CourceDetails() {
    const { courses, loading, error } = useContext(CourseContext);
    const [activeTab, setActiveTab] = useState("description");
    const [cource, setCourse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts or id changes
    }, [id]);


    useEffect(() => {
        const foundCourse = courses.find((item) => item._id === id);
        setCourse(foundCourse);
    }, [courses, id]);
    // console.log(cource);


    return (<>
        <div className="courcedetails">
            <div className="detailsMain">

                <div className="detailImg">
                    <img src={img} alt="" />
                </div>
                <div className="courceBody container mx-auto flex justify-between">

                    <div className="left flex flex-col gap-[1.5rem]">
                        <h2 className="mt-4 text-2xl font-medium">{cource?.title}</h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img className="h-[46px] me-3 rounded-full" src={cource?.instructorId?.profileImage?.url} alt="" />
                                <p className="me-4">{cource?.instructorId?.firstname} </p>
                            </div>
                            <p className="text-[#F48C06]">{cource?.enrolled?.length === 0 ? "0" : Array.isArray(cource?.enrolled) && cource?.enrolled?.length} Students Enrolled</p>
                            <div>
                                <p>{cource?.reviews?.length}<span className="ms-3">reviews</span></p>
                            </div>

                        </div>
                        <div>
                            {/* Header Section */}
                            <div className="leftHead py-[5px] w-[19rem] flex items-center justify-between">
                                <p
                                    onClick={() => setActiveTab("description")}
                                    className={`rounded-lg mr-[30px] text-lg font-semibold flex items-center justify-center h-[47px] w-[120px] cursor-pointer ${activeTab === "description"
                                        ? "bg-[#F48C06] text-white"
                                        : "bg-[#0000001a] text-[#00000066]"
                                        }`}
                                >
                                    Description
                                </p>
                                <p
                                    onClick={() => setActiveTab("review")}
                                    className={`rounded-lg text-lg mr-[30px] font-semibold h-[47px] flex items-center justify-center w-[115px] cursor-pointer ${activeTab === "review"
                                        ? "bg-[#F48C06] text-white"
                                        : "bg-[#0000001a] text-[#00000066]"
                                        }`}
                                >
                                    Review
                                </p>
                            </div>

                            {/* Body Section */}
                            <div className="left-body">
                                {activeTab === "description" ? <Description desc={cource?.description} /> : <Review id={id} />}
                            </div>
                        </div>
                    </div>
                    <div className="right w-[31%]">
                        <RightPart courseId={id} />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default CourceDetails;