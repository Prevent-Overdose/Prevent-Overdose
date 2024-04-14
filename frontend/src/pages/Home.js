import { useEffect } from "react"



const Home = ()=>{
    useEffect(()=>{
        document.title = "Home - PreventOD"
    },[])
    return(
        <div className="Home-page">
            <h1>Home</h1>
        </div>
    )
}

export default Home