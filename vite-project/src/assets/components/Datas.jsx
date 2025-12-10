import { useState } from "react";

function Datas() {

    const [data, setData] = useState([])

    fetch("https://gorest.co.in/public/v2/users")
        .then((value) => value.json())
        .then((data) => setData(data))

        console.log(data)


    return (
        <>
            <div>
                {data.map((data, index) => (

                    <h1 key={index}>{data.name}</h1>
                ))}

            </div>


        </>
    )
}

export default Datas;