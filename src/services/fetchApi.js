const apiPath = import.meta.env.VITE_BACKEND_HOST;

/* USUARIOS */
export const registerUserService = async (value) => {
    const response = await fetch(`${apiPath}/usuarios/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return message;
};

export const loginUserService = async (value) => {
    const response = await fetch(`${apiPath}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return { message, token: data.token };
};

export const getOwnUserService = async (token) => {
    const response = await fetch(`${apiPath}/usuarios/own`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.usuario;
};

export const getAllUsersService = async () => {
    const response = await fetch(`${apiPath}/usuarios`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.users;
};

export const getUserService = async (id) => {
    const response = await fetch(`${apiPath}/usuarios/${id}`);

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data.usuario;
};

export const getUserSalesService = async (id) => {
    const response = await fetch(`${apiPath}/usuarios/${id}/ventas`);

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data.ventasValoraciones;
};

export const getUserRequestsService = async (id) => {
    const response = await fetch(
        `${apiPath}/usuarios/${id}/solicitudes-compra`
    );

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data.solicitudesCompra;
};

/* ARTICULOS */
export const getProductsService = async (filters) => {
    const response = await fetch(`${apiPath}/articulos${filters}`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.articulos;
};

export const getPendingProductsService = async (token) => {
    const response = await fetch(`${apiPath}/articulos-pendientes`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.articulos;
};

export const getCategoriesService = async () => {
    const response = await fetch(`${apiPath}/articulos/categorias`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.categorias;
};

export const getAllRequestsService = async () => {
    const response = await fetch(`${apiPath}/solicitudes`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.solicitudes;
};

export const newProductService = async (info, token) => {
    const formData = new FormData();
    formData.append("nombre", info.nombre || "");
    formData.append("categoria", info.categoria || "");
    formData.append("localidad", info.localidad || "");
    formData.append("precio", info.precio || "");
    formData.append("descripcion", info.descripcion || "");
    if (info.img1) formData.append("img1", info.img1);
    if (info.img2) formData.append("img2", info.img2);
    if (info.img3) formData.append("img3", info.img3);
    const response = await fetch(`${apiPath}/articulos`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return { message, data };
};
