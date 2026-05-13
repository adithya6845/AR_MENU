export declare class ImageAccessor {
    protected source: ImageData;
    static fromArrayBuffer(buffer: ArrayBuffer, width: number, height: number): ImageAccessor;
    static fromImageElement(image: HTMLImageElement): ImageAccessor;
    toArrayBuffer(): ArrayBuffer;
    cssColorAt(x: number, y: number): string;
    constructor(source: ImageData);
    get width(): number;
    get height(): number;
}
