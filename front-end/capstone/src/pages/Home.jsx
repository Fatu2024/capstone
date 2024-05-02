
export default function Home() {
    return (
        <>
            <div className="home">
                <h1>Welcome to Pink Diary!</h1>
                <p>Keep track of your life with ease.</p>
                <button
                    className="get-started"
                    onClick={() => window.location.href = '/register'}
                >
                    Get Started
                </button>
            </div>
        </>
    )
}
