import axios from "axios";
import { useEffect } from "react";

function Oppinmentpage() {

    const [datas, setdata] = useState("")
    

    useEffect(() => {
        axios
            .get('http://localhost:5000/above')
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err))
    }, [datas])
    return (
        <>
            <div>
                {/* {datas.map((ele, index) => (
                    <h1 key={index}>{ele.name}</h1>
                ))} */}

            </div>
        </>
    )
}

export default Oppinmentpage;