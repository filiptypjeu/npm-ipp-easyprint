declare module "ipp" {
  export class Printer {
    constructor(url: string, options?: IPrinterOptions);

    execute: (operation: keyof typeof PrinterOpertaion, message?: IRequest, callback?: (error: Error, response: IResponse) => void) => void;
  }

  export interface IPrinterOptions {
    version?: string;
    uri?: string;
    charset?: string;
    language?: string;
  }

  export interface IRequest {
    "operation-attributes-tag": IOperationAttributes;
    "job-attributes-tag"?: IJobStatusAttributes;
    data?: Buffer;
  }

  export interface IResponse {
    version: string;
    statusCode: keyof typeof StatusCode;
    id: number;
    "operation-attributes-tag": IOperationAttributes;
    "job-attributes-tag": IJobStatusAttributes | IJobStatusAttributes[];
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
    "document-format"?: keyof typeof IMimeMediaType;
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
    "input-color-mode"?: string;
    "input-content-type"?: string;
    "input-contrast"?: number;
    "input-film-scan-mode"?: string;
    "input-images-to-transfer"?: number;
    "input-media"?: string;
    "input-orientation-requested"?: string;
    "input-quality"?: string;
    "input-resolution"?: string;
    "input-scaling-height"?: number;
    "input-scaling-width"?: number;
    "input-scan-regions"?: IPPScanRegions[];
    "input-sharpness"?: number;
    "input-sides"?: string;
    "input-source"?: string;
  }

  interface IPPScanRegions {
    "x-dimension"?: number;
    "x-origin"?: number;
    "y-dimension"?: number;
    "y-origin"?: number;
  }

  interface IOutpuAttributes {
    "noise-removal"?: number;
    "output-compression-quality-factor"?: number;
  }

  interface IOperationAttributes {
    "attributes-charset"?: string;
    "attributes-natural-language"?: string;
    "charge-info-message"?: string;
    "compression"?: string;
    "compression-accepted"?: string[];
    "destination-accesses"?: IDestionationAccesses[];
    "detailed-status-message"?: string;
    "document-access"?: IDocumentAccess;
    "document-access-error"?: string;
    "document-charset"?: string;
    "document-data-get-interval"?: number;
    "document-data-wait"?: boolean;
    "document-digital-signature"?: string;
    "document-format"?: keyof typeof IMimeMediaType;
    "document-format-accepted"?: (keyof typeof IMimeMediaType)[];
    "document-format-details"?: IDocumentFormatDetails;
    "document-message"?: string;
    "document-metadata"?: string[];
    "document-name"?: string;
    "document-natural-language"?: string;
    "document-number"?: number;
    "document-password"?: string;
    "document-preprocessed"?: boolean;
    "fetch-status-code"?: string;
    "fetch-status-message"?: string;
    "first-index"?: number;
    "identify-actions"?: string[];
    "input-attributes"?: IInputAttributes;
    "ipp-attribute-fidelity"?: boolean;
    "job-authorization-uri"?: string;
    "job-hold-until"?: string;
    "job-hold-until-time"?: string;
    "job-id"?: number;
    "job-ids"?: number[];
    "job-impressions"?: number;
    "job-impressions-col"?: IJobImpressions;
    "job-impressions-estimated"?: number;
    "job-k-octets"?: number;
    "job-mandatory-attributes"?: string[];
    "job-media-sheets"?: number;
    "job-media-sheets-col"?: IJobMediaSheets;
    "job-message-from-operator"?: string;
    "job-name"?: string;
    "job-pages"?: number;
    "job-pages-col"?: IJobPages;
    "job-password"?: string;
    "job-password-encryption"?: string;
    "job-state"?: string;
    "job-state-message"?: string;
    "job-state-reasons"?: string |string[];
    "job-uri"?: string;
    "last-document"?: boolean;
    "limit"?: number;
    "message"?: string;
    "my-jobs"?: boolean;
    "notify-get-interval"?: number;
    "notify-printer-ids"?: number[];
    "notify-resource-id"?: number;
    "notify-sequence-numbers"?: number[];
    "notify-subscription-ids"?: number[];
    "notify-wait"?: boolean;
    "original-requesting-user-name"?: string;
    "output-attributes"?: IOutpuAttributes;
    "output-device-job-states"?: string[];
    "output-device-uuid"?: string;
    "preferred-attributes"?: any;
    "printer-geo-location"?: string;
    "printer-id"?: number;
    "printer-ids"?: number[];
    "printer-location"?: string;
    "printer-message-from-operator"?: string;
    "printer-service-type"?: string[];
    "printer-up-time"?: number;
    "printer-uri"?: string;
    "printer-xri-requested"?: any[];
    "profile-uri-actual"?: string;
    "requested-attributes"?: (keyof IJobTemplateAttributes | keyof IJobStatusAttributes)[];
    "requesting-user-name"?: string;
    "requesting-user-uri"?: string;
    "resource-format"?: keyof typeof IMimeMediaType;
    "resource-format-accepted"?: (keyof typeof IMimeMediaType)[];
    "resource-formats"?: (keyof typeof IMimeMediaType)[];
    "resource-id"?: number;
    "resource-ids"?: number[];
    "resource-k-octets"?: number;
    "resource-natural-language"?: string;
    "resource-patches"?: string;
    "resource-signature"?: string[];
    "resource-states"?: string[];
    "resource-string-version"?: string;
    "resource-type"?: string;
    "resource-types"?: string[];
    "resource-version"?: string;
    "restart-get-interval"?: number;
    "status-message"?: string;
    "system-uri"?: string;
    "which-jobs"?: string;
    "which-printers"?: string;
  }

  interface IDestinationStatuses {
    "destination-uri"?: string;
    "images-completed"?: number;
    "transmission-status"?: string;
  }

  interface IJobImpressions {
    "blank"?: number;
    "blank-two-sided"?: number;
    "full-color"?: number;
    "full-color-two-sided"?: number;
    "highlight-color"?: number;
    "highlight-color-two-sided"?: number;
    "monochrome"?: number;
    "monochrome-two-sided"?: number;
  }

  interface IJobMediaSheets {
    "job-media-sheets-col	blank"?: number;
    "job-media-sheets-col	full-color"?: number;
    "job-media-sheets-col	highlight-color"?: number;
    "job-media-sheets-col	monochrome"?: number;
  }

  interface IJobPages {
    "job-pages-col	full-color"?: number;
    "job-pages-col	monochrome"?: number;
  }

  interface IJobStatusAttributes {
    "attributes-charset"?: string;
    "attributes-natural-language"?: string;
    "chamber-humidity-actual"?: number[];
    "chamber-temperature-actual"?: number[];
    "compression-supplied"?: string;
    "copies-actual"?: number[];
    "cover-back-actual"?: ICover[];
    "cover-front-actual"?: ICover[];
    "date-time-at-completed"?: string;
    "date-time-at-creation"?: string
    "date-time-at-processing"?: string;
    "destination-statuses"?: IDestinationStatuses[];
    "document-charset-supplied"?: string;
    "document-digital-signature-supplied"?: string;
    "document-format-details-supplied"?: IDocumentFormatDetails;
    "document-format-ready"?: IMimeMediaType[];
    "document-format-supplied"?: IMimeMediaType;
    "document-format-version-supplied"?: string;
    "document-message-supplied"?: string;
    "document-name-supplied"?: string;
    "document-natural-language-supplied"?: string;
    "errors-count"?: number;
    "finishings-actual"?: string[];
    "finishings-col-actual"?: IFinishings[];
    "force-front-side-actual"?: number[][];
    "imposition-template-actual"?: string[];
    "input-attributes-actual"?: IInputAttributes;
    "insert-sheet-actual"?: IInsertSheet[];
    "job-account-id-actual"?: string[];
    "job-account-type-actual"?: string;
    "job-accounting-sheets-actual"?: IJobAccontingSheets[];
    "job-accounting-user-id-actual"?: string[];
    "job-attribute-fidelity"?: boolean;
    "job-detailed-status-messages"?: string[];
    "job-document-access-errors"?: string[];
    "job-error-sheet-actual"?: IJobErrorSheet[];
    "job-hold-until-actual"?: string[];
    "job-id"?: number;
    "job-impressions"?: number;
    "job-impressions-col"?: IJobImpressions;
    "job-impressions-completed"?: number;
    "job-impressions-completed-col"?: IJobImpressions;
    "job-k-octets"?: number;
    "job-k-octets-processed"?: number;
    "job-media-sheets"?: number;
    "job-media-sheets-col"?: IJobMediaSheets;
    "job-media-sheets-completed"?: number;
    "job-media-sheets-completed-col"?: IJobImpressions;
    "job-more-info"?: string;
    "job-originating-user-name"?: string;
    "job-originating-user-uri"?: string;
    "job-pages"?: number;
    "job-pages-col"?: IJobPages;
    "job-pages-completed"?: number;
    "job-pages-completed-col"?: IJobPages;
    "job-pages-completed-current-copy"?: number;
    "job-printer-up-time"?: number;
    "job-printer-uri"?: string;
    "job-priority-actual"?: number[];
    "job-resource-ids"?: number[];
    "job-sheet-message-actual"?: number[];
    "job-sheets-actual"?: string[];
    "job-sheets-col-actual"?: IJobSheets[];
    "job-state"?: string;
    "job-state-message"?: string;
    "job-state-reasons"?: string[];
    "job-uri"?: string;
    "job-uuid"?: string;
    "materials-col-actual"?: IMaterials[];
    "media-actual"?: string[];
    "media-col-actual"?: IMedia[];
    "media-input-tray-check-actual"?: string[];
    "multiple-document-handling-actual"?: string[];
    "multiple-object-handling-actual"?: string;
    "number-of-documents"?: number;
    "number-of-intervening-jobs"?: number;
    "number-up-actual"?: number[];
    "orientation-requested-actual"?: string[];
    "original-requesting-user-name"?: string;
    "output-attributes-actual"?: IOutpuAttributes;
    "output-bin-actual"?: string[];
    "output-device-actual"?: string[];
    "output-device-assigned"?: string;
    "output-device-job-state"?: string;
    "output-device-job-state-message"?: string;
    "output-device-job-state-reasons"?: string[];
    "output-device-uuid-assigned"?: string;
    "overrides-actual"?: any[];
    "page-delivery-actual"?: string[];
    "page-order-received-actual"?: string[];
    "page-ranges-actual"?: number[];
    "platform-temperature-actual"?: number[];
    "presentation-direction-number-up-actual"?: string[];
    "print-accuracy-actual"?: IPrintAccuracy;
    "print-base-actual"?: string[];
    "print-color-mode-actual"?: string[];
    "print-content-optimize-actual"?: string[];
    "print-objects-actual"?: IPrintObjects[];
    "print-quality-actual"?: string[];
    "print-rendering-intent-actual"?: string[];
    "print-supports-actual"?: string[];
    "printer-resolution-actual"?: string[];
    "separator-sheets-actual"?: ISeparatorSheets[];
    "sheet-collate-actual"?: string[];
    "sides-actual"?: string[];
    "time-at-completed"?: number;
    "time-at-creation"?: number;
    "time-at-processing"?: number;
    "warnings-count"?: number;
    "x-image-position-actual"?: string[];
    "x-image-shift-actual"?: number[];
    "x-side1-image-shift-actual"?: number[];
    "x-side2-image-shift-actual"?: number[];
    "y-image-position-actual"?: string[];
    "y-image-shift-actual"?: number[];
    "y-side1-image-shift-actual"?: number[];
    "y-side2-image-shift-actual"?: number[];
  }

  interface ICover {
    "cover-type"?: string;
    "media"?: string;
    "media-col"?: IMedia[]
  }

  interface ICoverSheetInfo {
    "from-name"?: string;
    "logo"?: string;
    "message"?: string;
    "organization-name"?: string;
    "subject"?: string;
    "to-name"?: string;
  }

  interface IDestinationUris {
    "destination-attributes"?: any[];
    "destination-uri"?: string;
    "post-dial-string"?: string;
    "pre-dial-string"?: string;
    "t33-subaddress"?: number;
    "feed-orientation"?: string;
  }

  interface IFinishingBailing {
    "baling-type"?: string;
    "baling-when"?: string;
  }

  interface IFinishingBinding {
    "binding-reference-edge"?: string;
    "binding-type"?: string;
  }

  interface IFinishingCoating {
    "coating-sides"?: string;
    "coating-type"?: string;
  }

  interface IFinishingCovering {
    "covering-name"?: string;
  }

  interface IFinishingFolding {
    "folding-direction"?: string;
    "folding-offset"?: number;
    "folding-reference-edge"?: string;
  }

  interface IFinishingLaminating {
    "laminating-sides"?: string;
    "laminating-type"?: string;
  }

  interface IFinishingPunching {
    "punching-locations"?: number[];
    "punching-offset"?: number;
    "punching-reference-edge"?: string;
  }

  interface IFinishingStitching {
    "stitching-angle"?: number;
    "stitching-locations"?: number[];
    "stitching-method"?: string;
    "stitching-offset"?: number;
    "stitching-reference-edge"?: string;
  }

  interface IFinishingTrimming {
    "trimming-offset"?: number;
    "trimming-reference-edge"?: string;
    "trimming-type"?: string;
    "trimming-when"?: string;
  }


  interface IFinishings {
    "baling"?: IFinishingBailing;
    "binding"?: IFinishingBinding;
    "coating"?: IFinishingCoating;
    "covering"?: IFinishingCovering;
    "finishing-template"?: string;
    "folding"?: IFinishingFolding[];
    "imposition-template"?: string;
    "laminating"?: IFinishingLaminating;
    "media-sheets-supported"?: string;
    "media-size"?: IMediaSize;
    "media-size-name"?: string;
    "punching"?: IFinishingPunching;
    "stitching"?: IFinishingStitching;
    "trimming"?: IFinishingTrimming[];
  }

  interface IInsertSheet {
    "insert-after-page-number"?: number;
    "insert-count"?: number;
    "media"?: string;
    "media-col"?: IMedia;
  }

  interface IJobAccontingSheets {
    "job-accounting-output-bin"?: string;
    "job-accounting-sheets-type"?: string;
    "media"?: string;
    "media-col"?: IMedia;
  }

  interface IJobErrorSheet {
    "job-error-sheet-type"?: string;
    "job-error-sheet-when"?: string;
    "media"?: string;
    "media-col"?: IMedia;
  }

  interface IJobSaveDisposition {
    "save-info"?: ISaveInfo[];
  }

  interface ISaveInfo {
    "save-document-format"?: IMimeMediaType;
    "save-location"?: string;
    "save-name": string;
  }

  interface IJobSheets {
    "job-sheets"?: string;
    "media"?: string;
    "media-col"?: IMedia;
  }

  interface IMaterials {
    "material-amount"?: number;
    "material-amount-units"?: string;
    "material-color"?: string;
    "material-diameter"?: number;
    "material-diameter-tolerance"?: number;
    "material-fill-density"?: number;
    "material-key"?: string;
    "material-name	": string;
    "material-nozzle-diameter"?: number;
    "material-purpose"?: string[];
    "material-rate"?: number;
    "material-rate-units"?: string;
    "material-retraction"?: boolean;
    "material-shell-thickness"?: number;
    "material-temperature"?: number;
    "material-type"?: string;
  }

  interface IMedia {
    "media-back-coating"?: string;
    "media-bottom-margin"?: number;
    "media-color"?: string;
    "media-front-coating"?: string;
    "media-grain"?: string;
    "media-hole-count"?: number;
    "media-info"?: string;
    "media-key"?: string;
    "media-left-margin"?: number;
    "media-order-count"?: number;
    "media-pre-printed"?: string;
    "media-recycled"?: string;
    "media-right-margin"?: number;
    "media-size"?: IMediaSize;
    "media-size-name"?: string;
    "media-source"?: string;
    "media-thickness"?: number;
    "media-tooth"?: string;
    "media-top-margin"?: number;
    "media-type"?: string;
    "media-weight-metric"?: number;
  }

  interface IMediaSize {
    "x-dimension"?: number;
    "y-dimension"?: number;
  }

  interface IPdlInitFile {
    "pdl-init-file-entry	": string;
    "pdl-init-file-location"?: string;
    "pdl-init-file-name	": string;
  }

  interface IPrintAccuracy {
    "accuracy-units"?: string;
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
    "media"?: string;
    "media-col"?: IMedia;
    "proof-print-copies"?: number;
  }

  interface ISeparatorSheets {
    "media"?: string;
    "media-col"?: IMedia;
    "separator-sheets-type"?: string[];
  }

  interface IJobTemplateAttributes {
    "chamber-humidity"?: number;
    "chamber-temperature"?: number;
    "confirmation-sheet-print"?: boolean;
    "copies"?: number;
    "cover-back"?: ICover;
    "cover-front"?: ICover;
    "cover-sheet-info"?: ICoverSheetInfo;
    "destination-uris"?: IDestinationUris[];
    "finishings"?: string[];
    "finishings-col"?: IFinishings[];
    "font-name-requested"?: string;
    "font-size-requested"?: number;
    "force-front-side"?: number[];
    "imposition-template"?: string;
    "insert-sheet"?: IInsertSheet[];
    "job-account-id"?: string;
    "job-account-type"?: string;
    "job-accounting-sheets"?: IJobAccontingSheets;
    "job-accounting-user-id"?: string;
    "job-cancel-after"?: number;
    "job-copies"?: number;
    "job-cover-back"?: ICover
    "job-cover-front"?: ICover
    "job-delay-output-until"?: string;
    "job-delay-output-until-time"?: string;
    "job-error-action"?: string;
    "job-error-sheet"?: IJobErrorSheet;
    "job-finishings"?: string[];
    "job-finishings-col"?: IFinishings;
    "job-hold-until"?: string;
    "job-hold-until-time"?: string;
    "job-message-to-operator"?: string;
    "job-pages-per-set"?: number;
    "job-phone-number"?: string;
    "job-priority"?: number;
    "job-recipient-name"?: string;
    "job-retain-until"?: string;
    "job-retain-until-interval"?: number;
    "job-retain-until-time"?: string;
    "job-save-disposition"?: IJobSaveDisposition;
    "job-save-disposition	save-disposition"?: string;
    "job-sheet-message"?: string;
    "job-sheets"?: string;
    "job-sheets-col"?: IJobSheets;
    "materials-col"?: IMaterials[];
    "media"?: string;
    "media-col"?: IMedia;
    "media-input-tray-check"?: string;
    "multiple-document-handling"?: string;
    "multiple-object-handling"?: string;
    "number-of-retries"?: number;
    "number-up"?: number;
    "orientation-requested"?: string;
    "output-bin"?: string;
    "output-device"?: string;
    "overrides"?: any[];
    "page-delivery"?: string;
    "page-order-received"?: string;
    "page-ranges": string;
    "pages-per-subset"?: number[];
    "pages-per-subset(deprecated)"?: number[];
    "pclm-source-resolution	"?: string;
    "pdl-init-file"?: IPdlInitFile;
    "platform-temperature"?: number;
    "presentation-direction-number-up"?: string;
    "print-accuracy"?: IPrintAccuracy;
    "print-base"?: string;
    "print-color-mode"?: string;
    "print-content-optimize"?: string;
    "print-objects"?: IPrintObjects[];
    "print-quality"?: string;
    "print-rendering-intent"?: string;
    "print-scaling"?: string;
    "print-supports"?: string;
    "printer-resolution	"?: string;
    "proof-print"?: IProofPrint;
    "retry-interval"?: number;
    "retry-time-out"?: number;
    "separator-sheets"?: ISeparatorSheets;
    "sides"?: string;
    "x-image-position"?: string;
    "x-image-shift"?: number;
    "x-side1-image-shift"?: number;
    "x-side2-image-shift"?: number;
    "y-image-position"?: string;
    "y-image-shift"?: number;
    "y-side1-image-shift"?: number;
    "y-side2-image-shift"?: number;
  }


  const enum StatusCode {
    "successful-ok",
    "successful-ok-ignored-or-substituted-attributes",
    "successful-ok-conflicting-attributes",
    "successful-ok-ignored-subscriptions",
    "successful-ok-too-many-events",
    "successful-ok-events-complete",
    "client-error-bad-request",
    "client-error-forbidden",
    "client-error-not-authenticated",
    "client-error-not-authorized",
    "client-error-not-possible",
    "client-error-timeout",
    "client-error-not-found",
    "client-error-gone",
    "client-error-request-entity-too-large",
    "client-error-request-value-too-long",
    "client-error-document-format-not-supported",
    "client-error-attributes-or-values-not-supported",
    "client-error-uri-scheme-not-supported",
    "client-error-charset-not-supported",
    "client-error-conflicting-attributes",
    "client-error-compression-not-supported",
    "client-error-compression-error",
    "client-error-document-format-error",
    "client-error-document-access-error",
    "client-error-attributes-not-settable",
    "client-error-ignored-all-subscriptions",
    "client-error-too-many-subscriptions",
    "client-error-document-password-error",
    "client-error-document-permission-error",
    "client-error-document-security-error",
    "client-error-document-unprintable-error",
    "client-error-account-info-needed",
    "client-error-account-closed",
    "client-error-account-limit-reached",
    "client-error-account-authorization-failed",
    "client-error-not-fetchable",
    "server-error-internal-error",
    "server-error-operation-not-supported",
    "server-error-service-unavailable",
    "server-error-version-not-supported",
    "server-error-device-error",
    "server-error-temporary-error",
    "server-error-not-accepting-jobs",
    "server-error-busy",
    "server-error-job-canceled",
    "server-error-multiple-document-jobs-not-supported",
    "server-error-printer-is-deactivated",
    "server-error-too-many-jobs",
    "server-error-too-many-documents",
  }

  const enum IMimeMediaType {
    'application/octet-stream',
    'application/vnd.hp-PCL',
    'text/plain',
    'image/urf',
    'image/pwg-raster',
    'application/postscript',
    'application/pdf',
    'application/PCLm',
    'image/jpeg',
    'image/tiff'
  }

  const enum PrinterOpertaion {
    "Acknowledge-Document",
    "Acknowledge-Identify-Printer",
    "Acknowledge-Job",
    "Activate-Printer",
    "Add-Document-Images",
    "Allocate-Printer-Resources",
    "Cancel-Current-Job",
    "Cancel-Document",
    "Cancel-Job",
    "Cancel-Jobs",
    "Cancel-My-Jobs",
    "Cancel-Resource",
    "Cancel-Subscription",
    "Close-Job",
    "Create-Job",
    "Create-Job-Subscriptions",
    "Create-Printer",
    "Create-Printer-Subscriptions",
    "Create-Resource",
    "Create-Resource-Subscriptions",
    "Create-System-Subscriptions",
    "Deactivate-Printer",
    "Deallocate-Printer-Resources",
    "Delete-Document",
    "Delete-Printer",
    "Deregister-Output-Device",
    "Disable-All-Printers",
    "Disable-Printer",
    "Enable-All-Printers",
    "Enable-Printer",
    "Fetch-Document",
    "Fetch-Job",
    "Get-Document-Attributes",
    "Get-Documents",
    "Get-Job-Attributes",
    "Get-Jobs",
    "Get-Next-Document-Data",
    "Get-Notifications",
    "Get-Output-Device-Attributes",
    "Get-Printer-Attributes",
    "Get-Printer-Resources",
    "Get-Printer-Supported-Values",
    "Get-Printers",
    "Get-Resource-Attributes",
    "Get-Resources",
    "Get-Subscription-Attributes",
    "Get-Subscriptions",
    "Get-System-Attributes",
    "Get-System-Supported-Values",
    "Get-User-Printer-Attributes",
    "Hold-Job",
    "Hold-New-Jobs",
    "Identify-Printer",
    "Install-Resource",
    "Pause-All-Printers",
    "Pause-All-Printers-After-Current-Job",
    "Pause-Printer",
    "Pause-Printer-After-Current-Job",
    "Print-Job",
    "Print-URI",
    "Promote-Job",
    "Purge-Jobs",
    "Register-Output-Device",
    "Release-Held-New-Jobs",
    "Release-Job",
    "Renew-Subscription",
    "Reprocess-Job",
    "Restart-Job",
    "Restart-One-Printer",
    "Restart-Printer",
    "Restart-System",
    "Resubmit-Job",
    "Resume-All-Printers",
    "Resume-Job",
    "Resume-Printer",
    "Schedule-Job-After",
    "Send-Document",
    "Send-Resource-Data",
    "Send-URI",
    "Set-Document-Attributes",
    "Set-Job-Attributes",
    "Set-Printer-Attributes",
    "Set-Resource-Attributes",
    "Set-System-Attributes",
    "Shutdown-All-Printers",
    "Shutdown-One-Printer",
    "Shutdown-Printer",
    "Startup-All-Printers",
    "Startup-One-Printer",
    "Startup-Printer",
    "Suspend-Current-Job",
    "Update-Active-Jobs",
    "Update-Document-Status",
    "Update-Job-Status",
    "Update-Output-Device-Attributes",
    "Validate-Document",
    "Validate-Job",
    "Value",
  }
}
