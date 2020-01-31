import fs from "fs";
import {
  Finishings,
  IdentifyActions,
  IGetPrinterAttributesRequest,
  IJobTemplateAttributes,
  IPrinterDescription,
  IPrinterStatus,
  IPrintJobRequest,
  Media,
  MimeMediaType,
  OrientationRequested,
  OutputBin,
  PrintColorMode,
  Printer,
  PrinterOpertaion,
  PrintQuality,
  PrintScaling,
  Resolution,
  Sides,
} from "ipp";

export interface IPrintJobInfo {
  buffer?: Buffer;
  fileType?: MimeMediaType;
  jobName: string;
  jobAttributes?: any;
  path?: string;
  username: string;
}

export interface IStatus {
  "copies-default": number;
  "copies-supported": number[];
  "document-format-default": MimeMediaType;
  "document-format-supported": MimeMediaType[];
  "finishings-default": Finishings;
  "finishings-supported": Finishings[];
  "identify-actions-default": IdentifyActions;
  "identify-actions-supported": IdentifyActions[];
  "job-creation-attributes-supported": Array<keyof IJobTemplateAttributes>;
  "marker-levels"?: number[];
  "marker-low-levels"?: number[];
  "marker-names"?: string[];
  "media-default": Media;
  "media-ready": Media[];
  "media-supported": Media[];
  "operations-supported": PrinterOpertaion[];
  "orientation-requested-default": OrientationRequested;
  "orientation-requested-supported": OrientationRequested[];
  "output-bin-default": OutputBin;
  "output-bin-supported": OutputBin[];
  "page-ranges-supported": boolean;
  "print-color-mode-default": PrintColorMode;
  "print-color-mode-supported": PrintColorMode[];
  "print-quality-default": PrintQuality;
  "print-quality-supported": PrintQuality[];
  "print-scaling-default": PrintScaling;
  "print-scaling-supported": PrintScaling[];
  "printer-dns-sd-name": string;
  "printer-is-accepting-jobs": boolean;
  "printer-location": string;
  "printer-name": string;
  "printer-make-and-model": string;
  "printer-organization": string;
  "printer-resolution-default": Resolution;
  "printer-resolution-supported": Resolution[];
  "printer-up-time": number;
  "queued-job-count": number;
  "sides-default": Sides;
  "sides-supported": Sides[];
}

export const statusProperties: Array<keyof IPrinterDescription | keyof IPrinterStatus> = [
  "copies-default",
  "copies-supported",
  "document-format-default",
  "document-format-supported",
  "finishings-default",
  "finishings-supported",
  "identify-actions-default",
  "identify-actions-supported",
  "job-creation-attributes-supported",
  "media-default",
  "media-ready",
  "media-supported",
  "operations-supported",
  "orientation-requested-default",
  "orientation-requested-supported",
  "output-bin-default",
  "output-bin-supported",
  "print-color-mode-default",
  "print-color-mode-supported",
  "print-quality-default",
  "print-quality-supported",
  "print-scaling-default",
  "print-scaling-supported",
  "printer-dns-sd-name",
  "printer-is-accepting-jobs",
  "printer-location",
  "printer-name",
  "printer-make-and-model",
  "printer-organization",
  "printer-up-time",
  "queued-job-count",
  "sides-default",
  "sides-supported",
];

export class IPPPrinter {
  private printer: Printer;

  constructor(readonly url: string) {
    this.printer = new Printer(url);
  }

  public printerStatus = (username: string, fileType?: MimeMediaType): Promise<IStatus> => {
    const request: IGetPrinterAttributesRequest = {
      "operation-attributes-tag": {
        "requesting-user-name": username,
        "requested-attributes": ["all"],
      },
    };

    if (fileType) {
      request["operation-attributes-tag"]["document-format"] = fileType;
    }

    return new Promise((resolve, reject) => {
      this.printer.execute("Get-Printer-Attributes", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        const response: any = Object();
        for (const key of statusProperties) {
          response[key] = res["printer-attributes-tag"][key];
        }

        resolve(response as IStatus);
      });
    });
  };

  public printFile = (options: IPrintJobInfo): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      const buffer: Promise<Buffer> = new Promise(async (res, rej) => {
        if (options.buffer) {
          res(options.buffer);
        } else if (options.path) {
          fs.readFile(options.path, (e, data) => {
            if (e) {
              return rej(e);
            }
            res(data);
          });
        } else {
          rej("Neither path of Buffer provided.");
        }
      });

      const request: IPrintJobRequest = {
        "operation-attributes-tag": {
          "requesting-user-name": options.username,
          "document-format": options.fileType || "application/octet-stream",
          "job-name": options.jobName,
        },
        "job-attributes-tag": options.jobAttributes,
        data: await buffer,
      };

      this.printer.execute("Print-Job", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        if (res["unsupported-attributes"]) {
          console.log(`Unsupported attributes: ${res["unsupported-attributes"]}`);
        }

        resolve(res["job-attributes-tag"]["job-id"]);
      });
    });
  };

  // public getAllJobs = (
  //   username?: string,
  //   attributes: Array<keyof IJobStatusAttributes | keyof IJobTemplateAttributes> = ["job-uri", "job-id"]
  // ): Promise<any[]> => {
  //   return new Promise((resolve, reject) => {
  //     const request: IRequest = {
  //       "operation-attributes-tag": {
  //         "requesting-user-name": username ? username : "",
  //         "my-jobs": username ? true : false,
  //         "requested-attributes": attributes,
  //       },
  //     };

  //     this.printer.execute("Get-Jobs", request, (e, res) => {
  //       if (e) {
  //         return reject(e);
  //       }

  //       if (res.statusCode !== "successful-ok") {
  //         return reject(res);
  //       }

  //       Array.isArray(res["job-attributes-tag"]) ? resolve(res["job-attributes-tag"]) : resolve([res["job-attributes-tag"]]);
  //     });
  //   });
  // };

  // public getJob = (jobId: number, attributes?: Array<keyof IJobStatusAttributes | keyof IJobTemplateAttributes>): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     const request: IRequest = {
  //       "operation-attributes-tag": {
  //         "job-id": jobId,
  //       },
  //     };

  //     if (attributes) {
  //       request["operation-attributes-tag"]["requested-attributes"] = attributes;
  //     }

  //     this.printer.execute("Get-Job-Attributes", request, (e, res) => {
  //       if (e) {
  //         return reject(e);
  //       }

  //       if (res.statusCode !== "successful-ok") {
  //         return reject(res);
  //       }

  //       const attr = Array.isArray(res["job-attributes-tag"]) ? res["job-attributes-tag"][0] : res["job-attributes-tag"];

  //       resolve(attr);
  //     });
  //   });
  // };

  // public cancelJob = (jobId: number): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     const request: IRequest = {
  //       "operation-attributes-tag": {
  //         "job-id": jobId,
  //       },
  //     };

  //     this.printer.execute("Cancel-Job", request, (e, res) => {
  //       if (e) {
  //         return reject(e);
  //       }

  //       if (res.statusCode !== "successful-ok") {
  //         return reject(res);
  //       }

  //       resolve();
  //     });
  //   });
  // };
}
