import { LitElement } from 'lit';
import { Pixel } from '../common.js';
import { ImageAccessor } from '../image-accessor.js';
export declare class MagnifyingGlass extends LitElement {
    imageAccessor: ImageAccessor | null;
    pixel: Pixel | null;
    direction: string;
    position: Pixel;
    protected context: CanvasRenderingContext2D | null;
    protected xRay: boolean;
    protected reticleSize: number;
    protected enhance(): void;
    toggleXRay(): void;
    protected hide(): void;
    get glassPosition(): "right" | "left" | "bottom" | "top";
    render(): import("lit-html").TemplateResult<1>;
}
