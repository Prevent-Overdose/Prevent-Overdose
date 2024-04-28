import { useEffect } from "react"



const Resources = ()=>{
    useEffect(()=>{
        document.title = "Resources"
    },[])
    return(
        <div className="Resources-page">
            <h1>Resources</h1>
        </div>
    )
}

export default Resources