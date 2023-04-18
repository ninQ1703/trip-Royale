import { useEffect,useState } from "react"

const GetUser = (props) => {
    const [user, setUser] = useState({ user: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/users/${props.id}/`);
            const newUser = await response.json();
            if (newUser[0].id == props.user) {
                newUser[0].name = "you"
            }
            setUser(newUser);
        };
        fetchData();
    }, [])

    if (user.length) {
        return <span>{user[0].name}</span>
    } else {
        return null;
    }
}

export default GetUser;