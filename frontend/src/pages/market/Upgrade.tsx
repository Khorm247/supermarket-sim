import {Button} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {useNavigate} from "react-router-dom";

type UpgradeProps = {
    addCategory: (category: string) => void,
    inventory: Inventory
}

export default function Upgrade(props: Readonly<UpgradeProps>) {
    const navigate = useNavigate();

    function handleUpgradeClick(category: string) {
        console.log(category);
        props.addCategory(category);
        navigate("/api/inventory")
    }

    return (
        <div>
            <h1>Laden ausbauen</h1>
            <p><Button onClick={() => handleUpgradeClick("FRUITS")}>Fruchtlizenz kaufen</Button></p>
            <p><Button onClick={() => handleUpgradeClick("CLEANING_SUPPLIES")}>Reinigungsproduktlizenz kaufen</Button></p>
            <p><Button>Regalplatz erweitern</Button></p>
            <p><Button>Lagerplatz erweitern</Button></p>
            <p><Button>Personal schulen</Button></p>
        </div>
    )
}