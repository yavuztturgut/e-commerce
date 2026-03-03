import React, {useEffect} from 'react';

function ApiCheck(props) {

    useEffect(() => {
        const getTodo = async (id) => {
            const response = await fetch(`http://localhost:3000/api/todos`);

            if (!response.ok) {
                throw new Error("Sunucu hatası!");
            }

            const data = await response.json();
            console.log("Veri:", data);
        };

        getTodo(1);
    }, []);
    return (
        <div></div>
    );
}

export default ApiCheck;