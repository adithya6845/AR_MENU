export interface OffscreenCanvas extends HTMLCanvasElement {
}
export declare const COMPONENTS_PER_PIXEL: number;
export declare const MAX_COLOR_DISTANCE: number;
export declare const DEVICE_PIXEL_RATIO: number;
export declare const FIDELITY_TEST_THRESHOLD: number;
export interface FidelityRegressionResults {
    results: Array<ImageComparisonAnalysis>;
    warnings: Array<string>;
    errors: Array<string>;
}
export interface ImageComparisonAnalysis {
    rmsDistanceRatio: number;
}
export interface ImageComparisonResults {
    analysis: ImageComparisonAnalysis;
}
export interface Visuals {
    imageBuffers: {
        delta: ArrayBuffer | null;
        blackWhite: ArrayBuffer | null;
    };
}
export interface ScenarioRecord {
    analysisResults: Array<ImageComparisonAnalysis>;
    scenarioConfig: ScenarioConfig;
}
export interface ImageComparisonMessage {
    type: 'canvases-ready' | 'images-assigned' | 'threshold-changed' | 'analysis-completed';
}
export interface CanvasesReadyMessage extends ImageComparisonMessage {
    candidateCanvas: OffscreenCanvas;
    goldenCanvas: OffscreenCanvas;
    blackWhiteCanvas: OffscreenCanvas;
    deltaCanvas: OffscreenCanvas;
}
export interface ImagesAssignedMessage extends ImageComparisonMessage {
    candidateImageBuffer: ArrayBuffer;
    goldenImageBuffer: ArrayBuffer;
    dimensions: Dimensions;
}
export interface ThresholdChangedMessage extends ImageComparisonMessage {
    threshold: number;
}
export interface AnalysisCompletedMessage extends ImageComparisonMessage {
    result: Visuals;
}
export interface Dimensions {
    width: number;
    height: number;
}
export interface Pixel {
    x: number;
    y: number;
}
export interface Rect extends Dimensions {
    x: number;
    y: number;
}
export interface ScenarioConfig {
    name: string;
    model: string;
    lighting: string;
    dimensions: Dimensions;
    target: {
        x: number;
        y: number;
        z: number;
    };
    orbit: {
        theta: number;
        phi: number;
        radius: number;
    };
    verticalFoV: number;
    exclude?: Array<string>;
    renderSkybox: boolean;
    pt?: {
        numSamples?: number;
    };
}
export interface RendererConfig {
    name: string;
    description: string;
    scripts?: {
        setup: string;
    };
    command?: {
        executable?: string;
        args?: string[];
    };
}
export interface GoldenConfig extends RendererConfig {
    file: string;
}
export interface ImageComparisonConfig {
    rootDirectory: string;
    analysisThresholds: Array<number>;
    renderers: Array<RendererConfig>;
    scenarios: Array<ScenarioConfig>;
}
export interface AnalysisOptions {
    generateVisuals: boolean;
}
export declare class ImageComparator {
    protected candidateImage: Uint8ClampedArray;
    protected goldenImage: Uint8ClampedArray;
    readonly dimensions: Dimensions;
    protected imagePixels: number;
    constructor(candidateImage: Uint8ClampedArray, goldenImage: Uint8ClampedArray, dimensions: Dimensions);
    protected drawPixel(image: Uint8ClampedArray, position: number, r: number, g: number, b: number, a?: number): void;
    generateVisuals(threshold: number): Visuals;
    analyze(): ImageComparisonResults;
}
export declare function toDecibel(value: number): number;
