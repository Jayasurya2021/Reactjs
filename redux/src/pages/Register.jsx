import { useState } from "react";

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handlechange(e){
e.preventDefault()

    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={(e) => handlechange(e)}>
                <input type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            </form>

        </>
    )
}

export default Register;