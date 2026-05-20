import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(res => {
                console.log("API RESPONSE:", res.data);
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Products</h2>

            {Array.isArray(products) ? (
                products.map((p) => (
                    <div key={p.product_id}>
                        <h3>{p.name}</h3>
                        <p>{p.price}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}