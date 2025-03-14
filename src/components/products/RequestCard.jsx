import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../Card.jsx";
import { faSquareCheck, faComment } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dayJs.js";
import { Link } from "react-router-dom";

export const RequestCard = ({ index, solicitud }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fecha = formatDate(solicitud.fecha);

    const fotos = solicitud.fotos;
    const foto = fotos ? fotos[0] : null;

    return (
        <Card index={index}>
            <Link
                to={`/articulos/${solicitud.articuloId}/solicitudes/${solicitud.solicitudId}`}
                className="flex items-center gap-4 h-full"
            >
                {foto ? (
                    <img
                        className="rounded-2xl h-11/12 aspect-square"
                        src={`${staticPath}/articulos/${solicitud.vendedorId}/${solicitud.articuloId}/${foto.foto}`}
                    />
                ) : (
                    <img
                        className="rounded-2xl h-11/12 aspect-square"
                        src="/imgs/no-img-available.png"
                    />
                )}
                <div className="font-body">
                    <h3 className="font-bold text-electric-violet-950">
                        {solicitud.articulo}
                    </h3>
                    {solicitud.username ? (
                        <p>
                            Solicitud de{" "}
                            {/* <Link
                                to={`/usuario/${solicitud.compradorId}`}
                                className="text-electric-violet-900 hover:text-electric-violet-600 transition-colors duration-200"
                            > */}
                            {solicitud.username}
                            {/* </Link> */}
                        </p>
                    ) : (
                        <p>{fecha}</p>
                    )}
                </div>
            </Link>

            {solicitud.estado === "aceptada" && (
                <div className="flex items-center gap-4 cursor-pointer">
                    {/* icono de bocadillo */}
                    <Link
                        to={`/articulos/${solicitud.articuloId}/${solicitud.solicitudId}/valorar`}
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            className="z-10 text-electric-violet-800 text-3xl text"
                        />
                    </Link>
                    {/* check de compra aceptada */}
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-electric-violet-800 text-3xl text"
                    />
                </div>
            )}
        </Card>
    );
};
