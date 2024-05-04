import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

function Home() {

    const navigate = useNavigate()

    return (
        <>
            <div className="home">
                <h1>Welcome to Pink Diary!</h1>
                <h3>Where cute plans meet serious goals.</h3>
            </div>

            <Button />
        </>
    )
}

export default Home
