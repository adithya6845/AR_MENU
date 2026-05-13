import { LitElement } from 'lit';
import { Dimensions, GoldenConfig, ScenarioRecord } from '../common.js';
export declare class RenderingScenario extends LitElement {
    name: string;
    goldens: Array<GoldenConfig>;
    dimensions: Dimensions;
    exclude: Array<string>;
    analysis: ScenarioRecord | null;
    get basePath(): string;
    connectedCallback(): Promise<void>;
    updated(changedProperties: Map<any, any>): void;
    private loadAnalysis;
    private metricTemplate;
    render(): import("lit-html").TemplateResult<1>;
}
