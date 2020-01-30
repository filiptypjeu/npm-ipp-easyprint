declare module "ipp" {
  export class Printer {
    constructor(url: string, options?: IPrinterOptions);

    execute(operation: PrinterOpertaion, message?: IFullRequest, callback?: (error: Error, response: IFullResponse) => void): void;
    execute(operation: "Print-Job", message: IPrintJobRequest, callback?: (error: Error, response: IPrintJobResponse) => void): void;
    execute(operation: "Print-URI", message: IPrintURIRequest, callback?: (error: Error, response: IPrintJobResponse) => void): void;
    execute(operation: "Validate-Job", message: IValidateJobRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(operation: "Create-Job", message: ICreateJobRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(
      operation: "Get-Printer-Attributes",
      message: IGetPrinterAttributesRequest,
      callback?: (error: Error, response: IGetPrinterAttributesResponse) => void
    ): void;
    execute(operation: "Get-Jobs", message: IGetJobsRequest, callback?: (error: Error, response: IGetJobsResponse) => void): void;
    execute(operation: "Pause-Printer", message: ISimpleRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(operation: "Resume-Printer", message: ISimpleRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(operation: "Purge-Jobs", message: ISimpleRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(
      operation: "Send-Document",
      message: ISendDocumentRequest,
      callback?: (error: Error, response: ISendDocumentResponse) => void
    ): void;
    execute(operation: "Send-URI", message: ISendURIRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(operation: "Cancel-Job", message: ICancelReleaseJobRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(
      operation: "Release-Job",
      message: ICancelReleaseJobRequest,
      callback?: (error: Error, response: ISimpleResponse) => void
    ): void;
    execute(
      operation: "Get-Job-Attributes",
      message: IGetJobAttributesRequest,
      callback?: (error: Error, response: IGetJobAttributesResponse) => void
    ): void;
    execute(operation: "Hold-Job", message: IHoldRestartJobRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
    execute(operation: "Restart-Job", message: IHoldRestartJobRequest, callback?: (error: Error, response: ISimpleResponse) => void): void;
  }

  export interface IPrinterOptions {
    version?: IPPVersion;
    uri?: string;
    charset?: string;
    language?: string;
  }

  interface IFullRequest {
    "operation-attributes-tag"?: IOperationAttributes;
    "job-attributes-tag"?: IJobTemplateAttributes;
    data: Buffer;
  }

  interface IFullResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": IOperationAttributes;
    "unsupported-attributes"?: string[];
    "job-attributes-tag"?: any;
    "printer-attributes-tag"?: IPrinterDescription;
  }

  interface ISimpleRequest {
    "operation-attributes-tag": {
      "requesting-user-name": string;
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
    };
  }

  interface ISimpleResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
  }

  // PRINT-JOB

  interface IPrintJobRequest {
    "operation-attributes-tag": {
      "requesting-user-name": string;
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      compression?: Compression;
      "document-format"?: MimeMediaType;
      "document-name"?: string;
      "document-natural-language"?: string;
      "ipp-attribute-fidelity"?: boolean;
      "job-impressions"?: number;
      "job-k-octets"?: number;
      "job-media-sheets"?: number;
      "job-name"?: string;
      "printer-uri"?: string;
    };
    "job-attributes-tag"?: IJobTemplateAttributes;
    data: Buffer;
  }

  interface IPrintJobResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
    "job-attributes-tag": {
      "job-id": number;
      "job-state": JobState;
      "job-state-reasons": JobStateReasons[];
      "job-uri": string;
      "job-state-message"?: string;
      "number-of-intervening-jobs"?: number;
    };
  }

  // PRINT-URI
  // Same response as PRINT-JOB

  interface IPrintURIRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "requesting-user-name": string;
      "attributes-natural-language"?: string;
      "document-format"?: MimeMediaType;
      "printer-uri"?: string;
      "job-name"?: string;
      "ipp-attribute-fidelity"?: boolean;
      "document-name"?: string;
      "document-natural-language"?: string;
      compression?: Compression;
      "job-k-octets"?: number;
      "job-impressions"?: number;
      "job-media-sheets"?: number;
      "document-uri": string;
    };
    "job-attributes-tag"?: IJobTemplateAttributes;
  }

  // VALIDATE-JOB

  interface IValidateJobRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "requesting-user-name": string;
      "attributes-natural-language"?: string;
      "document-format"?: MimeMediaType;
      "printer-uri"?: string;
      "job-name"?: string;
      "ipp-attribute-fidelity"?: boolean;
      "document-name"?: string;
      "document-natural-language"?: string;
      compression?: Compression;
      "job-k-octets"?: number;
      "job-impressions"?: number;
      "job-media-sheets"?: number;
    };
    "job-attributes-tag"?: IJobTemplateAttributes;
  }

  // CREATE-JOB

  interface ICreateJobRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "requesting-user-name": string;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-name"?: string;
      "ipp-attribute-fidelity"?: boolean;
      "job-k-octets"?: number;
      "job-impressions"?: number;
      "job-media-sheets"?: number;
    };
    "job-attributes-tag"?: IJobTemplateAttributes;
  }

  // GET-PRINTER-ATTRIBUTES

  interface IGetPrinterAttributesRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "requesting-user-name": string;
      "attributes-natural-language"?: string;
      "document-format"?: MimeMediaType;
      "requested-attributes"?: (RequestedPrinterAttributeGroups | keyof IPrinterDescription)[];
      "printer-uri"?: string;
    };
  }

  interface IGetPrinterAttributesResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
    "printer-attributes-tag": any;
  }

  // GET-JOBS

  interface IGetJobsRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "requesting-user-name": string;
      limit?: number;
      "requested-attributes"?: (RequestedJobAttributeGroups | keyof IJobTemplateAttributes | keyof IJobStatusAttributes)[];
      "which-jobs"?: WhichJobs;
      "my-jobs"?: boolean;
      "printer-uri"?: string;
    };
  }

  interface IGetJobsResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
    "job-attributes-tag"?: IJobTemplateAttributes | IJobTemplateAttributes[];
  }

  // SEND-DOCUMENT

  interface ISendDocumentRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-id"?: number;
      "job-uri"?: string;
      "requesting-user-name": string;
      "document-name"?: string;
      compression?: Compression;
      "document-format"?: MimeMediaType;
      "document-natural-language"?: string;
      "last-document": boolean;
    };
    data?: Buffer;
  }

  interface ISendDocumentResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
    "job-attributes-tag": {
      "job-id": number;
      "job-uri": string;
      "job-state": JobState;
      "job-state-reasons": JobStateReasons[];
      "job-state-message"?: string;
      "number-of-intervening-jobs"?: number;
    };
  }

  // SEND-URI

  interface ISendURIRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-id"?: number;
      "job-uri"?: string;
      "requesting-user-name": string;
      "document-name"?: string;
      compression?: Compression;
      "document-format"?: MimeMediaType;
      "document-natural-language"?: string;
      "last-document": boolean;
      "document-uri": string;
    };
  }

  // CANCEL-/RELEASE-JOB

  interface ICancelReleaseJobRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-id"?: number;
      "job-uri"?: string;
      "requesting-user-name": string;
      message?: string;
    };
  }

  // GET-JOB-ATTRIBUTES

  interface IGetJobAttributesRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-id"?: number;
      "job-uri"?: string;
      "requested-attributes"?: (RequestedJobAttributeGroups | keyof IJobTemplateAttributes | keyof IJobStatusAttributes)[];
    };
  }

  interface IGetJobAttributesResponse {
    version: IPPVersion;
    statusCode: StatusCode;
    id: number;
    "operation-attributes-tag": {
      "attributes-charset": CharacterSet;
      "attributes-natural-language": string;
      "detailed-status-message"?: string;
      "status-message"?: string;
    };
    "unsupported-attributes"?: string[];
    "job-attributes-tag": IJobTemplateAttributes;
  }

  // HOLD-/RESTARTJOB

  interface IHoldRestartJobRequest {
    "operation-attributes-tag": {
      "attributes-charset"?: CharacterSet;
      "attributes-natural-language"?: string;
      "printer-uri"?: string;
      "job-id"?: number;
      "job-uri"?: string;
      "requesting-user-name": string;
      message?: string;
      "job-hold-until"?: JobHoldUntil;
    };
  }

  interface IOperationAttributes {
    "attributes-charset"?: string;
    "attributes-natural-language"?: string;
    "charge-info-message"?: string;
    compression?: Compression;
    "compression-accepted"?: Compression[];
    "destination-accesses"?: IDestionationAccesses[];
    "detailed-status-message"?: string;
    "document-access"?: IDocumentAccess;
    "document-access-error"?: string;
    "document-charset"?: string;
    "document-data-get-interval"?: number;
    "document-data-wait"?: boolean;
    "document-digital-signature"?: DocumentDigitalSignature;
    "document-format"?: MimeMediaType;
    "document-format-accepted"?: MimeMediaType[];
    "document-format-details"?: IDocumentFormatDetails;
    "document-message"?: string;
    "document-metadata"?: string[];
    "document-name"?: string;
    "document-natural-language"?: string;
    "document-number"?: number;
    "document-password"?: string;
    "document-preprocessed"?: boolean;
    "fetch-status-code"?: StatusCode; // Except "successful-ok"
    "fetch-status-message"?: string;
    "first-index"?: number;
    "identify-actions"?: IdentifyActions[];
    "input-attributes"?: IInputAttributes;
    "ipp-attribute-fidelity"?: boolean;
    "job-authorization-uri"?: string;
    "job-hold-until"?: JobHoldUntil;
    "job-hold-until-time"?: string;
    "job-id"?: number;
    "job-ids"?: number[];
    "job-impressions"?: number;
    "job-impressions-col"?: IImpressions;
    "job-impressions-estimated"?: number;
    "job-k-octets"?: number;
    "job-mandatory-attributes"?: (keyof IJobTemplateAttributes)[];
    "job-media-sheets"?: number;
    "job-media-sheets-col"?: IMediaSheets;
    "job-message-from-operator"?: string;
    "job-name"?: string;
    "job-pages"?: number;
    "job-pages-col"?: IPages;
    "job-password"?: string;
    "job-password-encryption"?: JobPasswordEncryption;
    "job-state"?: JobState;
    "job-state-message"?: string;
    "job-state-reasons"?: JobStateReasons[];
    "job-uri"?: string;
    "last-document"?: boolean;
    limit?: number;
    message?: string;
    "my-jobs"?: boolean;
    "notify-get-interval"?: number;
    "notify-printer-ids"?: number[];
    "notify-resource-id"?: number;
    "notify-sequence-numbers"?: number[];
    "notify-subscription-ids"?: number[];
    "notify-wait"?: boolean;
    "original-requesting-user-name"?: string;
    "output-attributes"?: IOutputAttributes;
    "output-device-job-states"?: string[];
    "output-device-uuid"?: string;
    "preferred-attributes"?: any;
    "printer-geo-location"?: string;
    "printer-id"?: number;
    "printer-ids"?: number[];
    "printer-location"?: string;
    "printer-message-from-operator"?: string;
    "printer-service-type"?: PrinterServiceType[];
    "printer-up-time"?: number;
    "printer-uri"?: string;
    "printer-xri-requested"?: IPrinterXri[];
    "profile-uri-actual"?: string;
    "requested-attributes"?: (
      | RequestedJobAttributeGroups
      | RequestedPrinterAttributeGroups
      | keyof IJobTemplateAttributes
      | keyof IJobStatusAttributes
      | keyof IPrinterDescription
    )[];
    "requesting-user-name"?: string;
    "requesting-user-uri"?: string;
    "resource-format"?: MimeMediaType;
    "resource-format-accepted"?: MimeMediaType[];
    "resource-formats"?: MimeMediaType[];
    "resource-id"?: number;
    "resource-ids"?: number[];
    "resource-k-octets"?: number;
    "resource-natural-language"?: string;
    "resource-patches"?: string;
    "resource-signature"?: string[];
    "resource-states"?: ResourceState[];
    "resource-string-version"?: string;
    "resource-type"?: ResourceType;
    "resource-types"?: ResourceType[];
    "resource-version"?: string;
    "restart-get-interval"?: number;
    "status-message"?: string;
    "system-uri"?: string;
    "which-jobs"?: WhichJobs;
    "which-printers"?: string;
  }

  interface IJobDescriptionAttributes {
    "current-page-order"?: PageOrder;
    "document-metadata"?: string[];
    "job-charge-info"?: string;
    "job-mandatory-attributes"?: (keyof IJobTemplateAttributes)[];
    "job-message-from-operator"?: string;
    "job-message-to-operator-actual"?: string[];
    "job-name"?: string;
    "job-save-printer-make-and-model"?: string;
  }

  interface IJobTemplateAttributes {
    "chamber-humidity"?: number;
    "chamber-temperature"?: number;
    "confirmation-sheet-print"?: boolean;
    copies?: number;
    "cover-back"?: ICover;
    "cover-front"?: ICover;
    "cover-sheet-info"?: ICoverSheetInfo;
    "destination-uris"?: IDestinationUris[];
    finishings?: Finishings[];
    "finishings-col"?: IFinishings[];
    "font-name-requested"?: string;
    "font-size-requested"?: number;
    "force-front-side"?: number[];
    "imposition-template"?: ImpositionTemplate;
    "insert-sheet"?: IInsertSheet[];
    "job-account-id"?: string;
    "job-account-type"?: JobAccountType;
    "job-accounting-sheets"?: IJobAccontingSheets;
    "job-accounting-user-id"?: string;
    "job-cancel-after"?: number;
    "job-copies"?: number;
    "job-cover-back"?: ICover;
    "job-cover-front"?: ICover;
    "job-delay-output-until"?: JobDelayOutputUntil;
    "job-delay-output-until-time"?: string;
    "job-error-action"?: JobErrorAction;
    "job-error-sheet"?: IJobErrorSheet;
    "job-finishings"?: Finishings[];
    "job-finishings-col"?: IFinishings;
    "job-hold-until"?: JobHoldUntil;
    "job-hold-until-time"?: string;
    "job-message-to-operator"?: string;
    "job-pages-per-set"?: number;
    "job-phone-number"?: string;
    "job-priority"?: number;
    "job-recipient-name"?: string;
    "job-retain-until"?: JobRetainUntil;
    "job-retain-until-interval"?: number;
    "job-retain-until-time"?: string;
    "job-save-disposition"?: IJobSaveDisposition;
    "job-sheet-message"?: string;
    "job-sheets"?: JobSheets;
    "job-sheets-col"?: IJobSheets;
    "materials-col"?: IMaterials[];
    media?: Media;
    "media-col"?: IMedia;
    "media-input-tray-check"?: MediaIntputTray;
    "multiple-document-handling"?: MultipleDocumentHandling;
    "multiple-object-handling"?: MultipleObjectHandling;
    "number-of-retries"?: number;
    "number-up"?: number;
    "orientation-requested"?: OrientationRequested;
    "output-bin"?: OutputBin;
    "output-device"?: string;
    overrides?: Overrides[];
    "page-delivery"?: PageDelivery;
    "page-order-received"?: PageOrder;
    "page-ranges"?: string;
    "pages-per-subset"?: number[];
    "pclm-source-resolution"?: Resolution;
    "pdl-init-file"?: IPdlInitFile;
    "platform-temperature"?: number;
    "presentation-direction-number-up"?: PresentationDirectionNumberUp;
    "print-accuracy"?: IPrintAccuracy;
    "print-base"?: PrintBase;
    "print-color-mode"?: PrintColorMode;
    "print-content-optimize"?: PrintContentOptimize;
    "print-objects"?: IPrintObjects[];
    "print-quality"?: PrintQuality;
    "print-rendering-intent"?: PrintRenderingIntent;
    "print-scaling"?: PrintScaling;
    "print-supports"?: PrintSupports;
    "printer-resolution"?: Resolution;
    "proof-print"?: IProofPrint;
    "retry-interval"?: number;
    "retry-time-out"?: number;
    "separator-sheets"?: ISeparatorSheets;
    sides?: Sides;
    "x-image-position"?: XImagePosition;
    "x-image-shift"?: number;
    "x-side1-image-shift"?: number;
    "x-side2-image-shift"?: number;
    "y-image-position"?: YImagePosition;
    "y-image-shift"?: number;
    "y-side1-image-shift"?: number;
    "y-side2-image-shift"?: number;
  }

  interface IJobStatusAttributes {
    "attributes-charset"?: string;
    "attributes-natural-language"?: string;
    "chamber-humidity-actual"?: number[];
    "chamber-temperature-actual"?: number[];
    "compression-supplied"?: Compression;
    "copies-actual"?: number[];
    "cover-back-actual"?: ICover[];
    "cover-front-actual"?: ICover[];
    "date-time-at-completed"?: string;
    "date-time-at-creation"?: string;
    "date-time-at-processing"?: string;
    "destination-statuses"?: IDestinationStatuses[];
    "document-charset-supplied"?: string;
    "document-digital-signature-supplied"?: DocumentDigitalSignature;
    "document-format-details-supplied"?: IDocumentFormatDetails;
    "document-format-ready"?: MimeMediaType[];
    "document-format-supplied"?: MimeMediaType;
    "document-format-version-supplied"?: string;
    "document-message-supplied"?: string;
    "document-name-supplied"?: string;
    "document-natural-language-supplied"?: string;
    "errors-count"?: number;
    "finishings-actual"?: Finishings[];
    "finishings-col-actual"?: IFinishings[];
    "force-front-side-actual"?: number[][];
    "imposition-template-actual"?: ImpositionTemplate[];
    "input-attributes-actual"?: IInputAttributes;
    "insert-sheet-actual"?: IInsertSheet[];
    "job-account-id-actual"?: string[];
    "job-account-type-actual"?: JobAccountType;
    "job-accounting-sheets-actual"?: IJobAccontingSheets[];
    "job-accounting-user-id-actual"?: string[];
    "job-attribute-fidelity"?: boolean;
    "job-detailed-status-messages"?: string[];
    "job-document-access-errors"?: string[];
    "job-error-sheet-actual"?: IJobErrorSheet[];
    "job-hold-until-actual"?: JobHoldUntil[];
    "job-id"?: number;
    "job-impressions"?: number;
    "job-impressions-col"?: IImpressions;
    "job-impressions-completed"?: number;
    "job-impressions-completed-col"?: IImpressions;
    "job-k-octets"?: number;
    "job-k-octets-processed"?: number;
    "job-media-sheets"?: number;
    "job-media-sheets-col"?: IMediaSheets;
    "job-media-sheets-completed"?: number;
    "job-media-sheets-completed-col"?: IImpressions;
    "job-more-info"?: string;
    "job-originating-user-name"?: string;
    "job-originating-user-uri"?: string;
    "job-pages"?: number;
    "job-pages-col"?: IPages;
    "job-pages-completed"?: number;
    "job-pages-completed-col"?: IPages;
    "job-pages-completed-current-copy"?: number;
    "job-printer-up-time"?: number;
    "job-printer-uri"?: string;
    "job-priority-actual"?: number[];
    "job-resource-ids"?: number[];
    "job-sheet-message-actual"?: number[];
    "job-sheets-actual"?: JobSheets[];
    "job-sheets-col-actual"?: IJobSheets[];
    "job-state"?: JobState;
    "job-state-message"?: string;
    "job-state-reasons"?: JobStateReasons[];
    "job-uri"?: string;
    "job-uuid"?: string;
    "materials-col-actual"?: IMaterials[];
    "media-actual"?: string[];
    "media-col-actual"?: IMedia[];
    "media-input-tray-check-actual"?: string[];
    "multiple-document-handling-actual"?: MultipleDocumentHandling[];
    "multiple-object-handling-actual"?: MultipleObjectHandling;
    "number-of-documents"?: number;
    "number-of-intervening-jobs"?: number;
    "number-up-actual"?: number[];
    "orientation-requested-actual"?: OrientationRequested[];
    "original-requesting-user-name"?: string;
    "output-attributes-actual"?: IOutputAttributes;
    "output-bin-actual"?: OutputBin[];
    "output-device-actual"?: string[];
    "output-device-assigned"?: string;
    "output-device-job-state"?: JobState;
    "output-device-job-state-message"?: string;
    "output-device-job-state-reasons"?: JobStateReasons[];
    "output-device-uuid-assigned"?: string;
    "overrides-actual"?: Overrides[];
    "page-delivery-actual"?: PageDelivery[];
    "page-order-received-actual"?: PageOrder[];
    "page-ranges-actual"?: number[];
    "platform-temperature-actual"?: number[];
    "presentation-direction-number-up-actual"?: PresentationDirectionNumberUp[];
    "print-accuracy-actual"?: IPrintAccuracy;
    "print-base-actual"?: PrintBase[];
    "print-color-mode-actual"?: PrintColorMode[];
    "print-content-optimize-actual"?: PrintContentOptimize[];
    "print-objects-actual"?: IPrintObjects[];
    "print-quality-actual"?: PrintQuality[];
    "print-rendering-intent-actual"?: PrintRenderingIntent[];
    "print-supports-actual"?: PrintSupports[];
    "printer-resolution-actual"?: Resolution[];
    "separator-sheets-actual"?: ISeparatorSheets[];
    "sheet-collate-actual"?: ("collated" | "uncollated")[];
    "sides-actual"?: Sides[];
    "time-at-completed"?: number;
    "time-at-creation"?: number;
    "time-at-processing"?: number;
    "warnings-count"?: number;
    "x-image-position-actual"?: XImagePosition[];
    "x-image-shift-actual"?: number[];
    "x-side1-image-shift-actual"?: number[];
    "x-side2-image-shift-actual"?: number[];
    "y-image-position-actual"?: YImagePosition[];
    "y-image-shift-actual"?: number[];
    "y-side1-image-shift-actual"?: number[];
    "y-side2-image-shift-actual"?: number[];
  }

  interface IPrinterDescription {
    "accuracy-units-supported"?: AccuracyUnits[];
    "baling-type-supported"?: BalingType[];
    "baling-when-supported"?: BalingWhen[];
    "binding-reference-edge-supported"?: ReferenceEdge[];
    "binding-type-supported"?: BindingType[];
    "chamber-humidity-default"?: number;
    "chamber-humidity-supported"?: boolean;
    "chamber-temperature-default"?: number;
    "chamber-temperature-supported"?: (number | string)[];
    "charset-configured"?: string;
    "charset-supported"?: string[];
    "coating-sides-supported"?: FinishingSides[];
    "coating-type-supported"?: CoatingType[];
    "color-supported"?: boolean;
    "compression-supported"?: Compression[];
    "confirmation-sheet-print-default"?: boolean;
    "copies-default"?: number;
    "copies-supported"?: string;
    "cover-back-default"?: ICover;
    "cover-back-supported"?: string[];
    "cover-front-default"?: ICover;
    "cover-front-supported"?: string[];
    "cover-sheet-info-default"?: ICoverSheetInfo;
    "cover-sheet-info-supported"?: string[];
    "covering-name-supported"?: string[];
    "destination-accesses-supported"?: string[];
    "destination-uri-ready"?: IDestinationUriReady[];
    "destination-uri-schemes-supported"?: UriSchemes[];
    "destination-uris-supported"?: string[];
    "document-access-supported"?: string[];
    "document-charset-default"?: string;
    "document-charset-supported"?: string[];
    "document-creation-attributes-supported"?: string[];
    "document-digital-signature-default"?: DocumentDigitalSignature;
    "document-digital-signature-supported"?: DocumentDigitalSignature[];
    "document-format-default"?: MimeMediaType;
    "document-format-details-default"?: IDocumentFormatDetails;
    "document-format-details-supported"?: string[];
    "document-format-supported"?: MimeMediaType[];
    "document-format-version-default"?: string;
    "document-format-version-supported"?: string[];
    "document-natural-language-default"?: string;
    "document-natural-language-supported"?: string[];
    "document-password-supported"?: number;
    "document-privacy-attributes"?: string[];
    "document-privacy-scope"?: "all" | "default" | "none" | "owner";
    "feed-orientation-default"?: FeedOrientation;
    "feed-orientation-supported"?: FeedOrientation[];
    "fetch-document-attributes-supported"?: string[];
    "finishing-template-supported"?: Finishings[];
    "finishings-col-database"?: IFinishings[];
    "finishings-col-default"?: IFinishings;
    "finishings-col-ready"?: IFinishings[];
    "finishings-col-supported"?: (keyof IFinishings)[];
    "finishings-default"?: Finishings[];
    "finishings-ready"?: Finishings[];
    "finishings-supported"?: Finishings[];
    "folding-direction-supported"?: FoldingDirection[];
    "folding-offset-supported"?: (number | string)[];
    "folding-reference-edge-supported"?: ReferenceEdge[];
    "font-name-requested-default"?: string;
    "font-name-requested-supported"?: string[];
    "font-size-requested-default"?: number;
    "font-size-requested-supported"?: string[];
    "from-name-supported"?: number;
    "generated-natural-language-supported"?: string[];
    "identify-actions-default"?: IdentifyActions[];
    "identify-actions-supported"?: IdentifyActions[];
    "imposition-template-default"?: ImpositionTemplate;
    "imposition-template-supported"?: ImpositionTemplate[];
    "input-attributes-default"?: IInputAttributes;
    "input-attributes-supported"?: string[];
    "input-color-mode-supported"?: InputColorMode[];
    "input-content-type-supported"?: InputContentType[];
    "input-film-scan-mode-supported"?: InputFilmScanMode[];
    "input-media-supported"?: (MediaName | MediaSizeName)[];
    "input-orientation-requested-supported"?: OrientationRequested[];
    "input-quality-supported"?: PrintQuality[];
    "input-resolution-supported"?: Resolution[];
    "input-scan-regions-supported"?: IInputScanRegion;
    "input-sides-supported"?: Sides[];
    "input-source-supported"?: InputSource[];
    "insert-after-page-number-supported"?: string;
    "insert-count-supported"?: string;
    "insert-sheet-default"?: IInsertSheet[];
    "insert-sheet-supported"?: (keyof IInsertSheet)[];
    "ipp-features-supported"?: (
      | "document-object"
      | "faxout"
      | "icc-color-matching"
      | "infrastructure-printer"
      | "ipp-3d"
      | "ipp-everywhere"
      | "job-save"
      | "none"
      | "page-overrides"
      | "proof-print"
      | "resource-object"
      | "scan"
      | "subscription-object"
      | "system-object"
    )[];
    "ipp-versions-supported"?: IPPVersion[];
    "ippget-event-life"?: number;
    "job-account-id-default"?: string;
    "job-account-id-supported"?: boolean;
    "job-account-type-default"?: JobAccountType;
    "job-account-type-supported"?: JobAccountType[];
    "job-accounting-sheets-default"?: IJobAccontingSheets;
    "job-accounting-sheets-supported"?: string[];
    "job-accounting-user-id-default"?: string;
    "job-accounting-user-id-supported"?: boolean;
    "job-authorization-uri-supported"?: boolean;
    "job-cancel-after-default"?: number;
    "job-cancel-after-supported"?: string;
    "job-constraints-supported"?: IJobConstraintsSupported[];
    "job-creation-attributes-supported"?: (keyof IJobTemplateAttributes)[];
    "job-delay-output-until-default"?: JobDelayOutputUntil;
    "job-delay-output-until-interval-supported"?: string;
    "job-delay-output-until-supported"?: JobDelayOutputUntil[];
    "job-delay-output-until-time-supported"?: string;
    "job-destination-spooling-supported"?: string;
    "job-error-action-default"?: JobErrorAction;
    "job-error-action-supported"?: JobErrorAction[];
    "job-error-sheet-default"?: IJobErrorSheet;
    "job-error-sheet-supported"?: string[];
    "job-history-attributes-configured"?: string[];
    "job-history-attributes-supported"?: string[];
    "job-history-interval-configured"?: number;
    "job-history-interval-supported"?: string;
    "job-hold-until-default"?: JobHoldUntil;
    "job-hold-until-supported"?: JobHoldUntil[];
    "job-hold-until-time-supported"?: string;
    "job-ids-supported"?: boolean;
    "job-impressions-supported"?: string;
    "job-k-octets-supported"?: string;
    "job-mandatory-attributes-supported"?: boolean;
    "job-media-sheets-supported"?: string;
    "job-message-to-operator-default"?: string;
    "job-message-to-operator-supported"?: boolean;
    "job-pages-per-set-supported"?: boolean;
    "job-password-encryption-supported"?: JobPasswordEncryption[];
    "job-password-length-supported"?: string;
    "job-password-repertoire-configured"?: JobPasswordRepertoire;
    "job-password-repertoire-supported"?: JobPasswordRepertoire[];
    "job-password-supported"?: number;
    "job-phone-number-default"?: string;
    "job-phone-number-supported"?: boolean;
    "job-presets-supported"?: IJobPresetsSupported[];
    "job-priority-default"?: number;
    "job-priority-supported"?: number;
    "job-privacy-attributes"?: string[];
    "job-privacy-scope"?: "all" | "default" | "none" | "owner";
    "job-recipient-name-default"?: string;
    "job-recipient-name-supported"?: boolean;
    "job-resolvers-supported"?: IJobResolversSupported[];
    "job-retain-until-default"?: JobRetainUntil;
    "job-retain-until-interval-supported"?: string;
    "job-retain-until-supported"?: JobRetainUntil[];
    "job-retain-until-time-supported"?: string;
    "job-sheet-message-default"?: string;
    "job-sheet-message-supported"?: boolean;
    "job-sheets-col-default"?: IJobSheets;
    "job-sheets-col-supported"?: string[];
    "job-sheets-default"?: JobSheets;
    "job-sheets-supported"?: JobSheets[];
    "job-spooling-supported"?: "automatic" | "spool" | "stream";
    "job-triggers-supported"?: IJobTriggersSupported;
    "jpeg-features-supported"?: ("arithmetic" | "cmyk" | "deep" | "hierarchical" | "icc" | "lossless" | "none" | "progressive")[];
    "jpeg-k-octets-supported"?: string;
    "jpeg-x-dimension-supported"?: string;
    "jpeg-y-dimension-supported"?: string;
    "laminating-sides-supported"?: FinishingSides[];
    "laminating-type-supported"?: LaminatingType[];
    "logo-uri-formats-supported"?: MimeMediaType[];
    "logo-uri-schemes-supported"?: UriSchemes[];
    "material-amount-units-supported"?: MaterialAmountUnits[];
    "material-diameter-supported"?: (number | string)[];
    "material-nozzle-diameter-supported"?: (number | string)[];
    "material-purpose-supported"?: MaterialPurpose[];
    "material-rate-supported"?: (number | string)[];
    "material-rate-units-supported"?: MaterialRateUnits[];
    "material-shell-thickness-supported"?: (number | string)[];
    "material-temperature-supported"?: (number | string)[];
    "material-type-supported"?: MaterialType[];
    "materials-col-database"?: IMaterials[];
    "materials-col-default"?: IMaterials[];
    "materials-col-ready"?: IMaterials[];
    "materials-col-supported"?: (keyof IMaterials)[];
    "max-materials-col-supported"?: number;
    "max-page-ranges-supported"?: number;
    "max-save-info-supported"?: number;
    "max-stitching-locations-supported"?: number;
    "media-back-coating-supported"?: MediaCoating[];
    "media-bottom-margin-supported"?: number[];
    "media-col-database"?: IMedia[];
    // "media-col-database media-source-properties collection;
    // "media-col-database media-source-properties media-source-feed-direction"?: string;
    // "media-col-database media-source-properties media-source-feed-orientation"?: string;
    "media-col-default"?: IMedia;
    "media-col-ready"?: IMedia[];
    // "media-col-ready media-source-properties collection;
    // "media-col-ready media-source-properties media-source-feed-direction"?: string;
    // "media-col-ready media-source-properties media-source-feed-orientation"?: string;
    "media-col-supported"?: MediaColSupported[];
    "media-color-supported"?: MediaColor[];
    "media-default"?: Media;
    "media-front-coating-supported"?: MediaCoating[];
    "media-grain-supported"?: MediaGrain[];
    "media-hole-count-supported"?: string[];
    "media-key-supported"?: (MediaSizeName | MediaName)[];
    "media-left-margin-supported"?: number[];
    "media-order-count-supported"?: string[];
    "media-pre-printed-supported"?: MediaPrePrinted[];
    "media-ready"?: (MediaSizeName | MediaName)[];
    "media-recycled-supported"?: MediaPrePrinted[];
    "media-right-margin-supported"?: number[];
    "media-size-supported"?: IMediaSizeSupported;
    "media-source-supported"?: MediaSource[];
    "media-supported"?: Media[];
    "media-thickness-supported"?: string;
    "media-tooth-supported"?: MediaTooth[];
    "media-top-margin-supported"?: number[];
    "media-type-supported"?: MediaType[];
    "media-weight-metric-supported"?: string[];
    "message-supported"?: number;
    "multiple-destination-uris-supported"?: boolean;
    "multiple-document-handling-default"?: MultipleDocumentHandling;
    "multiple-document-handling-supported"?: MultipleDocumentHandling[];
    "multiple-document-jobs-supported"?: boolean;
    "multiple-object-handling-default"?: MultipleObjectHandling;
    "multiple-object-handling-supported"?: MultipleObjectHandling[];
    "multiple-operation-time-out"?: number;
    "multiple-operation-time-out-action"?: "abort-job" | "hold-job" | "process-job";
    "natural-language-configured"?: string;
    "notify-attributes-supported"?: string[];
    "notify-events-default"?: NotifyEvents[];
    "notify-events-supported"?: NotifyEvents[];
    "notify-lease-duration-default"?: number;
    "notify-lease-duration-supported"?: (number | string)[];
    "notify-pull-method-supported"?: "ippget"[];
    "notify-schemes-supported"?: UriSchemes[];
    "number-of-retries-default"?: number;
    "number-of-retries-supported"?: string;
    "number-up-default"?: number;
    "number-up-supported"?: number | string;
    "oauth-authorization-scope"?: string[];
    "oauth-authorization-server-uri"?: string;
    "operations-supported"?: string[];
    "organization-name-supported"?: number;
    "orientation-requested-default"?: OrientationRequested;
    "orientation-requested-supported"?: OrientationRequested[];
    "output-attributes-default"?: IOutputAttributes;
    "output-attributes-supported"?: string[];
    "output-bin-default"?: OutputBin;
    "output-bin-supported"?: OutputBin[];
    "output-device-supported"?: string[];
    "output-device-uuid-supported"?: string[];
    "overrides-supported"?: Overrides[];
    "page-delivery-default"?: PageDelivery;
    "page-delivery-supported"?: PageDelivery[];
    "page-order-received-default"?: PageOrder;
    "page-order-received-supported"?: PageOrder[];
    "page-ranges-supported"?: boolean;
    "pages-per-subset-supported"?: boolean;
    "parent-printers-supported"?: string[];
    "pclm-raster-back-side"?: "flipped" | "normal" | "rotated";
    "pclm-source-resolution-supported"?: Resolution[];
    "pclm-strip-height-preferred"?: number[];
    "pclm-strip-height-supported"?: number;
    "pdf-features-supported"?: ("prc" | "u3d")[];
    "pdf-k-octets-supported"?: string;
    "pdf-versions-supported"?: (
      | "adobe-1.3"
      | "adobe-1.4"
      | "adobe-1.5"
      | "adobe-1.6"
      | "iso-15930-1_2001"
      | "iso-15930-3_2002"
      | "iso-15930-4_2003"
      | "iso-15930-6_2003"
      | "iso-15930-7_2010"
      | "iso-15930-8_2010"
      | "iso-16612-2_2010"
      | "iso-19005-1_2005"
      | "iso-19005-2_2011"
      | "iso-19005-3_2012"
      | "iso-32000-1_2008"
      | "none"
      | "pwg-5102.3"
    )[];
    "pdl-init-file-default"?: IPdlInitFile;
    "pdl-init-file-entry-supported"?: string[];
    "pdl-init-file-location-supported"?: string[];
    "pdl-init-file-name-subdirectory-supported"?: boolean;
    "pdl-init-file-name-supported"?: string[];
    "pdl-init-file-supported"?: ("pdl-init-file-entry" | "pdl-init-file-location" | "pdl-init-file-name")[];
    "pdl-override-guaranteed-supported"?: string[];
    "pdl-override-supported"?: "attempted" | "guaranteed" | "not-attempted";
    "platform-shape"?: string;
    "platform-temperature-default"?: number;
    "platform-temperature-supported"?: (number | string)[];
    "preferred-attributes-supported"?: boolean;
    "presentation-direction-number-up-default"?: PresentationDirectionNumberUp;
    "presentation-direction-number-up-supported"?: PresentationDirectionNumberUp[];
    "print-accuracy-supported"?: IPrintAccuracySupported;
    "print-base-default"?: PrintBase;
    "print-base-supported"?: PrintBase[];
    "print-color-mode-default"?: PrintColorMode;
    "print-color-mode-supported"?: PrintColorMode[];
    "print-content-optimize-default"?: PrintContentOptimize;
    "print-content-optimize-supported"?: PrintContentOptimize[];
    "print-objects-supported"?: (keyof IPrintObjects)[];
    "print-quality-default"?: PrintQuality;
    "print-quality-supported"?: PrintQuality[];
    "print-rendering-intent-default"?: PrintRenderingIntent;
    "print-rendering-intent-supported"?: PrintRenderingIntent[];
    "print-scaling-default"?: PrintScaling;
    "print-scaling-supported"?: PrintScaling[];
    "print-supports-default"?: PrintSupports;
    "print-supports-supported"?: PrintSupports[];
    "printer-camera-image-uri"?: string[];
    "printer-charge-info"?: string;
    "printer-charge-info-uri"?: string;
    "printer-contact-col"?: IPrinterContact;
    "printer-current-time"?: string;
    "printer-device-id"?: string;
    "printer-dns-sd-name"?: string;
    "printer-driver-installer"?: string;
    "printer-fax-log-uri"?: string;
    "printer-fax-modem-info"?: string[];
    "printer-fax-modem-name"?: string[];
    "printer-fax-modem-number"?: string[];
    "printer-geo-location"?: string;
    "printer-get-attributes-supported"?: (keyof IJobTemplateAttributes | keyof IJobStatusAttributes)[];
    "printer-icc-profiles"?: IPrinterIccProfiles[];
    "printer-icons"?: string[];
    "printer-info"?: string;
    "printer-kind"?: PrinterKind[];
    "printer-location"?: string;
    "printer-make-and-model"?: string;
    "printer-mandatory-job-attributes"?: (keyof IJobTemplateAttributes | keyof IJobStatusAttributes)[];
    "printer-more-info-manufacturer"?: string;
    "printer-name"?: string;
    "printer-organization"?: string[];
    "printer-organizational-unit"?: string[];
    "printer-privacy-policy-uri"?: string;
    "printer-resolution-default"?: Resolution;
    "printer-resolution-supported"?: Resolution;
    "printer-static-resource-directory-uri"?: string;
    "printer-static-resource-k-octets-supported"?: number;
    "printer-strings-languages-supported"?: string[];
    "printer-strings-uri"?: string;
    "printer-volume-supported"?: IPrinterVolumeSupported;
    "printer-xri-supported"?: IPrinterXri[];
    "proof-print-default"?: IProofPrint;
    "proof-print-supported"?: ("media" | "media-col" | "proof-print-copies")[];
    "punching-hole-diameter-configured"?: number;
    "punching-locations-supported"?: (number | string)[];
    "punching-offset-supported"?: (number | string)[];
    "punching-reference-edge-supported"?: ReferenceEdge[];
    "pwg-raster-document-resolution-supported"?: Resolution[];
    "pwg-raster-document-sheet-back"?: "flipped" | "manual-tumble" | "normal" | "rotated";
    "pwg-raster-document-type-supported"?: PwgRasterDocumentTypeSupported[];
    "pwg-safe-gcode-supported"?: string[];
    "reference-uri-schemes-supported"?: UriSchemes[];
    "repertoire-supported"?: string[];
    "requesting-user-uri-supported"?: boolean;
    "retry-interval-default"?: number;
    "retry-interval-supported"?: string;
    "retry-time-out-default"?: number;
    "retry-time-out-supported"?: string;
    "save-disposition-supported"?: SaveDisposition[];
    "save-document-format-default"?: MimeMediaType;
    "save-document-format-supported"?: MimeMediaType[];
    "save-location-default"?: string;
    "save-location-supported"?: string[];
    "save-name-subdirectory-supported"?: boolean;
    "save-name-supported"?: boolean;
    "separator-sheets-default"?: ISeparatorSheets;
    "separator-sheets-supported"?: SeparatorSheetsType[];
    "sides-default"?: Sides;
    "sides-supported"?: Sides[];
    "smi2699-auth-print-group"?: string;
    "smi2699-auth-proxy-group"?: string;
    "smi2699-device-command"?: string;
    "smi2699-device-format"?: MimeMediaType;
    "smi2699-device-name"?: string;
    "smi2699-device-uri"?: string;
    "stitching-angle-supported"?: (number | string)[];
    "stitching-locations-supported"?: (number | string)[];
    "stitching-method-supported"?: StitchingMethod[];
    "stitching-offset-supported"?: (number | string)[];
    "stitching-reference-edge-supported"?: ReferenceEdge[];
    "subject-supported"?: number;
    "subordinate-printers-supported"?: string[];
    "subscription-privacy-attributes"?: string[];
    "subscription-privacy-scope"?: string;
    "to-name-supported"?: number;
    "trimming-offset-supported"?: (number | string)[];
    "trimming-reference-edge-supported"?: ReferenceEdge[];
    "trimming-type-supported"?: TrimmingType[];
    "trimming-when-supported"?: string[];
    "uri-authentication-supported"?: ("basic" | "certificate" | "digest" | "negotiate" | "none" | "requesting-user-name")[];
    "uri-security-supported"?: ("none" | "ssl3" | "tls")[];
    "user-defined-values-supported"?: string[];
    "which-jobs-supported"?: WhichJobs[];
    "x-image-position-default"?: XImagePosition;
    "x-image-position-supported"?: XImagePosition[];
    "x-image-shift-default"?: number;
    "x-image-shift-supported"?: string;
    "x-side1-image-shift-default"?: number;
    "x-side1-image-shift-supported"?: string;
    "x-side2-image-shift-default"?: number;
    "x-side2-image-shift-supported"?: string;
    "y-image-position-default"?: YImagePosition;
    "y-image-position-supported"?: YImagePosition[];
    "y-image-shift-default"?: number;
    "y-image-shift-supported"?: string;
    "y-side1-image-shift-default"?: number;
    "y-side1-image-shift-supported"?: string;
    "y-side2-image-shift-default"?: number;
    "y-side2-image-shift-supported"?: string;
  }

  interface IPrinterStatus {
    "chamber-humidity-current"?: number;
    "chamber-temperature-current"?: number;
    "device-service-count"?: number;
    "device-uuid"?: string;
    "document-format-varying-attributes"?: (keyof IJobTemplateAttributes | "none")[];
    "job-settable-attributes-supported"?: (keyof IJobTemplateAttributes)[];
    "pages-per-minute"?: number;
    "pages-per-minute-color"?: number;
    "printer-alert"?: string[];
    "printer-alert-description"?: string[];
    "printer-camera-image-uri"?: string[];
    "printer-config-change-date-time"?: string;
    "printer-config-change-time"?: number;
    "printer-config-changes"?: number;
    "printer-detailed-status-messages"?: string[];
    "printer-finisher"?: string[];
    "printer-finisher-description"?: string[];
    "printer-finisher-supplies"?: string[];
    "printer-finisher-supplies-description"?: string[];
    "printer-id"?: number;
    "printer-impressions-completed"?: number;
    "printer-impressions-completed-col"?: IImpressions;
    "printer-input-tray"?: string[];
    "printer-is-accepting-jobs"?: boolean;
    "printer-media-sheets-completed"?: number;
    "printer-media-sheets-completed-col"?: IMediaSheets;
    "printer-message-date-time"?: string;
    "printer-message-from-operator"?: string;
    "printer-message-time"?: number;
    "printer-more-info"?: string;
    "printer-output-tray"?: string[];
    "printer-pages-completed"?: number;
    "printer-pages-completed-col"?: IPages;
    "printer-service-type"?: PrinterServiceType;
    "printer-settable-attributes-supported"?: (keyof IJobTemplateAttributes | "none")[];
    "printer-state"?: PrinterState;
    "printer-state-change-date-time"?: string;
    "printer-state-change-time"?: number;
    "printer-state-message"?: string;
    "printer-state-reasons"?: PrinterStateReasons[];
    "printer-static-resource-k-octets-free"?: number;
    "printer-supply"?: string[];
    "printer-supply-description"?: string[];
    "printer-supply-info-uri"?: string;
    "printer-up-time"?: number;
    "printer-uri-supported"?: string[];
    "printer-uuid"?: string;
    "queued-job-count"?: number;
    "xri-authentication-supported"?: XriAuthentication[];
    "xri-security-supported"?: XriSecurity[];
    "xri-uri-scheme-supported"?: UriSchemes[];
  }

  interface IDestionationAccesses {
    "access-oauth-token"?: string[];
    "access-oauth-uri"?: string;
    "access-password"?: string;
    "access-pin"?: string;
    "access-user-name"?: string;
  }

  interface IDocumentAccess {
    "access-oauth-token"?: string[];
    "access-oauth-uri"?: string;
    "access-password"?: string;
    "access-pin"?: string;
    "access-user-name"?: string;
  }

  interface IDocumentFormatDetails {
    "document-format"?: MimeMediaType;
    "document-format-device-id"?: string;
    "document-format-version"?: string;
    "document-natural-language"?: string[];
    "document-source-application-name"?: string;
    "document-source-application-version"?: string;
    "document-source-os-name"?: string;
    "document-source-os-version"?: string;
  }

  interface IInputAttributes {
    "input-auto-scaling"?: boolean;
    "input-auto-skew-correction"?: boolean;
    "input-brightness"?: number;
    "input-color-mode"?: InputColorMode;
    "input-content-type"?: InputContentType;
    "input-contrast"?: number;
    "input-film-scan-mode"?: InputFilmScanMode;
    "input-images-to-transfer"?: number;
    "input-media"?: MediaName | MediaSizeName;
    "input-orientation-requested"?: OrientationRequested;
    "input-quality"?: PrintQuality;
    "input-resolution"?: Resolution;
    "input-scaling-height"?: number;
    "input-scaling-width"?: number;
    "input-scan-regions"?: IPPScanRegions[];
    "input-sharpness"?: number;
    "input-sides"?: Sides;
    "input-source"?: InputSource;
  }

  interface IPPScanRegions {
    "x-dimension"?: number;
    "x-origin"?: number;
    "y-dimension"?: number;
    "y-origin"?: number;
  }

  interface IOutputAttributes {
    "noise-removal"?: number;
    "output-compression-quality-factor"?: number;
  }

  interface IDestinationUriReady {
    "destination-attributes"?: any[];
    "destination-attributes-supported"?: string[];
    "destination-info"?: string;
    "destination-is-directory"?: boolean;
    "destination-mandatory-access-attributes"?: string[];
    "destination-name"?: string;
    "destination-oauth-scope"?: string[];
    "destination-oauth-token"?: string[];
    "destination-oauth-uri"?: string;
    "destination-uri"?: string;
  }

  interface IInputScanRegion {
    "x-dimension"?: string;
    "x-origin"?: string;
    "y-dimension"?: string;
    "y-origin"?: string;
  }

  interface IJobConstraintsSupported {
    "resolver-name"?: string;
  }

  interface IJobPresetsSupported {
    "preset-name"?: string;
  }

  interface IJobResolversSupported {
    "resolver-name"?: string;
  }

  interface IJobTriggersSupported {
    "preset-name"?: string;
  }

  interface IMediaSizeSupported {
    "x-dimension"?: number | string;
    "y-dimension"?: number | string;
  }

  interface IPrintAccuracySupported {
    "accuracy-units"?: AccuracyUnits;
    "x-accuracy"?: number;
    "y-accuracy"?: number;
    "z-accuracy"?: number;
  }

  interface IPrinterContact {
    "contact-name"?: string;
    "contact-uri"?: string;
    "contact-vcard"?: string[];
  }

  interface IPrinterIccProfiles {
    "profile-name"?: string;
    "profile-url"?: string;
  }

  interface IPrinterVolumeSupported {
    "x-dimension"?: number;
    "y-dimension"?: number;
    "z-dimension"?: number;
  }

  interface IPrinterXri {
    "xri-authentication"?: XriAuthentication;
    "xri-security"?: XriSecurity;
    "xri-uri"?: string;
  }

  interface IDestinationStatuses {
    "destination-uri"?: string;
    "images-completed"?: number;
    "transmission-status"?: TransmissionStatus;
  }

  interface IImpressions {
    blank?: number;
    "blank-two-sided"?: number;
    "full-color"?: number;
    "full-color-two-sided"?: number;
    "highlight-color"?: number;
    "highlight-color-two-sided"?: number;
    monochrome?: number;
    "monochrome-two-sided"?: number;
  }

  interface IMediaSheets {
    blank?: number;
    "full-color"?: number;
    "highlight-color"?: number;
    monochrome?: number;
  }

  interface IPages {
    "full-color"?: number;
    monochrome?: number;
  }

  interface ICover {
    "cover-type"?: CoverType;
    media?: Media;
    "media-col"?: IMedia[];
  }

  interface ICoverSheetInfo {
    "from-name"?: string;
    logo?: string;
    message?: string;
    "organization-name"?: string;
    subject?: string;
    "to-name"?: string;
  }

  interface IDestinationUris {
    "destination-attributes"?: any[];
    "destination-uri"?: string;
    "post-dial-string"?: string;
    "pre-dial-string"?: string;
    "t33-subaddress"?: number;
    "feed-orientation"?: FeedOrientation;
  }

  interface IFinishingBailing {
    "baling-type"?: BalingType;
    "baling-when"?: BalingWhen;
  }

  interface IFinishingBinding {
    "binding-reference-edge"?: ReferenceEdge;
    "binding-type"?: BindingType;
  }

  interface IFinishingCoating {
    "coating-sides"?: FinishingSides;
    "coating-type"?: CoatingType;
  }

  interface IFinishingCovering {
    "covering-name"?: string;
  }

  interface IFinishingFolding {
    "folding-direction"?: FoldingDirection;
    "folding-offset"?: number;
    "folding-reference-edge"?: ReferenceEdge;
  }

  interface IFinishingLaminating {
    "laminating-sides"?: FinishingSides;
    "laminating-type"?: LaminatingType;
  }

  interface IFinishingPunching {
    "punching-locations"?: number[];
    "punching-offset"?: number;
    "punching-reference-edge"?: ReferenceEdge;
  }

  interface IFinishingStitching {
    "stitching-angle"?: number;
    "stitching-locations"?: number[];
    "stitching-method"?: StitchingMethod;
    "stitching-offset"?: number;
    "stitching-reference-edge"?: ReferenceEdge;
  }

  interface IFinishingTrimming {
    "trimming-offset"?: number;
    "trimming-reference-edge"?: ReferenceEdge;
    "trimming-type"?: TrimmingType;
    "trimming-when"?: string;
  }

  interface IFinishings {
    baling?: IFinishingBailing;
    binding?: IFinishingBinding;
    coating?: IFinishingCoating;
    covering?: IFinishingCovering;
    "finishing-template"?: Finishings;
    folding?: IFinishingFolding[];
    "imposition-template"?: ImpositionTemplate;
    laminating?: IFinishingLaminating;
    "media-sheets-supported"?: string;
    "media-size"?: IMediaSize;
    "media-size-name"?: string;
    punching?: IFinishingPunching;
    stitching?: IFinishingStitching;
    trimming?: IFinishingTrimming[];
  }

  interface IInsertSheet {
    "insert-after-page-number"?: number;
    "insert-count"?: number;
    media?: Media;
    "media-col"?: IMedia;
  }

  interface IJobAccontingSheets {
    "job-accounting-output-bin"?: OutputBin;
    "job-accounting-sheets-type"?: "none" | "standard";
    media?: Media;
    "media-col"?: IMedia;
  }

  interface IJobErrorSheet {
    "job-error-sheet-type"?: "none" | "standard";
    "job-error-sheet-when"?: "always" | "on-error";
    media?: Media;
    "media-col"?: IMedia;
  }

  interface IJobSaveDisposition {
    "save-disposition"?: SaveDisposition;
    "save-info"?: ISaveInfo[];
  }

  interface ISaveInfo {
    "save-document-format"?: MimeMediaType;
    "save-location"?: string;
    "save-name"?: string;
  }

  interface IJobSheets {
    "job-sheets"?: JobSheets;
    media?: Media;
    "media-col"?: IMedia;
  }

  interface IMaterials {
    "material-amount"?: number;
    "material-amount-units"?: MaterialAmountUnits;
    "material-color"?: string;
    "material-diameter"?: number;
    "material-diameter-tolerance"?: number;
    "material-fill-density"?: number;
    "material-key"?: string;
    "material-name"?: string;
    "material-nozzle-diameter"?: number;
    "material-purpose"?: MaterialPurpose[];
    "material-rate"?: number;
    "material-rate-units"?: MaterialRateUnits;
    "material-retraction"?: boolean;
    "material-shell-thickness"?: number;
    "material-temperature"?: number;
    "material-type"?: MaterialType;
  }

  interface IMedia {
    "media-back-coating"?: MediaCoating;
    "media-bottom-margin"?: number;
    "media-color"?: MediaColor;
    "media-front-coating"?: MediaCoating;
    "media-grain"?: MediaGrain;
    "media-hole-count"?: number;
    "media-info"?: string;
    "media-key"?: MediaSizeName | MediaName;
    "media-left-margin"?: number;
    "media-order-count"?: number;
    "media-pre-printed"?: MediaPrePrinted;
    "media-recycled"?: MediaPrePrinted;
    "media-right-margin"?: number;
    "media-size"?: IMediaSize;
    "media-size-name"?: MediaSizeName;
    "media-source"?: MediaSource;
    "media-thickness"?: number;
    "media-tooth"?: MediaTooth;
    "media-top-margin"?: number;
    "media-type"?: MediaType;
    "media-weight-metric"?: number;
  }

  interface IMediaSize {
    "x-dimension"?: number;
    "y-dimension"?: number;
  }

  interface IPdlInitFile {
    "pdl-init-file-entry"?: string;
    "pdl-init-file-location"?: string;
    "pdl-init-file-name"?: string;
  }

  interface IPrintAccuracy {
    "accuracy-units"?: AccuracyUnits;
    "x-accuracy"?: number;
    "y-accuracy"?: number;
    "z-accuracy"?: number;
  }

  interface IPrintObjects {
    "document-number"?: number;
    "object-offset"?: IObjectOffset;
    "object-size"?: IObjectSize;
    "object-uuid"?: string;
  }

  interface IObjectOffset {
    "x-offset"?: number;
    "y-offset"?: number;
    "z-offset"?: number;
  }

  interface IObjectSize {
    "x-dimension"?: number;
    "y-dimension"?: number;
    "z-dimension"?: number;
  }

  interface IProofPrint {
    media?: Media;
    "media-col"?: IMedia;
    "proof-print-copies"?: number;
  }

  interface ISeparatorSheets {
    media?: Media;
    "media-col"?: IMedia;
    "separator-sheets-type"?: SeparatorSheetsType[];
  }

  type StatusCode =
    | "successful-ok"
    | "successful-ok-ignored-or-substituted-attributes"
    | "successful-ok-conflicting-attributes"
    | "successful-ok-ignored-subscriptions"
    | "successful-ok-too-many-events"
    | "successful-ok-events-complete"
    | "client-error-bad-request"
    | "client-error-forbidden"
    | "client-error-not-authenticated"
    | "client-error-not-authorized"
    | "client-error-not-possible"
    | "client-error-timeout"
    | "client-error-not-found"
    | "client-error-gone"
    | "client-error-request-entity-too-large"
    | "client-error-request-value-too-long"
    | "client-error-document-format-not-supported"
    | "client-error-attributes-or-values-not-supported"
    | "client-error-uri-scheme-not-supported"
    | "client-error-charset-not-supported"
    | "client-error-conflicting-attributes"
    | "client-error-compression-not-supported"
    | "client-error-compression-error"
    | "client-error-document-format-error"
    | "client-error-document-access-error"
    | "client-error-attributes-not-settable"
    | "client-error-ignored-all-subscriptions"
    | "client-error-too-many-subscriptions"
    | "client-error-document-password-error"
    | "client-error-document-permission-error"
    | "client-error-document-security-error"
    | "client-error-document-unprintable-error"
    | "client-error-account-info-needed"
    | "client-error-account-closed"
    | "client-error-account-limit-reached"
    | "client-error-account-authorization-failed"
    | "client-error-not-fetchable"
    | "server-error-internal-error"
    | "server-error-operation-not-supported"
    | "server-error-service-unavailable"
    | "server-error-version-not-supported"
    | "server-error-device-error"
    | "server-error-temporary-error"
    | "server-error-not-accepting-jobs"
    | "server-error-busy"
    | "server-error-job-canceled"
    | "server-error-multiple-document-jobs-not-supported"
    | "server-error-printer-is-deactivated"
    | "server-error-too-many-jobs"
    | "server-error-too-many-documents";

  type MimeMediaType =
    | "application/activemessage"
    | "application/andrew-inset"
    | "application/applefile"
    | "application/atomicmail"
    | "application/dca-rft"
    | "application/dec-dx"
    | "application/mac-binhex40"
    | "application/mac-compactpro"
    | "application/macwriteii"
    | "application/msword"
    | "application/news-message-id"
    | "application/news-transmission"
    | "application/octet-stream"
    | "application/oda"
    | "application/pdf"
    | "application/postscript"
    | "application/powerpoint"
    | "application/remote-printing"
    | "application/rtf"
    | "application/slate"
    | "application/wita"
    | "application/wordperfect5.1"
    | "application/x-bcpio"
    | "application/x-cdlink"
    | "application/x-compress"
    | "application/x-cpio"
    | "application/x-csh"
    | "application/x-director"
    | "application/x-dvi"
    | "application/x-gtar"
    | "application/x-gzip"
    | "application/x-hdf"
    | "application/x-httpd-cgi"
    | "application/x-koan"
    | "application/x-latex"
    | "application/x-mif"
    | "application/x-netcdf"
    | "application/x-sh"
    | "application/x-shar"
    | "application/x-stuffit"
    | "application/x-sv4cpio"
    | "application/x-sv4crc"
    | "application/x-tar"
    | "application/x-tcl"
    | "application/x-tex"
    | "application/x-texinfo"
    | "application/x-troff"
    | "application/x-troff-man"
    | "application/x-troff-me"
    | "application/x-troff-ms"
    | "application/x-ustar"
    | "application/x-wais-source"
    | "image/gif"
    | "image/ief"
    | "image/jpeg"
    | "image/png"
    | "image/tiff"
    | "image/x-cmu-raster"
    | "image/x-portable-anymap"
    | "image/x-portable-bitmap"
    | "image/x-portable-graymap"
    | "image/x-portable-pixmap"
    | "image/x-rgb"
    | "image/x-xbitmap"
    | "image/x-xpixmap"
    | "image/x-xwindowdump"
    | "message/external-body"
    | "message/news"
    | "message/partial"
    | "message/rfc822"
    | "text/html"
    | "text/plain"
    | "text/richtext"
    | "text/tab-separated-values"
    | "text/x-setext"
    | "text/x-sgml";

  type PrinterOpertaion =
    | "Acknowledge-Document"
    | "Acknowledge-Identify-Printer"
    | "Acknowledge-Job"
    | "Activate-Printer"
    | "Add-Document-Images"
    | "Allocate-Printer-Resources"
    | "Cancel-Current-Job"
    | "Cancel-Document"
    | "Cancel-Job"
    | "Cancel-Jobs"
    | "Cancel-My-Jobs"
    | "Cancel-Resource"
    | "Cancel-Subscription"
    | "Close-Job"
    | "Create-Job"
    | "Create-Job-Subscriptions"
    | "Create-Printer"
    | "Create-Printer-Subscriptions"
    | "Create-Resource"
    | "Create-Resource-Subscriptions"
    | "Create-System-Subscriptions"
    | "Deactivate-Printer"
    | "Deallocate-Printer-Resources"
    | "Delete-Document"
    | "Delete-Printer"
    | "Deregister-Output-Device"
    | "Disable-All-Printers"
    | "Disable-Printer"
    | "Enable-All-Printers"
    | "Enable-Printer"
    | "Fetch-Document"
    | "Fetch-Job"
    | "Get-Document-Attributes"
    | "Get-Documents"
    | "Get-Job-Attributes"
    | "Get-Jobs"
    | "Get-Next-Document-Data"
    | "Get-Notifications"
    | "Get-Output-Device-Attributes"
    | "Get-Printer-Attributes"
    | "Get-Printer-Resources"
    | "Get-Printer-Supported-Values"
    | "Get-Printers"
    | "Get-Resource-Attributes"
    | "Get-Resources"
    | "Get-Subscription-Attributes"
    | "Get-Subscriptions"
    | "Get-System-Attributes"
    | "Get-System-Supported-Values"
    | "Get-User-Printer-Attributes"
    | "Hold-Job"
    | "Hold-New-Jobs"
    | "Identify-Printer"
    | "Install-Resource"
    | "Pause-All-Printers"
    | "Pause-All-Printers-After-Current-Job"
    | "Pause-Printer"
    | "Pause-Printer-After-Current-Job"
    | "Print-Job"
    | "Print-URI"
    | "Promote-Job"
    | "Purge-Jobs"
    | "Register-Output-Device"
    | "Release-Held-New-Jobs"
    | "Release-Job"
    | "Renew-Subscription"
    | "Reprocess-Job"
    | "Restart-Job"
    | "Restart-One-Printer"
    | "Restart-Printer"
    | "Restart-System"
    | "Resubmit-Job"
    | "Resume-All-Printers"
    | "Resume-Job"
    | "Resume-Printer"
    | "Schedule-Job-After"
    | "Send-Document"
    | "Send-Resource-Data"
    | "Send-URI"
    | "Set-Document-Attributes"
    | "Set-Job-Attributes"
    | "Set-Printer-Attributes"
    | "Set-Resource-Attributes"
    | "Set-System-Attributes"
    | "Shutdown-All-Printers"
    | "Shutdown-One-Printer"
    | "Shutdown-Printer"
    | "Startup-All-Printers"
    | "Startup-One-Printer"
    | "Startup-Printer"
    | "Suspend-Current-Job"
    | "Update-Active-Jobs"
    | "Update-Document-Status"
    | "Update-Job-Status"
    | "Update-Output-Device-Attributes"
    | "Validate-Document"
    | "Validate-Job"
    | "Value";

  type Compression = "compress" | "deflate" | "gzip" | "none";

  type CoverType = "no-cover" | "print-back" | "print-both" | "print-front" | "print-none";

  type DocumentDigitalSignature = "dss" | "none" | "pgp" | "smime" | "xmldsig";

  type DocumentStateReasons =
    | "aborted-by-system"
    | "canceled-at-device"
    | "canceled-by-operator"
    | "canceled-by-user"
    | "completed-successfully"
    | "completed-with-errors"
    | "completed-with-warnings"
    | "compression-error"
    | "data-insufficient"
    | "digital-signature-did-not-verify"
    | "digital-signature-type-not-supported"
    | "digital-signature-wait"
    | "document-access-error"
    | "document-format-error"
    | "document-password-error"
    | "document-permission-error"
    | "document-security-error"
    | "document-unprintable-error"
    | "errors-detected"
    | "incoming"
    | "interpreting"
    | "none"
    | "outgoing"
    | "printing"
    | "processing-to-stop-point"
    | "queued"
    | "queued-for-marker"
    | "queued-in-device"
    | "resources-are-not-ready"
    | "resources-are-not-supported"
    | "submission-interrupted"
    | "transforming"
    | "unsupported-compression"
    | "unsupported-document-format"
    | "warnings-detected";

  type FeedOrientation = "long-edge-first" | "short-edge-first";

  type IdentifyActions = "display" | "flash" | "sound" | "speak";

  type ImpositionTemplate = "none" | "signature";

  type JobErrorAction = "abort-job" | "cancel-job" | "continue-job" | "suspend-job";

  type JobHoldUntil = "day-time" | "evening" | "indefinite" | "night" | "no-hold" | "second-shift" | "third-shift" | "weekend";

  type JobDelayOutputUntil =
    | "day-time"
    | "evening"
    | "indefinite"
    | "night"
    | "no-delay-output"
    | "second-shift"
    | "third-shift"
    | "weekend";

  type JobPasswordEncryption =
    | "md2"
    | "md4"
    | "md5"
    | "none"
    | "sha"
    | "sha2-224"
    | "sha2-256"
    | "sha2-384"
    | "sha2-512"
    | "sha2-512_224"
    | "sha2-512_256"
    | "sha3-224"
    | "sha3-256"
    | "sha3-384"
    | "sha3-512"
    | "sha3-512_224"
    | "sha3-512_256"
    | "shake-128"
    | "shake-256";

  type JobSheets = "first-print-stream-page" | "job-both-sheet" | "job-end-sheet" | "job-start-sheet" | "none" | "standard";

  type JobStateReasons =
    | "aborted-by-system"
    | "compression-error"
    | "digital-signature-did-not-verify"
    | "digital-signature-type-not-supported"
    | "document-access-error"
    | "document-format-error"
    | "document-password-error"
    | "document-permission-error"
    | "document-security-error"
    | "document-unprintable-error"
    | "errors-detected"
    | "job-canceled-at-device"
    | "job-canceled-by-operator"
    | "job-canceled-by-user"
    | "job-completed-successfully"
    | "job-completed-with-errors"
    | "job-completed-with-warnings"
    | "job-data-insufficient"
    | "job-delay-output-until-specified"
    | "job-digital-signature-wait"
    | "job-hold-until-specified"
    | "job-incoming"
    | "job-interpreting"
    | "job-outgoing"
    | "job-password-wait"
    | "job-printed-successfully"
    | "job-printed-with-errors"
    | "job-printed-with-warnings"
    | "job-printing"
    | "job-queued"
    | "job-queued-for-marker"
    | "job-restartable"
    | "job-resuming"
    | "job-saved-successfully"
    | "job-saved-with-errors"
    | "job-saved-with-warnings"
    | "job-saving"
    | "job-spooling"
    | "job-streaming"
    | "job-suspended"
    | "job-suspended-by-operator"
    | "job-suspended-by-system"
    | "job-suspended-by-user"
    | "job-suspending"
    | "job-transforming"
    | "none"
    | "printer-stopped"
    | "printer-stopped-partly"
    | "processing-to-stop-point"
    | "queued-in-device"
    | "resources-are-not-ready"
    | "resources-are-not-supported"
    | "service-off-line"
    | "submission-interrupted"
    | "unsupported-compression"
    | "unsupported-document-format"
    | "warnings-detected";

  type MediaCoating = "glossy" | "high-gloss" | "matte" | "none" | "satin" | "semi-gloss";

  type MediaColSupported =
    | "media-bottom-margin"
    | "media-left-margin"
    | "media-right-margin"
    | "media-size-name"
    | "media-source"
    | "media-top-margin";

  type MediaColor =
    | "black"
    | "blue"
    | "brown"
    | "buff"
    | "clear-black"
    | "clear-blue"
    | "clear-brown"
    | "clear-buff"
    | "clear-cyan"
    | "clear-gold"
    | "clear-goldenrod"
    | "clear-gray"
    | "clear-green"
    | "clear-ivory"
    | "clear-magenta"
    | "clear-multi-color"
    | "clear-mustard"
    | "clear-orange"
    | "clear-pink"
    | "clear-red"
    | "clear-silver"
    | "clear-turquoise"
    | "clear-violet"
    | "clear-white"
    | "clear-yellow"
    | "cyan"
    | "dark-blue"
    | "dark-brown"
    | "dark-buff"
    | "dark-cyan"
    | "dark-gold"
    | "dark-goldenrod"
    | "dark-gray"
    | "dark-green"
    | "dark-ivory"
    | "dark-magenta"
    | "dark-mustard"
    | "dark-orange"
    | "dark-pink"
    | "dark-red"
    | "dark-silver"
    | "dark-turquoise"
    | "dark-violet"
    | "dark-yellow"
    | "gold"
    | "goldenrod"
    | "gray"
    | "green"
    | "ivory"
    | "light-black"
    | "light-blue"
    | "light-brown"
    | "light-buff"
    | "light-cyan"
    | "light-gold"
    | "light-goldenrod"
    | "light-gray"
    | "light-green"
    | "light-ivory"
    | "light-magenta"
    | "light-mustard"
    | "light-orange"
    | "light-pink"
    | "light-red"
    | "light-silver"
    | "light-turquoise"
    | "light-violet"
    | "light-yellow"
    | "magenta"
    | "multi-color"
    | "mustard"
    | "no-color"
    | "orange"
    | "pink"
    | "red"
    | "silver"
    | "turquoise"
    | "violet"
    | "white"
    | "yellow";

  type MediaGrain = "x-direction" | "y-direction";

  type MediaPrePrinted = "blank" | "letter-head" | "pre-printed";

  type MediaRecycled = "none" | "standard";

  type MediaSizeName =
    | "a"
    | "arch-a"
    | "arch-b"
    | "arch-c"
    | "arch-d"
    | "arch-e"
    | "asme_f_28x40in"
    | "b"
    | "c"
    | "choice_iso_a4_210x297mm_na_letter_8.5x11in"
    | "d"
    | "e"
    | "executive"
    | "f"
    | "folio"
    | "invoice"
    | "iso-a0"
    | "iso-a1"
    | "iso-a2"
    | "iso-a3"
    | "iso-a4"
    | "iso-a5"
    | "iso-a6"
    | "iso-a7"
    | "iso-a8"
    | "iso-a9"
    | "iso-a10"
    | "iso-b0"
    | "iso-b1"
    | "iso-b2"
    | "iso-b3"
    | "iso-b4"
    | "iso-b5"
    | "iso-b6"
    | "iso-b7"
    | "iso-b8"
    | "iso-b9"
    | "iso-b10"
    | "iso-c3"
    | "iso-c4"
    | "iso-c5"
    | "iso-c6"
    | "iso-designated-long"
    | "iso_2a0_1189x1682mm"
    | "iso_a0_841x1189mm"
    | "iso_a1_594x841mm"
    | "iso_a1x3_841x1783mm"
    | "iso_a1x4_841x2378mm"
    | "iso_a2_420x594mm"
    | "iso_a2x3_594x1261mm"
    | "iso_a2x4_594x1682mm"
    | "iso_a2x5_594x2102mm"
    | "iso_a3-extra_322x445mm"
    | "iso_a3_297x420mm"
    | "iso_a0x3_1189x2523mm"
    | "iso_a3x3_420x891mm"
    | "iso_a3x4_420x1189mm"
    | "iso_a3x5_420x1486mm"
    | "iso_a3x6_420x1783mm"
    | "iso_a3x7_420x2080mm"
    | "iso_a4-extra_235.5x322.3mm"
    | "iso_a4-tab_225x297mm"
    | "iso_a4_210x297mm"
    | "iso_a4x3_297x630mm"
    | "iso_a4x4_297x841mm"
    | "iso_a4x5_297x1051mm"
    | "iso_a4x6_297x1261mm"
    | "iso_a4x7_297x1471mm"
    | "iso_a4x8_297x1682mm"
    | "iso_a4x9_297x1892mm"
    | "iso_a5-extra_174x235mm"
    | "iso_a5_148x210mm"
    | "iso_a6_105x148mm"
    | "iso_a7_74x105mm"
    | "iso_a8_52x74mm"
    | "iso_a9_37x52mm"
    | "iso_a10_26x37mm"
    | "iso_b0_1000x1414mm"
    | "iso_b1_707x1000mm"
    | "iso_b2_500x707mm"
    | "iso_b3_353x500mm"
    | "iso_b4_250x353mm"
    | "iso_b5-extra_201x276mm"
    | "iso_b5_176x250mm"
    | "iso_b6_125x176mm"
    | "iso_b6c4_125x324mm"
    | "iso_b7_88x125mm"
    | "iso_b8_62x88mm"
    | "iso_b9_44x62mm"
    | "iso_b10_31x44mm"
    | "iso_c0_917x1297mm"
    | "iso_c1_648x917mm"
    | "iso_c2_458x648mm"
    | "iso_c3_324x458mm"
    | "iso_c4_229x324mm"
    | "iso_c5_162x229mm"
    | "iso_c6_114x162mm"
    | "iso_c6c5_114x229mm"
    | "iso_c7_81x114mm"
    | "iso_c7c6_81x162mm"
    | "iso_c8_57x81mm"
    | "iso_c9_40x57mm"
    | "iso_c10_28x40mm"
    | "iso_dl_110x220mm"
    | "iso_id-1_53.98x85.6mm"
    | "iso_id-3_88x125mm"
    | "iso_ra0_860x1220mm"
    | "iso_ra1_610x860mm"
    | "iso_ra2_430x610mm"
    | "iso_ra3_305x430mm"
    | "iso_ra4_215x305mm"
    | "iso_sra0_900x1280mm"
    | "iso_sra1_640x900mm"
    | "iso_sra2_450x640mm"
    | "iso_sra3_320x450mm"
    | "iso_sra4_225x320mm"
    | "jis-b0"
    | "jis-b1"
    | "jis-b2"
    | "jis-b3"
    | "jis-b4"
    | "jis-b5"
    | "jis-b6"
    | "jis-b7"
    | "jis-b8"
    | "jis-b9"
    | "jis-b10"
    | "jis_b0_1030x1456mm"
    | "jis_b1_728x1030mm"
    | "jis_b2_515x728mm"
    | "jis_b3_364x515mm"
    | "jis_b4_257x364mm"
    | "jis_b5_182x257mm"
    | "jis_b6_128x182mm"
    | "jis_b7_91x128mm"
    | "jis_b8_64x91mm"
    | "jis_b9_45x64mm"
    | "jis_b10_32x45mm"
    | "jis_exec_216x330mm"
    | "jpn_chou2_111.1x146mm"
    | "jpn_chou3_120x235mm"
    | "jpn_chou4_90x205mm"
    | "jpn_chou40_90x225mm"
    | "jpn_hagaki_100x148mm"
    | "jpn_kahu_240x322.1mm"
    | "jpn_kaku1_270x382mm"
    | "jpn_kaku2_240x332mm"
    | "jpn_kaku3_216x277mm"
    | "jpn_kaku4_197x267mm"
    | "jpn_kaku5_190x240mm"
    | "jpn_kaku7_142x205mm"
    | "jpn_kaku8_119x197mm"
    | "jpn_oufuku_148x200mm"
    | "jpn_you4_105x235mm"
    | "ledger"
    | "monarch"
    | "na-5x7"
    | "na-6x9"
    | "na-7x9"
    | "na-8x10"
    | "na-9x11"
    | "na-9x12"
    | "na-10x13"
    | "na-10x14"
    | "na-10x15"
    | "na-legal"
    | "na-letter"
    | "na-number-9"
    | "na-number-10"
    | "na_5x7_5x7in"
    | "na_6x9_6x9in"
    | "na_7x9_7x9in"
    | "na_9x11_9x11in"
    | "na_10x11_10x11in"
    | "na_10x13_10x13in"
    | "na_10x14_10x14in"
    | "na_10x15_10x15in"
    | "na_11x12_11x12in"
    | "na_11x15_11x15in"
    | "na_12x19_12x19in"
    | "na_a2_4.375x5.75in"
    | "na_arch-a_9x12in"
    | "na_arch-b_12x18in"
    | "na_arch-c_18x24in"
    | "na_arch-d_24x36in"
    | "na_arch-e2_26x38in"
    | "na_arch-e3_27x39in"
    | "na_arch-e_36x48in"
    | "na_b-plus_12x19.17in"
    | "na_c5_6.5x9.5in"
    | "na_c_17x22in"
    | "na_d_22x34in"
    | "na_e_34x44in"
    | "na_edp_11x14in"
    | "na_eur-edp_12x14in"
    | "na_executive_7.25x10.5in"
    | "na_f_44x68in"
    | "na_fanfold-eur_8.5x12in"
    | "na_fanfold-us_11x14.875in"
    | "na_foolscap_8.5x13in"
    | "na_govt-legal_8x13in"
    | "na_govt-letter_8x10in"
    | "na_index-3x5_3x5in"
    | "na_index-4x6-ext_6x8in"
    | "na_index-4x6_4x6in"
    | "na_index-5x8_5x8in"
    | "na_invoice_5.5x8.5in"
    | "na_ledger_11x17in"
    | "na_legal-extra_9.5x15in"
    | "na_legal_8.5x14in"
    | "na_letter-extra_9.5x12in"
    | "na_letter-plus_8.5x12.69in"
    | "na_letter_8.5x11in"
    | "na_monarch_3.875x7.5in"
    | "na_number-9_3.875x8.875in"
    | "na_number-10_4.125x9.5in"
    | "na_number-11_4.5x10.375in"
    | "na_number-12_4.75x11in"
    | "na_number-14_5x11.5in"
    | "na_oficio_8.5x13.4in"
    | "na_personal_3.625x6.5in"
    | "na_quarto_8.5x10.83in"
    | "na_super-a_8.94x14in"
    | "na_super-b_13x19in"
    | "na_wide-format_30x42in"
    | "oe_12x16_12x16in"
    | "oe_14x17_14x17in"
    | "oe_18x22_18x22in"
    | "oe_a2plus_17x24in"
    | "oe_business-card_2x3.5in"
    | "oe_photo-10r_10x12in"
    | "oe_photo-20r_20x24in"
    | "oe_photo-l_3.5x5in"
    | "oe_photo-s10r_10x15in"
    | "oe_square-photo_4x4in"
    | "oe_square-photo_5x5in"
    | "om_16k_184x260mm"
    | "om_16k_195x270mm"
    | "om_business-card_55x85mm"
    | "om_business-card_55x91mm"
    | "om_card_54x86mm"
    | "om_dai-pa-kai_275x395mm"
    | "om_dsc-photo_89x119mm"
    | "om_folio-sp_215x315mm"
    | "om_folio_210x330mm"
    | "om_invite_220x220mm"
    | "om_italian_110x230mm"
    | "om_juuro-ku-kai_198x275mm"
    | "om_large-photo_200x300"
    | "om_medium-photo_130x180mm"
    | "om_pa-kai_267x389mm"
    | "om_postfix_114x229mm"
    | "om_small-photo_100x150mm"
    | "om_square-photo_89x89mm"
    | "om_wide-photo_100x200mm"
    | "prc_1_102x165mm"
    | "prc_2_102x176mm"
    | "prc_3_125x176mm"
    | "prc_4_110x208mm"
    | "prc_5_110x220mm"
    | "prc_6_120x320mm"
    | "prc_7_160x230mm"
    | "prc_8_120x309mm"
    | "prc_10_324x458mm"
    | "prc_16k_146x215mm"
    | "prc_32k_97x151mm"
    | "quarto"
    | "roc_8k_10.75x15.5in"
    | "roc_16k_7.75x10.75in"
    | "super-b"
    | "tabloid";

  type MediaName =
    | "a-translucent"
    | "a-transparent"
    | "a-white"
    | "arch-a-translucent"
    | "arch-a-transparent"
    | "arch-a-white"
    | "arch-axsynchro-translucent"
    | "arch-axsynchro-transparent"
    | "arch-axsynchro-white"
    | "arch-b-translucent"
    | "arch-b-transparent"
    | "arch-b-white"
    | "arch-bxsynchro-translucent"
    | "arch-bxsynchro-transparent"
    | "arch-bxsynchro-white"
    | "arch-c-translucent"
    | "arch-c-transparent"
    | "arch-c-white"
    | "arch-cxsynchro-translucent"
    | "arch-cxsynchro-transparent"
    | "arch-cxsynchro-white"
    | "arch-d-translucent"
    | "arch-d-transparent"
    | "arch-d-white"
    | "arch-dxsynchro-translucent"
    | "arch-dxsynchro-transparent"
    | "arch-dxsynchro-white"
    | "arch-e-translucent"
    | "arch-e-transparent"
    | "arch-e-white"
    | "arch-exsynchro-translucent"
    | "arch-exsynchro-transparent"
    | "arch-exsynchro-white"
    | "auto-fixed-size-translucent"
    | "auto-fixed-size-transparent"
    | "auto-fixed-size-white"
    | "auto-synchro-translucent"
    | "auto-synchro-transparent"
    | "auto-synchro-white"
    | "auto-translucent"
    | "auto-transparent"
    | "auto-white"
    | "axsynchro-translucent"
    | "axsynchro-transparent"
    | "axsynchro-white"
    | "b-translucent"
    | "b-transparent"
    | "b-white"
    | "bxsynchro-translucent"
    | "bxsynchro-transparent"
    | "bxsynchro-white"
    | "c-translucent"
    | "c-transparent"
    | "c-white"
    | "cxsynchro-translucent"
    | "cxsynchro-transparent"
    | "cxsynchro-white"
    | "d-translucent"
    | "d-transparent"
    | "d-white"
    | "default"
    | "dxsynchro-translucent"
    | "dxsynchro-transparent"
    | "dxsynchro-white"
    | "e-translucent"
    | "e-transparent"
    | "e-white"
    | "executive-white"
    | "exsynchro-translucent"
    | "exsynchro-transparent"
    | "exsynchro-white"
    | "folio-white"
    | "invoice-white"
    | "iso-a0-translucent"
    | "iso-a0-transparent"
    | "iso-a0-white"
    | "iso-a0xsynchro-translucent"
    | "iso-a0xsynchro-transparent"
    | "iso-a0xsynchro-white"
    | "iso-a1-translucent"
    | "iso-a1-transparent"
    | "iso-a1-white"
    | "iso-a1x3-translucent"
    | "iso-a1x3-transparent"
    | "iso-a1x3-white"
    | "iso-a1x4-translucent"
    | "iso-a1x4-transparent"
    | "iso-a1x4-white"
    | "iso-a1xsynchro-translucent"
    | "iso-a1xsynchro-transparent"
    | "iso-a1xsynchro-white"
    | "iso-a2-translucent"
    | "iso-a2-transparent"
    | "iso-a2-white"
    | "iso-a2x3-translucent"
    | "iso-a2x3-transparent"
    | "iso-a2x3-white"
    | "iso-a2x4-translucent"
    | "iso-a2x4-transparent"
    | "iso-a2x4-white"
    | "iso-a2x5-translucent"
    | "iso-a2x5-transparent"
    | "iso-a2x5-white"
    | "iso-a2xsynchro-translucent"
    | "iso-a2xsynchro-transparent"
    | "iso-a2xsynchro-white"
    | "iso-a3-colored"
    | "iso-a3-translucent"
    | "iso-a3-transparent"
    | "iso-a3-white"
    | "iso-a3x3-translucent"
    | "iso-a3x3-transparent"
    | "iso-a3x3-white"
    | "iso-a3x4-translucent"
    | "iso-a3x4-transparent"
    | "iso-a3x4-white"
    | "iso-a3x5-translucent"
    | "iso-a3x5-transparent"
    | "iso-a3x5-white"
    | "iso-a3x6-translucent"
    | "iso-a3x6-transparent"
    | "iso-a3x6-white"
    | "iso-a3x7-translucent"
    | "iso-a3x7-transparent"
    | "iso-a3x7-white"
    | "iso-a3xsynchro-translucent"
    | "iso-a3xsynchro-transparent"
    | "iso-a3xsynchro-white"
    | "iso-a4-colored"
    | "iso-a4-translucent"
    | "iso-a4-transparent"
    | "iso-a4-white"
    | "iso-a4x3-translucent"
    | "iso-a4x3-transparent"
    | "iso-a4x3-white"
    | "iso-a4x4-translucent"
    | "iso-a4x4-transparent"
    | "iso-a4x4-white"
    | "iso-a4x5-translucent"
    | "iso-a4x5-transparent"
    | "iso-a4x5-white"
    | "iso-a4x6-translucent"
    | "iso-a4x6-transparent"
    | "iso-a4x6-white"
    | "iso-a4x7-translucent"
    | "iso-a4x7-transparent"
    | "iso-a4x7-white"
    | "iso-a4x8-translucent"
    | "iso-a4x8-transparent"
    | "iso-a4x8-white"
    | "iso-a4x9-translucent"
    | "iso-a4x9-transparent"
    | "iso-a4x9-white"
    | "iso-a4xsynchro-translucent"
    | "iso-a4xsynchro-transparent"
    | "iso-a4xsynchro-white"
    | "iso-a5-colored"
    | "iso-a5-translucent"
    | "iso-a5-transparent"
    | "iso-a5-white"
    | "iso-a6-white"
    | "iso-a7-white"
    | "iso-a8-white"
    | "iso-a9-white"
    | "iso-a10-white"
    | "iso-b0-white"
    | "iso-b1-white"
    | "iso-b2-white"
    | "iso-b3-white"
    | "iso-b4-colored"
    | "iso-b4-white"
    | "iso-b5-colored"
    | "iso-b5-white"
    | "iso-b6-white"
    | "iso-b7-white"
    | "iso-b8-white"
    | "iso-b9-white"
    | "iso-b10-white"
    | "jis-b0-translucent"
    | "jis-b0-transparent"
    | "jis-b0-white"
    | "jis-b1-translucent"
    | "jis-b1-transparent"
    | "jis-b1-white"
    | "jis-b2-translucent"
    | "jis-b2-transparent"
    | "jis-b2-white"
    | "jis-b3-translucent"
    | "jis-b3-transparent"
    | "jis-b3-white"
    | "jis-b4-colored"
    | "jis-b4-translucent"
    | "jis-b4-transparent"
    | "jis-b4-white"
    | "jis-b5-colored"
    | "jis-b5-translucent"
    | "jis-b5-transparent"
    | "jis-b5-white"
    | "jis-b6-white"
    | "jis-b7-white"
    | "jis-b8-white"
    | "jis-b9-white"
    | "jis-b10-white"
    | "ledger-white"
    | "na-legal-colored"
    | "na-legal-white"
    | "na-letter-colored"
    | "na-letter-transparent"
    | "na-letter-white"
    | "quarto-white";

  type MediaEnvelopeName =
    | "iso-b4-envelope"
    | "iso-b5-envelope"
    | "iso-c3-envelope"
    | "iso-c4-envelope"
    | "iso-c5-envelope"
    | "iso-c6-envelope"
    | "iso-designated-long-envelope"
    | "monarch-envelope"
    | "na-6x9-envelope"
    | "na-7x9-envelope"
    | "na-9x11-envelope"
    | "na-9x12-envelope"
    | "na-10x13-envelope"
    | "na-10x14-envelope"
    | "na-10x15-envelope"
    | "na-number-9-envelope"
    | "na-number-10-envelope";

  type MediaIntputTray = "bottom" | "envelope" | "large-capacity" | "main" | "manual" | "middle" | "side" | "top";

  type Media = MediaName | MediaSizeName | MediaIntputTray | MediaEnvelopeName;

  type MediaSource =
    | "alternate"
    | "alternate-roll"
    | "auto"
    | "bottom"
    | "by-pass-tray"
    | "center"
    | "disc"
    | "envelope"
    | "hagaki"
    | "large-capacity"
    | "left"
    | "main"
    | "main-roll"
    | "manual"
    | "middle"
    | "photo"
    | "rear"
    | "right"
    | "roll-1"
    | "roll-2"
    | "roll-3"
    | "roll-4"
    | "roll-5"
    | "roll-6"
    | "roll-7"
    | "roll-8"
    | "roll-9"
    | "roll-10"
    | "side"
    | "top"
    | "tray-1"
    | "tray-2"
    | "tray-3"
    | "tray-4"
    | "tray-5"
    | "tray-6"
    | "tray-7"
    | "tray-8"
    | "tray-9"
    | "tray-10"
    | "tray-11"
    | "tray-12"
    | "tray-13"
    | "tray-14"
    | "tray-15"
    | "tray-16"
    | "tray-17"
    | "tray-18"
    | "tray-19"
    | "tray-20";

  type MediaTooth = "antique" | "calendared" | "coarse" | "fine" | "linen" | "medium" | "smooth" | "stipple" | "uncalendared" | "vellum";

  type MediaType =
    | "aluminum"
    | "auto"
    | "back-print-film"
    | "cardboard"
    | "cardstock"
    | "cd"
    | "continuous"
    | "continuous-long"
    | "continuous-short"
    | "corrugated-board"
    | "disc"
    | "disc-glossy"
    | "disc-high-gloss"
    | "disc-matte"
    | "disc-satin"
    | "disc-semi-gloss"
    | "double-wall"
    | "dry-film"
    | "dvd"
    | "embossing-foil"
    | "end-board"
    | "envelope"
    | "envelope-archival"
    | "envelope-bond"
    | "envelope-coated"
    | "envelope-cotton"
    | "envelope-fine"
    | "envelope-heavyweight"
    | "envelope-inkjet"
    | "envelope-lightweight"
    | "envelope-plain"
    | "envelope-preprinted"
    | "envelope-window"
    | "fabric"
    | "fabric-archival"
    | "fabric-glossy"
    | "fabric-high-gloss"
    | "fabric-matte"
    | "fabric-semi-gloss"
    | "fabric-waterproof"
    | "film"
    | "flexo-base"
    | "flexo-photo-polymer"
    | "flute"
    | "foil"
    | "full-cut-tabs"
    | "glass"
    | "glass-colored"
    | "glass-opaque"
    | "glass-surfaced"
    | "glass-textured"
    | "gravure-cylinder"
    | "image-setter-paper"
    | "imaging-cylinder"
    | "labels"
    | "labels-colored"
    | "labels-glossy"
    | "labels-high-gloss"
    | "labels-inkjet"
    | "labels-matte"
    | "labels-permanent"
    | "labels-satin"
    | "labels-security"
    | "labels-semi-gloss"
    | "laminating-foil"
    | "letterhead"
    | "metal"
    | "metal-glossy"
    | "metal-high-gloss"
    | "metal-matte"
    | "metal-satin"
    | "metal-semi-gloss"
    | "mounting-tape"
    | "multi-layer"
    | "multi-part-form"
    | "other"
    | "paper"
    | "photographic"
    | "photographic-archival"
    | "photographic-film"
    | "photographic-glossy"
    | "photographic-high-gloss"
    | "photographic-matte"
    | "photographic-satin"
    | "photographic-semi-gloss"
    | "plastic"
    | "plastic-archival"
    | "plastic-colored"
    | "plastic-glossy"
    | "plastic-high-gloss"
    | "plastic-matte"
    | "plastic-satin"
    | "plastic-semi-gloss"
    | "plate"
    | "polyester"
    | "pre-cut-tabs"
    | "roll"
    | "screen"
    | "screen-paged"
    | "self-adhesive"
    | "self-adhesive-film"
    | "shrink-foil"
    | "single-face"
    | "single-wall"
    | "sleeve"
    | "stationery"
    | "stationery-archival"
    | "stationery-coated"
    | "stationery-cotton"
    | "stationery-fine"
    | "stationery-heavyweight"
    | "stationery-heavyweight-coated"
    | "stationery-inkjet"
    | "stationery-letterhead"
    | "stationery-lightweight"
    | "stationery-preprinted"
    | "stationery-prepunched"
    | "tab-stock"
    | "tractor"
    | "transfer"
    | "transparency"
    | "triple-wall"
    | "wet-film";

  type MultipleDocumentHandling =
    | "separate-documents-collated-copies"
    | "separate-documents-uncollated-copies"
    | "single-document"
    | "single-document-new-sheet";

  type NotifyEvents =
    | "job-completed"
    | "job-config-changed"
    | "job-created"
    | "job-progress"
    | "job-state-changed"
    | "job-stopped"
    | "none"
    | "printer-config-changed"
    | "printer-finishings-changed"
    | "printer-media-changed"
    | "printer-queue-order-changed"
    | "printer-restarted"
    | "printer-shutdown"
    | "printer-state-changed"
    | "printer-stopped";

  type OutputBin =
    | "bottom"
    | "center"
    | "face-down"
    | "face-up"
    | "large-capacity"
    | "left"
    | "mailbox-1"
    | "mailbox-2"
    | "mailbox-3"
    | "mailbox-4"
    | "mailbox-5"
    | "mailbox-6"
    | "mailbox-7"
    | "mailbox-8"
    | "mailbox-9"
    | "mailbox-10"
    | "middle"
    | "my-mailbox"
    | "rear"
    | "right"
    | "side"
    | "stacker-1"
    | "stacker-2"
    | "stacker-3"
    | "stacker-4"
    | "stacker-5"
    | "stacker-6"
    | "stacker-7"
    | "stacker-8"
    | "stacker-9"
    | "stacker-10"
    | "top"
    | "tray-1"
    | "tray-2"
    | "tray-3"
    | "tray-4"
    | "tray-5"
    | "tray-6"
    | "tray-7"
    | "tray-8"
    | "tray-9"
    | "tray-10";

  type PageDelivery =
    | "reverse-order-face-down"
    | "reverse-order-face-up"
    | "same-order-face-down"
    | "same-order-face-up"
    | "system-specified";

  type PageOrder = "1-to-n-order" | "n-to-1-order";

  type PresentationDirectionNumberUp =
    | "tobottom-toleft"
    | "tobottom-toright"
    | "toleft-tobottom"
    | "toleft-totop"
    | "toright-tobottom"
    | "toright-totop"
    | "totop-toleft"
    | "totop-toright";

  type PrintColorMode =
    | "auto"
    | "auto-monochrome"
    | "bi-level"
    | "color"
    | "highlight"
    | "monochrome"
    | "process-bi-level"
    | "process-monochrome";

  type PrintContentOptimize = "auto" | "graphic" | "photo" | "text" | "text-and-graphic";

  type PrintRenderingIntent = "absolute" | "auto" | "perceptual" | "relative" | "relative-bpc" | "saturation";

  type PrinterStateReasons =
    | "alert-removal-of-binary-change-entry"
    | "bander-added"
    | "bander-almost-empty"
    | "bander-almost-full"
    | "bander-at-limit"
    | "bander-closed"
    | "bander-configuration-change"
    | "bander-cover-closed"
    | "bander-cover-open"
    | "bander-empty"
    | "bander-full"
    | "bander-interlock-closed"
    | "bander-interlock-open"
    | "bander-jam"
    | "bander-life-almost-over"
    | "bander-life-over"
    | "bander-memory-exhausted"
    | "bander-missing"
    | "bander-motor-failure"
    | "bander-near-limit"
    | "bander-offline"
    | "bander-opened"
    | "bander-over-temperature"
    | "bander-power-saver"
    | "bander-recoverable-failure"
    | "bander-recoverable-storage-error"
    | "bander-removed"
    | "bander-resource-added"
    | "bander-resource-removed"
    | "bander-thermistor-failure"
    | "bander-timing-failure"
    | "bander-turned-off"
    | "bander-turned-on"
    | "bander-under-temperature"
    | "bander-unrecoverable-failure"
    | "bander-unrecoverable-storage-error"
    | "bander-warming-up"
    | "binder-added"
    | "binder-almost-empty"
    | "binder-almost-full"
    | "binder-at-limit"
    | "binder-closed"
    | "binder-configuration-change"
    | "binder-cover-closed"
    | "binder-cover-open"
    | "binder-empty"
    | "binder-full"
    | "binder-interlock-closed"
    | "binder-interlock-open"
    | "binder-jam"
    | "binder-life-almost-over"
    | "binder-life-over"
    | "binder-memory-exhausted"
    | "binder-missing"
    | "binder-motor-failure"
    | "binder-near-limit"
    | "binder-offline"
    | "binder-opened"
    | "binder-over-temperature"
    | "binder-power-saver"
    | "binder-recoverable-failure"
    | "binder-recoverable-storage-error"
    | "binder-removed"
    | "binder-resource-added"
    | "binder-resource-removed"
    | "binder-thermistor-failure"
    | "binder-timing-failure"
    | "binder-turned-off"
    | "binder-turned-on"
    | "binder-under-temperature"
    | "binder-unrecoverable-failure"
    | "binder-unrecoverable-storage-error"
    | "binder-warming-up"
    | "cleaner-life-almost-over"
    | "cleaner-life-over"
    | "configuration-change"
    | "connecting-to-device"
    | "cover-open"
    | "deactivated"
    | "developer-empty"
    | "developer-low"
    | "die-cutter-added"
    | "die-cutter-almost-empty"
    | "die-cutter-almost-full"
    | "die-cutter-at-limit"
    | "die-cutter-closed"
    | "die-cutter-configuration-change"
    | "die-cutter-cover-closed"
    | "die-cutter-cover-open"
    | "die-cutter-empty"
    | "die-cutter-full"
    | "die-cutter-interlock-closed"
    | "die-cutter-interlock-open"
    | "die-cutter-jam"
    | "die-cutter-life-almost-over"
    | "die-cutter-life-over"
    | "die-cutter-memory-exhausted"
    | "die-cutter-missing"
    | "die-cutter-motor-failure"
    | "die-cutter-near-limit"
    | "die-cutter-offline"
    | "die-cutter-opened"
    | "die-cutter-over-temperature"
    | "die-cutter-power-saver"
    | "die-cutter-recoverable-failure"
    | "die-cutter-recoverable-storage-error"
    | "die-cutter-removed"
    | "die-cutter-resource-added"
    | "die-cutter-resource-removed"
    | "die-cutter-thermistor-failure"
    | "die-cutter-timing-failure"
    | "die-cutter-turned-off"
    | "die-cutter-turned-on"
    | "die-cutter-under-temperature"
    | "die-cutter-unrecoverable-failure"
    | "die-cutter-unrecoverable-storage-error"
    | "die-cutter-warming-up"
    | "door-open"
    | "folder-added"
    | "folder-almost-empty"
    | "folder-almost-full"
    | "folder-at-limit"
    | "folder-closed"
    | "folder-configuration-change"
    | "folder-cover-closed"
    | "folder-cover-open"
    | "folder-empty"
    | "folder-full"
    | "folder-interlock-closed"
    | "folder-interlock-open"
    | "folder-jam"
    | "folder-life-almost-over"
    | "folder-life-over"
    | "folder-memory-exhausted"
    | "folder-missing"
    | "folder-motor-failure"
    | "folder-near-limit"
    | "folder-offline"
    | "folder-opened"
    | "folder-over-temperature"
    | "folder-power-saver"
    | "folder-recoverable-failure"
    | "folder-recoverable-storage-error"
    | "folder-removed"
    | "folder-resource-added"
    | "folder-resource-removed"
    | "folder-thermistor-failure"
    | "folder-timing-failure"
    | "folder-turned-off"
    | "folder-turned-on"
    | "folder-under-temperature"
    | "folder-unrecoverable-failure"
    | "folder-unrecoverable-storage-error"
    | "folder-warming-up"
    | "fuser-over-temp"
    | "fuser-under-temp"
    | "imprinter-added"
    | "imprinter-almost-empty"
    | "imprinter-almost-full"
    | "imprinter-at-limit"
    | "imprinter-closed"
    | "imprinter-configuration-change"
    | "imprinter-cover-closed"
    | "imprinter-cover-open"
    | "imprinter-empty"
    | "imprinter-full"
    | "imprinter-interlock-closed"
    | "imprinter-interlock-open"
    | "imprinter-jam"
    | "imprinter-life-almost-over"
    | "imprinter-life-over"
    | "imprinter-memory-exhausted"
    | "imprinter-missing"
    | "imprinter-motor-failure"
    | "imprinter-near-limit"
    | "imprinter-offline"
    | "imprinter-opened"
    | "imprinter-over-temperature"
    | "imprinter-power-saver"
    | "imprinter-recoverable-failure"
    | "imprinter-recoverable-storage-error"
    | "imprinter-removed"
    | "imprinter-resource-added"
    | "imprinter-resource-removed"
    | "imprinter-thermistor-failure"
    | "imprinter-timing-failure"
    | "imprinter-turned-off"
    | "imprinter-turned-on"
    | "imprinter-under-temperature"
    | "imprinter-unrecoverable-failure"
    | "imprinter-unrecoverable-storage-error"
    | "imprinter-warming-up"
    | "input-cannot-feed-size-selected"
    | "input-manual-input-request"
    | "input-media-color-change"
    | "input-media-form-parts-change"
    | "input-media-size-change"
    | "input-media-type-change"
    | "input-media-weight-change"
    | "input-tray-elevation-failure"
    | "input-tray-missing"
    | "input-tray-position-failure"
    | "inserter-added"
    | "inserter-almost-empty"
    | "inserter-almost-full"
    | "inserter-at-limit"
    | "inserter-closed"
    | "inserter-configuration-change"
    | "inserter-cover-closed"
    | "inserter-cover-open"
    | "inserter-empty"
    | "inserter-full"
    | "inserter-interlock-closed"
    | "inserter-interlock-open"
    | "inserter-jam"
    | "inserter-life-almost-over"
    | "inserter-life-over"
    | "inserter-memory-exhausted"
    | "inserter-missing"
    | "inserter-motor-failure"
    | "inserter-near-limit"
    | "inserter-offline"
    | "inserter-opened"
    | "inserter-over-temperature"
    | "inserter-power-saver"
    | "inserter-recoverable-failure"
    | "inserter-recoverable-storage-error"
    | "inserter-removed"
    | "inserter-resource-added"
    | "inserter-resource-removed"
    | "inserter-thermistor-failure"
    | "inserter-timing-failure"
    | "inserter-turned-off"
    | "inserter-turned-on"
    | "inserter-under-temperature"
    | "inserter-unrecoverable-failure"
    | "inserter-unrecoverable-storage-error"
    | "inserter-warming-up"
    | "interlock-closed"
    | "interlock-open"
    | "interpreter-cartridge-added"
    | "interpreter-cartridge-deleted"
    | "interpreter-complex-page-encountered"
    | "interpreter-memory-decrease"
    | "interpreter-memory-increase"
    | "interpreter-resource-added"
    | "interpreter-resource-deleted"
    | "interpreter-resource-unavailable"
    | "make-envelope-added"
    | "make-envelope-almost-empty"
    | "make-envelope-almost-full"
    | "make-envelope-at-limit"
    | "make-envelope-closed"
    | "make-envelope-configuration-change"
    | "make-envelope-cover-closed"
    | "make-envelope-cover-open"
    | "make-envelope-empty"
    | "make-envelope-full"
    | "make-envelope-interlock-closed"
    | "make-envelope-interlock-open"
    | "make-envelope-jam"
    | "make-envelope-life-almost-over"
    | "make-envelope-life-over"
    | "make-envelope-memory-exhausted"
    | "make-envelope-missing"
    | "make-envelope-motor-failure"
    | "make-envelope-near-limit"
    | "make-envelope-offline"
    | "make-envelope-opened"
    | "make-envelope-over-temperature"
    | "make-envelope-power-saver"
    | "make-envelope-recoverable-failure"
    | "make-envelope-recoverable-storage-error"
    | "make-envelope-removed"
    | "make-envelope-resource-added"
    | "make-envelope-resource-removed"
    | "make-envelope-thermistor-failure"
    | "make-envelope-timing-failure"
    | "make-envelope-turned-off"
    | "make-envelope-turned-on"
    | "make-envelope-under-temperature"
    | "make-envelope-unrecoverable-failure"
    | "make-envelope-unrecoverable-storage-error"
    | "make-envelope-warming-up"
    | "marker-adjusting-print-quality"
    | "marker-developer-almost-empty"
    | "marker-developer-empty"
    | "marker-fuser-thermistor-failure"
    | "marker-fuser-timing-failure"
    | "marker-ink-almost-empty"
    | "marker-ink-empty"
    | "marker-print-ribbon-almost-empty"
    | "marker-print-ribbon-empty"
    | "marker-supply-empty"
    | "marker-supply-low"
    | "marker-toner-cartridge-missing"
    | "marker-waste-almost-full"
    | "marker-waste-full"
    | "marker-waste-ink-receptacle-almost-full"
    | "marker-waste-ink-receptacle-full"
    | "marker-waste-toner-receptacle-almost-full"
    | "marker-waste-toner-receptacle-full"
    | "media-empty"
    | "media-jam"
    | "media-low"
    | "media-needed"
    | "media-path-cannot-duplex-media-selected"
    | "media-path-media-tray-almost-full"
    | "media-path-media-tray-full"
    | "media-path-media-tray-missing"
    | "moving-to-paused"
    | "none"
    | "opc-life-over"
    | "opc-near-eol"
    | "other"
    | "output-area-almost-full"
    | "output-area-full"
    | "output-mailbox-select-failure"
    | "output-tray-missing"
    | "paused"
    | "perforater-added"
    | "perforater-almost-empty"
    | "perforater-almost-full"
    | "perforater-at-limit"
    | "perforater-closed"
    | "perforater-configuration-change"
    | "perforater-cover-closed"
    | "perforater-cover-open"
    | "perforater-empty"
    | "perforater-full"
    | "perforater-interlock-closed"
    | "perforater-interlock-open"
    | "perforater-jam"
    | "perforater-life-almost-over"
    | "perforater-life-over"
    | "perforater-memory-exhausted"
    | "perforater-missing"
    | "perforater-motor-failure"
    | "perforater-near-limit"
    | "perforater-offline"
    | "perforater-opened"
    | "perforater-over-temperature"
    | "perforater-power-saver"
    | "perforater-recoverable-failure"
    | "perforater-recoverable-storage-error"
    | "perforater-removed"
    | "perforater-resource-added"
    | "perforater-resource-removed"
    | "perforater-thermistor-failure"
    | "perforater-timing-failure"
    | "perforater-turned-off"
    | "perforater-turned-on"
    | "perforater-under-temperature"
    | "perforater-unrecoverable-failure"
    | "perforater-unrecoverable-storage-error"
    | "perforater-warming-up"
    | "power-down"
    | "power-up"
    | "printer-manual-reset"
    | "printer-nms-reset"
    | "printer-ready-to-print"
    | "puncher-added"
    | "puncher-almost-empty"
    | "puncher-almost-full"
    | "puncher-at-limit"
    | "puncher-closed"
    | "puncher-configuration-change"
    | "puncher-cover-closed"
    | "puncher-cover-open"
    | "puncher-empty"
    | "puncher-full"
    | "puncher-interlock-closed"
    | "puncher-interlock-open"
    | "puncher-jam"
    | "puncher-life-almost-over"
    | "puncher-life-over"
    | "puncher-memory-exhausted"
    | "puncher-missing"
    | "puncher-motor-failure"
    | "puncher-near-limit"
    | "puncher-offline"
    | "puncher-opened"
    | "puncher-over-temperature"
    | "puncher-power-saver"
    | "puncher-recoverable-failure"
    | "puncher-recoverable-storage-error"
    | "puncher-removed"
    | "puncher-resource-added"
    | "puncher-resource-removed"
    | "puncher-thermistor-failure"
    | "puncher-timing-failure"
    | "puncher-turned-off"
    | "puncher-turned-on"
    | "puncher-under-temperature"
    | "puncher-unrecoverable-failure"
    | "puncher-unrecoverable-storage-error"
    | "puncher-warming-up"
    | "separation-cutter-added"
    | "separation-cutter-almost-empty"
    | "separation-cutter-almost-full"
    | "separation-cutter-at-limit"
    | "separation-cutter-closed"
    | "separation-cutter-configuration-change"
    | "separation-cutter-cover-closed"
    | "separation-cutter-cover-open"
    | "separation-cutter-empty"
    | "separation-cutter-full"
    | "separation-cutter-interlock-closed"
    | "separation-cutter-interlock-open"
    | "separation-cutter-jam"
    | "separation-cutter-life-almost-over"
    | "separation-cutter-life-over"
    | "separation-cutter-memory-exhausted"
    | "separation-cutter-missing"
    | "separation-cutter-motor-failure"
    | "separation-cutter-near-limit"
    | "separation-cutter-offline"
    | "separation-cutter-opened"
    | "separation-cutter-over-temperature"
    | "separation-cutter-power-saver"
    | "separation-cutter-recoverable-failure"
    | "separation-cutter-recoverable-storage-error"
    | "separation-cutter-removed"
    | "separation-cutter-resource-added"
    | "separation-cutter-resource-removed"
    | "separation-cutter-thermistor-failure"
    | "separation-cutter-timing-failure"
    | "separation-cutter-turned-off"
    | "separation-cutter-turned-on"
    | "separation-cutter-under-temperature"
    | "separation-cutter-unrecoverable-failure"
    | "separation-cutter-unrecoverable-storage-error"
    | "separation-cutter-warming-up"
    | "sheet-rotator-added"
    | "sheet-rotator-almost-empty"
    | "sheet-rotator-almost-full"
    | "sheet-rotator-at-limit"
    | "sheet-rotator-closed"
    | "sheet-rotator-configuration-change"
    | "sheet-rotator-cover-closed"
    | "sheet-rotator-cover-open"
    | "sheet-rotator-empty"
    | "sheet-rotator-full"
    | "sheet-rotator-interlock-closed"
    | "sheet-rotator-interlock-open"
    | "sheet-rotator-jam"
    | "sheet-rotator-life-almost-over"
    | "sheet-rotator-life-over"
    | "sheet-rotator-memory-exhausted"
    | "sheet-rotator-missing"
    | "sheet-rotator-motor-failure"
    | "sheet-rotator-near-limit"
    | "sheet-rotator-offline"
    | "sheet-rotator-opened"
    | "sheet-rotator-over-temperature"
    | "sheet-rotator-power-saver"
    | "sheet-rotator-recoverable-failure"
    | "sheet-rotator-recoverable-storage-error"
    | "sheet-rotator-removed"
    | "sheet-rotator-resource-added"
    | "sheet-rotator-resource-removed"
    | "sheet-rotator-thermistor-failure"
    | "sheet-rotator-timing-failure"
    | "sheet-rotator-turned-off"
    | "sheet-rotator-turned-on"
    | "sheet-rotator-under-temperature"
    | "sheet-rotator-unrecoverable-failure"
    | "sheet-rotator-unrecoverable-storage-error"
    | "sheet-rotator-warming-up"
    | "shutdown"
    | "slitter-added"
    | "slitter-almost-empty"
    | "slitter-almost-full"
    | "slitter-at-limit"
    | "slitter-closed"
    | "slitter-configuration-change"
    | "slitter-cover-closed"
    | "slitter-cover-open"
    | "slitter-empty"
    | "slitter-full"
    | "slitter-interlock-closed"
    | "slitter-interlock-open"
    | "slitter-jam"
    | "slitter-life-almost-over"
    | "slitter-life-over"
    | "slitter-memory-exhausted"
    | "slitter-missing"
    | "slitter-motor-failure"
    | "slitter-near-limit"
    | "slitter-offline"
    | "slitter-opened"
    | "slitter-over-temperature"
    | "slitter-power-saver"
    | "slitter-recoverable-failure"
    | "slitter-recoverable-storage-error"
    | "slitter-removed"
    | "slitter-resource-added"
    | "slitter-resource-removed"
    | "slitter-thermistor-failure"
    | "slitter-timing-failure"
    | "slitter-turned-off"
    | "slitter-turned-on"
    | "slitter-under-temperature"
    | "slitter-unrecoverable-failure"
    | "slitter-unrecoverable-storage-error"
    | "slitter-warming-up"
    | "spool-area-full"
    | "stacker-added"
    | "stacker-almost-empty"
    | "stacker-almost-full"
    | "stacker-at-limit"
    | "stacker-closed"
    | "stacker-configuration-change"
    | "stacker-cover-closed"
    | "stacker-cover-open"
    | "stacker-empty"
    | "stacker-full"
    | "stacker-interlock-closed"
    | "stacker-interlock-open"
    | "stacker-jam"
    | "stacker-life-almost-over"
    | "stacker-life-over"
    | "stacker-memory-exhausted"
    | "stacker-missing"
    | "stacker-motor-failure"
    | "stacker-near-limit"
    | "stacker-offline"
    | "stacker-opened"
    | "stacker-over-temperature"
    | "stacker-power-saver"
    | "stacker-recoverable-failure"
    | "stacker-recoverable-storage-error"
    | "stacker-removed"
    | "stacker-resource-added"
    | "stacker-resource-removed"
    | "stacker-thermistor-failure"
    | "stacker-timing-failure"
    | "stacker-turned-off"
    | "stacker-turned-on"
    | "stacker-under-temperature"
    | "stacker-unrecoverable-failure"
    | "stacker-unrecoverable-storage-error"
    | "stacker-warming-up"
    | "stapler-added"
    | "stapler-almost-empty"
    | "stapler-almost-full"
    | "stapler-at-limit"
    | "stapler-closed"
    | "stapler-configuration-change"
    | "stapler-cover-closed"
    | "stapler-cover-open"
    | "stapler-empty"
    | "stapler-full"
    | "stapler-interlock-closed"
    | "stapler-interlock-open"
    | "stapler-jam"
    | "stapler-life-almost-over"
    | "stapler-life-over"
    | "stapler-memory-exhausted"
    | "stapler-missing"
    | "stapler-motor-failure"
    | "stapler-near-limit"
    | "stapler-offline"
    | "stapler-opened"
    | "stapler-over-temperature"
    | "stapler-power-saver"
    | "stapler-recoverable-failure"
    | "stapler-recoverable-storage-error"
    | "stapler-removed"
    | "stapler-resource-added"
    | "stapler-resource-removed"
    | "stapler-thermistor-failure"
    | "stapler-timing-failure"
    | "stapler-turned-off"
    | "stapler-turned-on"
    | "stapler-under-temperature"
    | "stapler-unrecoverable-failure"
    | "stapler-unrecoverable-storage-error"
    | "stapler-warming-up"
    | "stitcher-added"
    | "stitcher-almost-empty"
    | "stitcher-almost-full"
    | "stitcher-at-limit"
    | "stitcher-closed"
    | "stitcher-configuration-change"
    | "stitcher-cover-closed"
    | "stitcher-cover-open"
    | "stitcher-empty"
    | "stitcher-full"
    | "stitcher-interlock-closed"
    | "stitcher-interlock-open"
    | "stitcher-jam"
    | "stitcher-life-almost-over"
    | "stitcher-life-over"
    | "stitcher-memory-exhausted"
    | "stitcher-missing"
    | "stitcher-motor-failure"
    | "stitcher-near-limit"
    | "stitcher-offline"
    | "stitcher-opened"
    | "stitcher-over-temperature"
    | "stitcher-power-saver"
    | "stitcher-recoverable-failure"
    | "stitcher-recoverable-storage-error"
    | "stitcher-removed"
    | "stitcher-resource-added"
    | "stitcher-resource-removed"
    | "stitcher-thermistor-failure"
    | "stitcher-timing-failure"
    | "stitcher-turned-off"
    | "stitcher-turned-on"
    | "stitcher-under-temperature"
    | "stitcher-unrecoverable-failure"
    | "stitcher-unrecoverable-storage-error"
    | "stitcher-warming-up"
    | "stopped-partly"
    | "stopping"
    | "subunit-added"
    | "subunit-almost-empty"
    | "subunit-almost-full"
    | "subunit-at-limit"
    | "subunit-closed"
    | "subunit-empty"
    | "subunit-full"
    | "subunit-life-almost-over"
    | "subunit-life-over"
    | "subunit-memory-exhausted"
    | "subunit-missing"
    | "subunit-motor-failure"
    | "subunit-near-limit"
    | "subunit-offline"
    | "subunit-opened"
    | "subunit-over-temperature"
    | "subunit-power-saver"
    | "subunit-recoverable-failure"
    | "subunit-recoverable-storage-error"
    | "subunit-removed"
    | "subunit-resource-added"
    | "subunit-resource-removed"
    | "subunit-thermistor-failure"
    | "subunit-timing-Failure"
    | "subunit-turned-off"
    | "subunit-turned-on"
    | "subunit-under-temperature"
    | "subunit-unrecoverable-failure"
    | "subunit-unrecoverable-storage-error"
    | "subunit-warming-up"
    | "timed-out"
    | "toner-empty"
    | "toner-low"
    | "trimmer-added"
    | "trimmer-almost-empty"
    | "trimmer-almost-full"
    | "trimmer-at-limit"
    | "trimmer-closed"
    | "trimmer-configuration-change"
    | "trimmer-cover-closed"
    | "trimmer-cover-open"
    | "trimmer-empty"
    | "trimmer-full"
    | "trimmer-interlock-closed"
    | "trimmer-interlock-open"
    | "trimmer-jam"
    | "trimmer-life-almost-over"
    | "trimmer-life-over"
    | "trimmer-memory-exhausted"
    | "trimmer-missing"
    | "trimmer-motor-failure"
    | "trimmer-near-limit"
    | "trimmer-offline"
    | "trimmer-opened"
    | "trimmer-over-temperature"
    | "trimmer-power-saver"
    | "trimmer-recoverable-failure"
    | "trimmer-recoverable-storage-error"
    | "trimmer-removed"
    | "trimmer-resource-added"
    | "trimmer-resource-removed"
    | "trimmer-thermistor-failure"
    | "trimmer-timing-failure"
    | "trimmer-turned-off"
    | "trimmer-turned-on"
    | "trimmer-under-temperature"
    | "trimmer-unrecoverable-failure"
    | "trimmer-unrecoverable-storage-error"
    | "trimmer-warming-up"
    | "unknown"
    | "wrapper-added"
    | "wrapper-almost-empty"
    | "wrapper-almost-full"
    | "wrapper-at-limit"
    | "wrapper-closed"
    | "wrapper-configuration-change"
    | "wrapper-cover-closed"
    | "wrapper-cover-open"
    | "wrapper-empty"
    | "wrapper-full"
    | "wrapper-interlock-closed"
    | "wrapper-interlock-open"
    | "wrapper-jam"
    | "wrapper-life-almost-over"
    | "wrapper-life-over"
    | "wrapper-memory-exhausted"
    | "wrapper-missing"
    | "wrapper-motor-failure"
    | "wrapper-near-limit"
    | "wrapper-offline"
    | "wrapper-opened"
    | "wrapper-over-temperature"
    | "wrapper-power-saver"
    | "wrapper-recoverable-failure"
    | "wrapper-recoverable-storage-error"
    | "wrapper-removed"
    | "wrapper-resource-added"
    | "wrapper-resource-removed"
    | "wrapper-thermistor-failure"
    | "wrapper-timing-failure"
    | "wrapper-turned-off"
    | "wrapper-turned-on"
    | "wrapper-under-temperature"
    | "wrapper-unrecoverable-failure"
    | "wrapper-unrecoverable-storage-error"
    | "wrapper-warming-up";

  type PwgRasterDocumentTypeSupported =
    | "adobe-rgb_8"
    | "adobe-rgb_16"
    | "black_1"
    | "black_8"
    | "black_16"
    | "cmyk_8"
    | "cmyk_16"
    | "device1_8"
    | "device1_16"
    | "device2_8"
    | "device2_16"
    | "device3_8"
    | "device3_16"
    | "device4_8"
    | "device4_16"
    | "device5_8"
    | "device5_16"
    | "device6_8"
    | "device6_16"
    | "device7_8"
    | "device7_16"
    | "device8_8"
    | "device8_16"
    | "device9_8"
    | "device9_16"
    | "device10_8"
    | "device10_16"
    | "device11_8"
    | "device11_16"
    | "device12_8"
    | "device12_16"
    | "device13_8"
    | "device13_16"
    | "device14_8"
    | "device14_16"
    | "device15_8"
    | "device15_16"
    | "rgb_8"
    | "rgb_16"
    | "sgray_1"
    | "sgray_8"
    | "sgray_16"
    | "srgb_8"
    | "srgb_16";

  type PrintQuality = "draft" | "normal" | "high";

  type RequestedPrinterAttributeGroups = "all" | "job-template" | "printer-description";

  type RequestedJobAttributeGroups = "all" | "job-description" | "job-template";

  type SaveDisposition = "none" | "print-save" | "save-only";

  type SeparatorSheetsType = "both-sheets" | "end-sheet" | "none" | "slip-sheets" | "start-sheet";

  type Sides = "one-sided" | "two-sided-long-edge" | "two-sided-short-edge";

  type WhichJobs =
    | "aborted"
    | "all"
    | "canceled"
    | "completed"
    | "not-completed"
    | "pending"
    | "pending-held"
    | "processing"
    | "processing-stopped"
    | "proof-print"
    | "saved";

  type XImagePosition = "center" | "left" | "none" | "right";

  type YImagePosition = "bottom" | "center" | "none" | "top";

  type CharacterSet =
    | "ASMO-708"
    | "DOS-720"
    | "iso-8859-6"
    | "x-mac-arabic"
    | "windows-1256"
    | "ibm775"
    | "iso-8859-4"
    | "windows-1257"
    | "ibm852"
    | "iso-8859-2"
    | "x-mac-ce"
    | "windows-1250"
    | "EUC-CN"
    | "gb2312"
    | "hz-gb-2312"
    | "x-mac-chinesesimp"
    | "big5"
    | "x-Chinese-CNS"
    | "x-Chinese-Eten"
    | "cp866"
    | "iso-8859-5"
    | "koi8-r"
    | "koi8-u"
    | "x-mac-cyrillic"
    | "windows-1251"
    | "x-Europa"
    | "x-IA5-German"
    | "ibm737"
    | "iso-8859-7"
    | "x-mac-greek"
    | "ibm869"
    | "DOS-862"
    | "iso-8859-8-i"
    | "iso-8859-8"
    | "x-mac-hebrew"
    | "windows-1255"
    | "x-EBCDIC-Arabic"
    | "x-EBCDIC-CyrillicRussian"
    | "x-EBCDIC-CyrillicSerbianBulgarian"
    | "x-EBCDIC-DenmarkNorway"
    | "x-ebcdic-denmarknorway-euro"
    | "x-EBCDIC-FinlandSweden"
    | "x-ebcdic-finlandsweden-euro"
    | "x-ebcdic-france-euro"
    | "x-EBCDIC-Germany"
    | "x-ebcdic-germany-euro"
    | "x-EBCDIC-GreekModern"
    | "x-EBCDIC-Greek"
    | "x-EBCDIC-Hebrew"
    | "x-EBCDIC-Icelandic"
    | "x-ebcdic-icelandic-euro"
    | "x-ebcdic-international-euro"
    | "x-EBCDIC-Italy"
    | "x-ebcdic-italy-euro"
    | "x-EBCDIC-JapaneseAndKana"
    | "x-EBCDIC-JapaneseAndJapaneseLatin"
    | "x-EBCDIC-JapaneseAndUSCanada"
    | "x-EBCDIC-JapaneseKatakana"
    | "x-EBCDIC-KoreanAndKoreanExtended"
    | "x-EBCDIC-KoreanExtended"
    | "CP870"
    | "x-EBCDIC-SimplifiedChinese"
    | "X-EBCDIC-Spain"
    | "x-ebcdic-spain-euro"
    | "x-EBCDIC-Thai"
    | "x-EBCDIC-TraditionalChinese"
    | "CP1026"
    | "x-EBCDIC-Turkish"
    | "x-EBCDIC-UK"
    | "x-ebcdic-uk-euro"
    | "ebcdic-cp-us"
    | "x-ebcdic-cp-us-euro"
    | "ibm861"
    | "x-mac-icelandic"
    | "x-iscii-as"
    | "x-iscii-be"
    | "x-iscii-de"
    | "x-iscii-gu"
    | "x-iscii-ka"
    | "x-iscii-ma"
    | "x-iscii-or"
    | "x-iscii-pa"
    | "x-iscii-ta"
    | "x-iscii-te"
    | "x-euc-jp"
    | "iso-2022-jp"
    | "csISO2022JP"
    | "x-mac-japanese"
    | "shift_jis"
    | "ks_c_5601-1987"
    | "euc-kr"
    | "iso-2022-kr"
    | "Johab"
    | "x-mac-korean"
    | "iso-8859-3"
    | "iso-8859-15"
    | "x-IA5-Norwegian"
    | "IBM437"
    | "x-IA5-Swedish"
    | "windows-874"
    | "ibm857"
    | "iso-8859-9"
    | "x-mac-turkish"
    | "windows-1254"
    | "unicode"
    | "unicodeFFFE"
    | "utf-7"
    | "utf-8"
    | "us-ascii"
    | "windows-1258"
    | "ibm850"
    | "x-IA5"
    | "iso-8859-1"
    | "macintosh"
    | "Windows-1252 ";

  type UriSchemes =
    | "aaa"
    | "aaas"
    | "about"
    | "acap"
    | "acct"
    | "acd"
    | "acr"
    | "adiumxtra"
    | "adt"
    | "afp"
    | "afs"
    | "aim"
    | "amss"
    | "android"
    | "appdata"
    | "apt"
    | "ark"
    | "attachment"
    | "aw"
    | "barion"
    | "beshare"
    | "bitcoin"
    | "bitcoincash"
    | "blob"
    | "bolo"
    | "browserext"
    | "calculator"
    | "callto"
    | "cap"
    | "cast"
    | "casts"
    | "chrome"
    | "chrome-extension"
    | "cid"
    | "coap"
    | "coap+tcp"
    | "coap+ws"
    | "coaps"
    | "coaps+tcp"
    | "coaps+ws"
    | "com-eventbrite-attendee"
    | "content"
    | "conti"
    | "crid"
    | "cvs"
    | "dab"
    | "data"
    | "dav"
    | "diaspora"
    | "dict"
    | "did"
    | "dis"
    | "dlna-playcontainer"
    | "dlna-playsingle"
    | "dns"
    | "dntp"
    | "dpp"
    | "drm"
    | "drop"
    | "dtn"
    | "dvb"
    | "ed2k"
    | "elsi"
    | "example"
    | "facetime"
    | "fax"
    | "feed"
    | "feedready"
    | "file"
    | "filesystem"
    | "finger"
    | "first-run-pen-experience"
    | "fish"
    | "fm"
    | "ftp"
    | "fuchsia-pkg"
    | "geo"
    | "gg"
    | "git"
    | "gizmoproject"
    | "go"
    | "gopher"
    | "graph"
    | "gtalk"
    | "h323"
    | "ham"
    | "hcap"
    | "hcp"
    | "http"
    | "https"
    | "hxxp"
    | "hxxps"
    | "hydrazone"
    | "iax"
    | "icap"
    | "icon"
    | "im"
    | "imap"
    | "info"
    | "iotdisco"
    | "ipn"
    | "ipp"
    | "ipps"
    | "irc"
    | "irc6"
    | "ircs"
    | "iris"
    | "iris.beep"
    | "iris.lwz"
    | "iris.xpc"
    | "iris.xpcs"
    | "isostore"
    | "itms"
    | "jabber"
    | "jar"
    | "jms"
    | "keyparc"
    | "lastfm"
    | "ldap"
    | "ldaps"
    | "leaptofrogans"
    | "lorawan"
    | "lvlt"
    | "magnet"
    | "mailserver"
    | "mailto"
    | "maps"
    | "market"
    | "message"
    | "microsoft.windows.camera"
    | "microsoft.windows.camera.multipicker"
    | "microsoft.windows.camera.picker"
    | "mid"
    | "mms"
    | "modem"
    | "mongodb"
    | "moz"
    | "ms-access"
    | "ms-browser-extension"
    | "ms-calculator"
    | "ms-drive-to"
    | "ms-enrollment"
    | "ms-excel"
    | "ms-eyecontrolspeech"
    | "ms-gamebarservices"
    | "ms-gamingoverlay"
    | "ms-getoffice"
    | "ms-help"
    | "ms-infopath"
    | "ms-inputapp"
    | "ms-lockscreencomponent-config"
    | "ms-media-stream-id"
    | "ms-mixedrealitycapture"
    | "ms-mobileplans"
    | "ms-officeapp"
    | "ms-people"
    | "ms-project"
    | "ms-powerpoint"
    | "ms-publisher"
    | "ms-restoretabcompanion"
    | "ms-screenclip"
    | "ms-screensketch"
    | "ms-search"
    | "ms-search-repair"
    | "ms-secondary-screen-controller"
    | "ms-secondary-screen-setup"
    | "ms-settings"
    | "ms-settings-airplanemode"
    | "ms-settings-bluetooth"
    | "ms-settings-camera"
    | "ms-settings-cellular"
    | "ms-settings-cloudstorage"
    | "ms-settings-connectabledevices"
    | "ms-settings-displays-topology"
    | "ms-settings-emailandaccounts"
    | "ms-settings-language"
    | "ms-settings-location"
    | "ms-settings-lock"
    | "ms-settings-nfctransactions"
    | "ms-settings-notifications"
    | "ms-settings-power"
    | "ms-settings-privacy"
    | "ms-settings-proximity"
    | "ms-settings-screenrotation"
    | "ms-settings-wifi"
    | "ms-settings-workplace"
    | "ms-spd"
    | "ms-sttoverlay"
    | "ms-transit-to"
    | "ms-useractivityset"
    | "ms-virtualtouchpad"
    | "ms-visio"
    | "ms-walk-to"
    | "ms-whiteboard"
    | "ms-whiteboard-cmd"
    | "ms-word"
    | "msnim"
    | "msrp"
    | "msrps"
    | "mss"
    | "mtqp"
    | "mumble"
    | "mupdate"
    | "mvn"
    | "news"
    | "nfs"
    | "ni"
    | "nih"
    | "nntp"
    | "notes"
    | "ocf"
    | "oid"
    | "onenote"
    | "onenote-cmd"
    | "opaquelocktoken"
    | "openpgp4fpr"
    | "pack"
    | "palm"
    | "paparazzi"
    | "payment"
    | "payto"
    | "pkcs11"
    | "platform"
    | "pop"
    | "pres"
    | "prospero"
    | "proxy"
    | "pwid"
    | "psyc"
    | "pttp"
    | "qb"
    | "query"
    | "quic-transport"
    | "redis"
    | "rediss"
    | "reload"
    | "res"
    | "resource"
    | "rmi"
    | "rsync"
    | "rtmfp"
    | "rtmp"
    | "rtsp"
    | "rtsps"
    | "rtspu"
    | "secondlife"
    | "service"
    | "session"
    | "sftp"
    | "sgn"
    | "shttp"
    | "sieve"
    | "simpleledger"
    | "sip"
    | "sips"
    | "skype"
    | "smb"
    | "sms"
    | "smtp"
    | "snews"
    | "snmp"
    | "soap.beep"
    | "soap.beeps"
    | "soldat"
    | "spiffe"
    | "spotify"
    | "ssh"
    | "steam"
    | "stun"
    | "stuns"
    | "submit"
    | "svn"
    | "tag"
    | "teamspeak"
    | "tel"
    | "teliaeid"
    | "telnet"
    | "tftp"
    | "things"
    | "thismessage"
    | "tip"
    | "tn3270"
    | "tool"
    | "turn"
    | "turns"
    | "tv"
    | "udp"
    | "unreal"
    | "urn"
    | "ut2004"
    | "v-event"
    | "vemmi"
    | "ventrilo"
    | "videotex"
    | "vnc"
    | "view-source"
    | "wais"
    | "webcal"
    | "wpid"
    | "ws"
    | "wss"
    | "wtai"
    | "wyciwyg"
    | "xcon"
    | "xcon-userid"
    | "xfire"
    | "xmlrpc.beep"
    | "xmlrpc.beeps"
    | "xmpp"
    | "xri"
    | "ymsgr"
    | "z39.50"
    | "z39.50r"
    | "z39.50s";

  type PrinterServiceType = "copy" | "faxin" | "faxout" | "print" | "print3d" | "scan" | "transform";

  type PrinterKind = "disc" | "document" | "envelope" | "label" | "large" | "photo" | "postcard" | "receipt" | "roll";

  type PrinterState = "idle" | "processing" | "stopped";

  type SystemState = "idle" | "processing" | "stopped";

  type PowerState =
    | "on"
    | "on-vendor1"
    | "on-vendor2"
    | "on-vendor3"
    | "on-vendor4"
    | "on-vendor5"
    | "standby"
    | "standby-vendor1"
    | "standby-vendor2"
    | "standby-vendor3"
    | "standby-vendor4"
    | "standby-vendor5"
    | "suspend"
    | "suspend-vendor1"
    | "suspend-vendor2"
    | "suspend-vendor3"
    | "suspend-vendor4"
    | "suspend-vendor5"
    | "reset-soft"
    | "off-hard"
    | "hibernate"
    | "hibernate-vendor1"
    | "hibernate-vendor2"
    | "hibernate-vendor3"
    | "hibernate-vendor4"
    | "hibernate-vendor5"
    | "off-soft"
    | "off-soft-vendor1"
    | "off-soft-vendor2"
    | "off-soft-vendor3"
    | "off-soft-vendor4"
    | "off-soft-vendor5"
    | "reset-hard"
    | "reset-mbr"
    | "reset-nmi"
    | "off-soft-graceful"
    | "off-hard-graceful"
    | "reset-mbr-graceful"
    | "reset-soft-graceful"
    | "reset-hard-graceful"
    | "reset-init"
    | "not-applicable"
    | "no-change";

  type DocumentState = "pending" | "processing" | "processing-stopped" | "canceled" | "aborted" | "completed";

  type JobState = "pending" | "pending-held" | "processing" | "processing-stopped" | "canceled" | "aborted" | "completed";

  type ResourceState = "pending" | "available" | "installed" | "canceled" | "aborted";

  type TransmissionStatus = "pending" | "pending-retry" | "processing" | "canceled" | "aborted" | "completed";

  type OrientationRequested = "portrait" | "landscape" | "reverse-landscape" | "reverse-portrait" | "none";

  type AccuracyUnits = "mm" | "nm" | "um";

  type BalingType = "band" | "shrink-wrap" | "wrap";

  type BalingWhen = "after-job" | "after-sets";

  type XriAuthentication = "basic" | "certificate" | "digest" | "none" | "requesting-user-name";

  type XriSecurity = "none" | "ssl3" | "tls";

  type TrimmingType = "draw-line" | "full" | "partial" | "perforate" | "score" | "tab";

  type ReferenceEdge = "bottom" | "left" | "right" | "top";

  type StitchingMethod = "auto" | "crimp" | "wire";

  type TimeoutPredicate = "activity" | "inactivity" | "none";

  type SystemTimeoutSource = "dhcp" | "ntp" | "onboard" | "sntp";

  type ResourceType =
    | "executable-firmware"
    | "executable-software"
    | "static-font"
    | "static-form"
    | "static-icc-profile"
    | "static-image"
    | "static-logo"
    | "static-other"
    | "static-strings"
    | "template-document"
    | "template-job"
    | "template-printer";

  type PrintSupports = "material" | "none" | "standard";

  type PrintScaling = "auto" | "auto-fit" | "fill" | "fit" | "none";

  type PrintBase = "brim" | "none" | "raft" | "skirt" | "standard";

  type MaterialType =
    | "abs"
    | "abs-carbon-fiber"
    | "abs-carbon-nanotube"
    | "chocolate"
    | "gold"
    | "nylon"
    | "pet"
    | "photopolymer"
    | "pla"
    | "pla-conductive"
    | "pla-dissolvable"
    | "pla-flexible"
    | "pla-magnetic"
    | "pla-steel"
    | "pla-stone"
    | "pla-wood"
    | "polycarbonate"
    | "pva-dissolvable"
    | "silver"
    | "titanium"
    | "wax";

  type MaterialRateUnits = "mg_second" | "ml_second" | "mm_second";

  type MaterialPurpose = "all" | "base" | "in-fill" | "shell" | "support";

  type MaterialAmountUnits = "g" | "kg" | "l" | "m" | "ml" | "mm";

  type LaminatingType = "archival" | "glossy" | "high-gloss" | "matte" | "semi-gloss" | "translucent";

  type FinishingSides = "back" | "both" | "front";

  type JobRetainUntil = "end-of-day" | "end-of-month" | "end-of-week" | "indefinite" | "none";

  type JobPasswordRepertoire =
    | "iana_us-ascii_any"
    | "iana_us-ascii_complex"
    | "iana_us-ascii_digits"
    | "iana_us-ascii_letters"
    | "iana_utf-8_any"
    | "iana_utf-8_digits"
    | "iana_utf-8_letters";

  type InputSource = "adf" | "film-reader" | "platen";

  type InputFilmScanMode = "black-and-white-negative-film" | "color-negative-film" | "color-slide-film" | "not-applicable";

  type InputContentType = "auto" | "halftone" | "line-art" | "magazine" | "photo" | "text" | "text-and-photo";

  type InputColorMode =
    | "auto"
    | "bi-level"
    | "cmyk_8"
    | "cmyk_16"
    | "color"
    | "color_8"
    | "monochrome"
    | "monochrome_4"
    | "monochrome_8"
    | "monochrome_16"
    | "rgb_16"
    | "rgba_8"
    | "rgba_16";

  type FoldingDirection = "inward" | "outward";

  type Finishings =
    | "bale"
    | "bind"
    | "bind-bottom"
    | "bind-left"
    | "bind-right"
    | "bind-top"
    | "booklet-maker"
    | "coat"
    | "cover"
    | "edge-stitch"
    | "edge-stitch-bottom"
    | "edge-stitch-left"
    | "edge-stitch-right"
    | "edge-stitch-top"
    | "fold"
    | "fold-accordion"
    | "fold-double-gate"
    | "fold-engineering-z"
    | "fold-gate"
    | "fold-half"
    | "fold-half-z"
    | "fold-left-gate"
    | "fold-letter"
    | "fold-parallel"
    | "fold-poster"
    | "fold-right-gate"
    | "fold-z"
    | "jdf-f2-1"
    | "jdf-f4-1"
    | "jdf-f4-2"
    | "jdf-f6-1"
    | "jdf-f6-2"
    | "jdf-f6-3"
    | "jdf-f6-4"
    | "jdf-f6-5"
    | "jdf-f6-6"
    | "jdf-f6-7"
    | "jdf-f6-8"
    | "jdf-f8-1"
    | "jdf-f8-2"
    | "jdf-f8-3"
    | "jdf-f8-4"
    | "jdf-f8-5"
    | "jdf-f8-6"
    | "jdf-f8-7"
    | "jdf-f10-1"
    | "jdf-f10-2"
    | "jdf-f10-3"
    | "jdf-f12-1"
    | "jdf-f12-2"
    | "jdf-f12-3"
    | "jdf-f12-4"
    | "jdf-f12-5"
    | "jdf-f12-6"
    | "jdf-f12-7"
    | "jdf-f12-8"
    | "jdf-f12-9"
    | "jdf-f12-10"
    | "jdf-f12-11"
    | "jdf-f12-12"
    | "jdf-f12-13"
    | "jdf-f12-14"
    | "jdf-f14-1"
    | "jdf-f16-1"
    | "jdf-f16-2"
    | "jdf-f16-3"
    | "jdf-f16-4"
    | "jdf-f16-5"
    | "jdf-f16-6"
    | "jdf-f16-7"
    | "jdf-f16-8"
    | "jdf-f16-9"
    | "jdf-f16-10"
    | "jdf-f16-11"
    | "jdf-f16-12"
    | "jdf-f16-13"
    | "jdf-f16-14"
    | "jdf-f18-1"
    | "jdf-f18-2"
    | "jdf-f18-3"
    | "jdf-f18-4"
    | "jdf-f18-5"
    | "jdf-f18-6"
    | "jdf-f18-7"
    | "jdf-f18-8"
    | "jdf-f18-9"
    | "jdf-f20-1"
    | "jdf-f20-2"
    | "jdf-f24-1"
    | "jdf-f24-2"
    | "jdf-f24-3"
    | "jdf-f24-4"
    | "jdf-f24-5"
    | "jdf-f24-6"
    | "jdf-f24-7"
    | "jdf-f24-8"
    | "jdf-f24-9"
    | "jdf-f24-10"
    | "jdf-f24-11"
    | "jdf-f28-1"
    | "jdf-f32-1"
    | "jdf-f32-2"
    | "jdf-f32-3"
    | "jdf-f32-4"
    | "jdf-f32-5"
    | "jdf-f32-6"
    | "jdf-f32-7"
    | "jdf-f32-8"
    | "jdf-f32-9"
    | "jdf-f36-1"
    | "jdf-f36-2"
    | "jdf-f40-1"
    | "jdf-f48-1"
    | "jdf-f48-2"
    | "jdf-f64-1"
    | "jdf-f64-2"
    | "jog-offset"
    | "laminate"
    | "punch"
    | "punch-bottom-left"
    | "punch-bottom-right"
    | "punch-dual-bottom"
    | "punch-dual-left"
    | "punch-dual-right"
    | "punch-dual-top"
    | "punch-multiple-bottom"
    | "punch-multiple-left"
    | "punch-multiple-right"
    | "punch-multiple-top"
    | "punch-quad-bottom"
    | "punch-quad-left"
    | "punch-quad-right"
    | "punch-quad-top"
    | "punch-top-left"
    | "punch-top-right"
    | "punch-triple-bottom"
    | "punch-triple-left"
    | "punch-triple-right"
    | "punch-triple-top"
    | "saddle-stitch"
    | "staple"
    | "staple-bottom-left"
    | "staple-bottom-right"
    | "staple-dual-bottom"
    | "staple-dual-left"
    | "staple-dual-right"
    | "staple-dual-top"
    | "staple-top-left"
    | "staple-top-right"
    | "staple-triple-bottom"
    | "staple-triple-left"
    | "staple-triple-right"
    | "staple-triple-top"
    | "trim"
    | "trim-after-copies"
    | "trim-after-documents"
    | "trim-after-job"
    | "trim-after-pages";

  type BindingType = "adhesive" | "comb" | "flat" | "padding" | "perfect" | "spiral" | "tape" | "velo";

  type CoatingType =
    | "archival"
    | "archival-glossy"
    | "archival-matte"
    | "archival-semi-gloss"
    | "glossy"
    | "high-gloss"
    | "matte"
    | "semi-gloss"
    | "silicone"
    | "translucent";

  type IPPVersion = "1.0" | "1.1" | "2.0" | "2.1" | "2.2";

  type JobAccountType = "general" | "group" | "none";

  type MultipleObjectHandling = "auto" | "best-fit" | "best-quality" | "best-speed" | "one-at-a-time";

  type Overrides = keyof IJobTemplateAttributes | "document-copies" | "document-numbers" | "pages";

  type Resolution = [number, number, string];
}
