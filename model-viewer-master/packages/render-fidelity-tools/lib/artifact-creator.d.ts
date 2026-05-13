import { Dimensions, GoldenConfig, ImageComparisonAnalysis, ImageComparisonConfig, ScenarioConfig } from './common.js';
declare const $configReader: unique symbol;
export type AnalysisResults = Array<ImageComparisonAnalysis>;
export interface ScenarioRecord extends ScenarioConfig {
    analysisResults: AnalysisResults;
}
export declare class ArtifactCreator {
    protected config: ImageComparisonConfig;
    protected rootDirectory: string;
    protected baseUrl: string;
    private [$configReader];
    private browser;
    constructor(config: ImageComparisonConfig, rootDirectory: string, baseUrl: string);
    close(): Promise<void>;
    protected get outputDirectory(): string;
    protected get goldens(): Array<GoldenConfig>;
    compareRenderers(scenario: ScenarioConfig, renderer: string): Promise<void>;
    captureAndAnalyzeScreenshot(scenario: ScenarioConfig, renderer: string, quiet?: boolean): Promise<ImageComparisonAnalysis>;
    fidelityTest(scenarioWhitelist: (Set<string> | null) | undefined, renderer: string, dryRun?: boolean, quiet?: boolean): Promise<void>;
    protected analyze(candidateImage: Uint8ClampedArray, goldenImage: Uint8ClampedArray, dimensions: Dimensions): Promise<ImageComparisonAnalysis>;
    captureScreenshot(renderer: string, scenarioName: string, dimensions: Dimensions, outputPath?: string, maxTimeInSec?: number, quiet?: boolean): Promise<Uint8Array<ArrayBufferLike> | undefined>;
}
export {};
