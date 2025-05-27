declare namespace tableau {
  enum FilterUpdateType {
    REPLACE = 'REPLACE',
    ADD = 'ADD',
    REMOVE = 'REMOVE'
  }

  class Viz {
    constructor(container: HTMLElement, url: string, options: VizOptions);
    dispose(): void;
    getWorkbook(): Workbook;
    setFrameSize(width: number, height: number): void;
  }

  interface VizOptions {
    hideTabs?: boolean;
    hideToolbar?: boolean;
    width?: number | string;
    height?: number | string;
    onFirstInteractive?: () => void;
  }

  interface Workbook {
    getActiveSheet(): Sheet;
  }

  interface Sheet {
    getSheetType(): 'worksheet' | 'dashboard' | 'story';
    getWorksheets(): Worksheet[];
  }

  interface Worksheet {
    applyFilterAsync(
      fieldName: string,
      values: string | string[],
      updateType: FilterUpdateType
    ): Promise<void>;
  }
}