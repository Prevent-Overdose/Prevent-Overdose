import { useEffect } from "react"



const Home = ()=>{
    useEffect(()=>{
        document.title = "Home - PreventOD"
    },[])
    return(
        <div className="Home-page">
            <h1>Home</h1>

            <p>Welcome to Prevent Overdose</p>

        </div>
    )
}

export default Home