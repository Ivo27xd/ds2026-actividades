interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const lista = document.getElementById("lista") as HTMLUListElement;
const error = document.getElementById("error") as HTMLParagraphElement;
const mensaje = document.getElementById("loading") as HTMLParagraphElement;

async function obtenerUsuarios(): Promise<Usuario[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const usuarios: Usuario[] = await response.json();
    return usuarios;
}

const renderizarUsuarios = (usuarios: Usuario[]) => {
    lista.innerHTML = "";

    for (const u of usuarios) {
        const li = document.createElement("li");

        const nombre = document.createElement("span");
        nombre.textContent = u.name
        nombre.classList.add("nombre")

        const email = document.createElement("span");
        email.textContent = u.email;
        email.classList.add("email");

        li.appendChild(nombre);
        li.appendChild(email);
        lista.appendChild(li);
    }
};

const cargarUsuarios = async () => {
    mensaje.style.display = "block";
    error.textContent = "";

    try {
        const usuarios = await obtenerUsuarios();
        renderizarUsuarios(usuarios);
    } catch (err) {
        error.textContent = "Error al cargar usuarios";
    } finally {
        mensaje.style.display = "none";
    }
};

cargarUsuarios();