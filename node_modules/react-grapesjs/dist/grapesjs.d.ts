declare module 'grapesjs' {
    export declare var editor: Editor;

    export declare function init(config?: EditorConfig): Editor;

    interface Editor {
        $: () => any;
        editor: object;
        DomComponents: object;
        LayerManager: object;
        CssComposer: object;
        StorageManager: object;
        AssetManager: AssetManager;
        BlockManager: BlockManager;
        TraitManager: object;
        SelectorManager: SelectorManager;
        CodeManager: object;
        Commands: any;
        Keymaps: object;
        Modal: Modal;
        Panels: any;
        StyleManager: object;
        Canvas: Canvas;
        UndoManager: object;
        DeviceManager: object;
        RichTextEditor: object;
        Parser: object;
        Utils: object;
        Config: EditorConfig | object;


        getConfig(prop: string): EditorConfig | object;

        getHtml(opts: any): string;

        getCss(opts: any): string;

        getJs(opts: any): string;

        getComponents(): object[];

        getWrapper(): object;

        setComponents(components: object[]): Editor;

        addComponents(components: object[]): object[];

        getStyle(): object;

        setStyle(style: object[] | object | string): Editor;

        getSelected(): Selection[];

        getSelectedAll(): Selection[];

        getSelectedToStyle(): object | undefined;

        select(el: object | HTMLElement): Editor;

        selectAdd(el: object | HTMLElement | object[] | HTMLElement[]): Editor;

        selectRemove(el: object | HTMLElement | object[] | HTMLElement[]): Editor;

        selectToggle(el: object | HTMLElement | object[] | HTMLElement[]): Editor;

        setDevice(name: string): Editor;

        getDevice(): object;

        runCommand(id: string, options: object): any;

        stopCommand(id: string, options: object): any;

        store(clb: () => any): object;

        load(clb: () => any): object;

        getContainer(): HTMLElement;

        getDirtyCount(): number;

        refresh(): void;

        setCustomRte(obj: object): void;

        setCustomParserCss(parser: () => any | null): Editor;

        log(msg: any, opts?: LogOptions): Editor;

        on(event: GrapesEvent | string, callback: () => any): Editor;

        once(event: GrapesEvent | string, callback: () => any): Editor;

        off(event: GrapesEvent | string, callback: () => any): Editor;

        trigger(event: GrapesEvent | string, ...params: any): Editor;

        destroy(): void;

        getModel(): object;

        render(): HTMLElement;
    }

    type GrapesEvent = ComponentEvent
        | BlockEvent
        | AssetEvent
        | KeymapEvent
        | StyleManagerEvent
        | StorageEvent
        | CanvasEvent
        | SelectorEvent
        | RichTextEditorEvent
        | ModalEvent
        | CommandEvent
        | GeneralEvent;

    type ComponentEvent =
        'component:create'
        | 'component:mount'
        | 'component:add'
        | 'component:remove'
        | 'component:clone'
        | 'component:update'
        | 'component:update:{propertyName}'
        | 'component:styleUpdate'
        | 'component:styleUpdate:{propertyName}'
        | 'component:selected'
        | 'component:deselected'
        | 'component:toggled';

    type BlockEvent =
        'block:add'
        | 'block:remove'
        | 'block:drag:start'
        | 'block:drag'
        | 'block:drag:stop';

    type AssetEvent =
        'asset:add'
        | 'asset:remove'
        | 'asset:upload:start'
        | 'asset:upload:end'
        | 'asset:upload:error'
        | 'asset:upload:response';

    type KeymapEvent =
        'keymap:add'
        | 'keymap:remove'
        | 'keymap:emit'
        | 'keymap:emit:{keymapId}';

    type StyleManagerEvent =
        'styleManager:update:target'
        | 'styleManager:change'
        | 'styleManager:change:{propertyName}';

    type StorageEvent =
        'storage:start'
        | 'storage:start:store'
        | 'storage:start:load'
        | 'storage:load'
        | 'storage:store'
        | 'storage:end'
        | 'storage:end:store'
        | 'storage:end:load'
        | 'storage:error'
        | 'storage:error:store'
        | 'storage:error:load';

    type CanvasEvent =
        'canvas:dragenter'
        | 'canvas:dragover'
        | 'canvas:drop'
        | 'canvas:dragend'
        | 'canvas:dragdata';

    type SelectorEvent = 'selector:add';

    type RichTextEditorEvent = 'rte:enable' | 'rte:disable';

    type ModalEvent = 'modal:open' | 'modal:close';

    type CommandEvent =
        'run:{commandName}'
        | 'stop:{commandName}'
        | 'run:{commandName}:before'
        | 'stop:{commandName}:before'
        | 'abort:{commandName}';

    type GeneralEvent =
        'canvasScroll'
        | 'undo'
        | 'redo'
        | 'load';

    interface Canvas {
        getConfig(): CanvasConfig | object;

        getElement(): HTMLElement;

        getFrameEl(): HTMLIFrameElement;

        getWindow(): Window;

        getDocument(): HTMLDocument;

        getBody(): HTMLBodyElement;

        getWrapperEl(): HTMLElement;

        setCustomBadgeLabel(f: () => any): void;

        hasFocus(): boolean;

        scrollTo(el: HTMLElement | object, opts?: boolean | GrapesScrollIntoViewOptions): void;
    }

    interface GrapesScrollIntoViewOptions extends ScrollIntoViewOptions {
        force?: boolean;
    }

    interface AssetManager {
        add(asset: string | object | string[] | object[], opts?: object): object;

        get(src: string): object;

        getAll(): object[];

        getAllVisible(): object[];

        remove(src: string): AssetManager;

        store(noStore: boolean): object;

        load(data?: object): object;

        getContainer(): HTMLElement;

        getAssetsEl(): HTMLElement;

        render(assets: object[]): HTMLElement;

        addType(id: string, definition: object): object;

        getType(id: string): object;

        getTypes(): object[];
    }


    interface BlockManager {
        getConfig(): BlockManagerConfig | object;

        onLoad(): void;

        add(id: string, opts: BlockOptions): void;

        get(id: string): object;

        getAll(): object[];

        getAllVisible(): object[];

        remove(id: string): object;

        getCategories(): object[];

        getContainer(): HTMLElement;

        render(): HTMLElement;
    }

    interface BlockOptions {
        label: string;
        content: string;
        category: string | object;
        attributes?: object;
    }

    interface SelectorManager {
        getConfig(): SelectorManagerConfig | object;

        add(name: string | string[], opts: SelectorOptions | object): Model | object[];

        addClass(classes: string[] | string): object[];

        get(name: Model | object[], type: string): Model | object[];

        getAll(): any;
    }

    interface SelectorOptions {
        label?: string;
        type?: string;
    }

    interface CssComposer {
        load(data: object): object;

        store(noStore: boolean): object;

        add(selectors: object[], state: string, width: string, opts: object): object;

        get(selectors: object[], state: string, width: string, ruleProps: object): object | null;

        getAll(): any;

        clear(): CssComposer;

        setRule(): object;

        getRule(): object;
    }

    interface Modal {
        open(opts?: ModalOptions): Modal;

        close(): Modal;

        isOpen(): boolean;

        setTitle(title: string): Modal;

        getTitle(): string;

        setContent(content: HTMLElement | string): Modal;

        getContent(): string;
    }

    interface ModalOptions {
        title?: HTMLElement | string;
        content?: HTMLElement | string;
    }

    /**
     * Configuration Interface
     */

    interface EditorConfig {
        stylePrefix?: string;
        components?: string;
        style?: string;
        fromElement?: boolean;
        noticeOnUnload?: boolean;
        showOffsets?: boolean;
        showOffsetsSelected?: boolean;
        forceClass?: boolean;
        height?: string | number;
        width?: string | number;
        log?: ('debug' | 'info' | 'warning' | 'error')[] | string[];
        baseCss?: string;
        protectedCss?: string;
        canvasCss?: string;
        defaultCommand?: string;
        showToolbar?: boolean;
        allowScripts?: boolean;
        showDevices?: boolean;
        devicePreviewMode?: boolean;
        mediaCondition?: string;
        tagVarStart?: string;
        tagVarEnd?: string;
        keepEmptyTextNodes?: boolean;
        jsInHtml?: boolean;
        nativeDnD?: boolean;
        multipleSelection?: boolean;
        exportWrapper?: boolean;
        wrappesIsBody?: boolean;
        avoidInlineStyle?: boolean;
        avoidDefaults?: boolean;
        clearStyles?: boolean;
        container?: HTMLElement | string;
        undoManager?: object;
        assetManager?: AssetManagerConfig | object;
        canvas?: CanvasConfig | object;
        layers?: object;
        storageManager?: StorageManagerConfig | object;
        rte?: RichtTextEditorConfig | object;
        domComponents?: DomComponentsConfig | object;
        modal?: ModalConfig | object;
        codeManager?: CodeManagerConfig | object;
        panels?: PanelsConfig | object;
        commands?: CommandsConfig | object;
        cssComposer?: CssComposerConfig | object;
        selectorManager?: SelectorManagerConfig | object;
        deviceManager?: DeviceManagerConfig | object;
        styleManager?: StyleManagerConfig | object;
        blockManager?: BlockManagerConfig | object;
        traitManager?: TraitManagerConfig | object;
        textViewCode?: string;
        keepUnusedStyles?: boolean;
        multiFrames?: boolean;
        plugins?: object[];
        pluginsOpts?: object;
    }

    interface AssetManagerConfig {
        assets?: object[];
        noAssets?: string;
        stylePrefix?: string;
        upload?: boolean;
        uploadName?: string;
        headers?: object;
        params?: object;
        credentials?: RequestCredentials;
        multiUpload?: boolean;
        autoAdd?: boolean;
        uploadText?: string;
        addBtnText?: string;
        customFetch?: () => any;
        uploadFile?: () => any;
        embedAsBase64?: boolean;
        handleAdd?: () => any;
        dropzone?: boolean;
        openAssetsOnDrop?: number;
        dropzoneContent?: string;
        modalTitle?: string;
        inputPlaceholder?: string;
    }

    interface CanvasConfig {
        stylePrefix?: string;
        scripts?: string[];
        styles?: string[];
        customBadgeLabel?: () => any;
        autoscrollLimit?: number;
        notTextable?: string[];
    }

    interface StyleManagerConfig {
        stylePrefix?: string;
        sectors?: object[];
        appendTo?: HTMLElement | string;
        textNoElement?: string;
        hideNotStylable?: boolean;
        highlightChanged?: boolean;
        highlightComputed?: boolean;
        showComputed?: boolean;
        clearProperties?: boolean;
        avoidComputed?: string[];
    }

    interface BlockManagerConfig {
        appendTo?: HTMLElement | string;
        blocks: object[];
    }

    interface RichtTextEditorConfig {
        stylePrefix?: string;
        adjustToolbar?: boolean;
        actions?: string[];
    }

    interface TraitManagerConfig {
        stylePrefix?: string;
        appendTo?: HTMLElement | string;
        labelContainer?: string;
        labelPlhText?: string;
        labelPlhRef?: string;
        optionsTarget?: object[];
        textNoElement?: string;
    }

    interface StorageManagerConfig {
        id?: string;
        autosave?: boolean;
        autoload?: boolean;
        type?: 'local' | 'remote';
        stepsBeforeSave?: number;
        storeComponents?: boolean;
        storeStyles?: boolean;
        storeHtml?: boolean;
        storeCss?: boolean;
        checkLocal?: boolean;
        params?: object;
        headers?: object;
        urlStore?: string;
        urlLoad?: string;
        contentTypeJson?: boolean;
        credentials?: RequestCredentials;

        beforeSend(jqXHR: any, settings: object): void;

        onComplete(jqXHR: any, status: any): void;
    }

    interface DomComponentsConfig {
        stylePrefix?: string;
        wrapperId?: string;
        wrapperName?: string;
        wrapper?: DomComponentsWrapperConfig;
        components?: object[];
        imageCompClass?: string;
        oAssetsOnCreate?: boolean;
        storeWrapper?: boolean;
        voidElements?: string[];
    }

    interface DomComponentsWrapperConfig {
        removable?: boolean;
        copyable?: boolean;
        draggable?: boolean;
        // TODO: Type custom blocks and components
        components?: object[];
        traits?: object[];
        stylable?: string[];
    }

    interface ModalConfig {
        stylePrefix?: string;
        title?: string;
        content?: string;
        backdrop?: boolean;
    }

    interface CodeManagerConfig {
        stylePrefix?: string;
        inlineCss?: boolean;
    }

    interface PanelsConfig {
        stylePrefix?: string;
        defaults?: object[];
        em?: object;
        delayBtnsShow?: number;
    }

    interface CommandsConfig {
        ESCAPE_KEY?: number;
        stylePrefix?: string;
        defaults?: object[];
        em?: object;
        firstCentered?: boolean;
        newFixedH?: boolean;
        minComponentH?: number;
        minComponentW?: number;
    }

    interface CssComposerConfig {
        stylePrefix?: string;
        staticRules?: string;
        rules?: string[];
    }

    interface SelectorManagerConfig {
        stylePrefix?: string;
        appendTo?: HTMLElement | string;
        selectors?: string[];
        label?: string;
        statesLabel?: string;
        selectedLabel?: string;
        states?: object[];
    }

    interface DeviceManagerConfig {
        devices?: object[];
        deviceLabel?: string;
    }

    interface LogOptions {
        ns?: string;
        level?: 'debug' | 'info' | 'warning' | 'error';
    }
}
