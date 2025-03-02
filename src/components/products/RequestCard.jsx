import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../Card.jsx";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dayJs.js";

export const RequestCard = ({ index, solicitud }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fecha = formatDate(solicitud.fecha);
    const foto = solicitud.fotos[0];

    return (
        <Card index={index}>
            <div className="flex items-center gap-4 h-full">
                {foto ? (
                    <img
                        className="rounded-2xl h-11/12"
                        src={`${staticPath}/articulos/${solicitud.vendedorId}/${solicitud.articuloId}/${foto.foto}`}
                    />
                ) : (
                    <img
                        className="rounded-2xl h-11/12"
                        src="/imgs/no-img-available.png"
                    />
                )}
                <div className="font-body">
                    <h3 className="font-bold text-electric-violet-950">
                        {solicitud.articulo}
                    </h3>
                    <p>{fecha}</p>
                </div>
            </div>
            {solicitud.estado === "aceptada" && (
                <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="text-electric-violet-800 text-3xl text"
                />
            )}
        </Card>
    );
};
