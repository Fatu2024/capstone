import { useNavigate } from "react-router-dom"

function Button() {

    const navigate = useNavigate();
    return (
        <div>
            <button className="btn" onClick={() => {
                navigate('/register')
            }}>
                I'm Ready to Think Pink!
            </button>
        </div>
    )
}

export default Button
