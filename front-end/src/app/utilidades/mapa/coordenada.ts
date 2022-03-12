export interface Coordenada{
    longitud: number;
    latitud: number;
}

export interface CoordenadaConMensaje extends Coordenada{
    mensaje: string;
}