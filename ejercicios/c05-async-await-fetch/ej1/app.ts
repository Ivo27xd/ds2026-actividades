interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios: Usuario[] = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}

async function mostrarUsuarios(): Promise<void> {
    const usuarios = await obtenerUsuarios();

    for (const u of usuarios) {
        console.log(`${u.name} - ${u.email}`);
    }
}

mostrarUsuarios();