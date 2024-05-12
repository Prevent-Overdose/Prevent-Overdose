import { useEffect } from "react"




const AboutUs = ()=>{
    useEffect(()=>{
        document.title = "About Us"
    },[])
    return(
        <div className="AboutUs-page">
            <h1>About Us</h1>
        
        </div>
        

        
        

    )
}

export default AboutUs