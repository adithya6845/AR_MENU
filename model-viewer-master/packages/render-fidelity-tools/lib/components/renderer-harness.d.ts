import { LitElement } from 'lit';
import { ImageComparisonConfig, ScenarioConfig } from '../common.js';
export declare class RendererConfiguration extends LitElement {
    scenarioName: string | null;
    configUrl: string | null;
    hideUi: boolean;
    protected config: ImageComparisonConfig | null;
    protected scenario: ScenarioConfig | null;
    connectedCallback(): void;
    protected get queryParameters(): {
        [index: string]: string;
    };
    updated(changedProperties: Map<string, any>): Promise<void>;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
