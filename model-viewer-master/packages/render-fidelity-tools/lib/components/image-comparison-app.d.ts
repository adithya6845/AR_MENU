import './analysis-view.js';
import './rendering-scenario.js';
import { LitElement } from 'lit';
import { ImageComparisonConfig } from '../common.js';
import { AnalysisView } from './analysis-view.js';
export declare class ImageComparisonApp extends LitElement {
    src: string;
    config: ImageComparisonConfig | null;
    analysisView: AnalysisView;
    updated(changedProperties: Map<any, any>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onHashChange;
    private loadConfig;
    private selectElement;
    render(): import("lit-html").TemplateResult<1>;
}
