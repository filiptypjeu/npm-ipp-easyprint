import fs from "fs";
import { FullRequest, GetPrinterAttributesRequest, IdentifyActions, MimeMediaType, Printer, PrinterDescription, PrinterStatus, PrintJobRequest } from "ipp";

export interface IPrintJobInfo {
  buffer?: Buffer;
  fileType?: MimeMediaType;
  jobName: string;
  jobAttributes?: any;
  path?: string;
  username?: string;
}

export type IStatus = {
  [key in keyof PrinterDescription | keyof PrinterStatus]?: any;
};

export class IPPPrinter {
  private printer: Printer;

  constructor(readonly url: string) {
    this.printer = new Printer(url);
  }

  /**
   * Fetch the status of the printer.
   *
   * @param attributes Array of attributes to fetch. Too many possibilities to list here. Will give all available attributes if left as undefined.
   * @param username The username to include in the IPP request. This is mandatory according to the IPP standard, but printers usually don't care about the username if not set up to do so.
   * @param fileType Provide the file type to only get attributes relevant for that file type.
   */
  public printerStatus = (
    attributes: (keyof PrinterDescription | keyof PrinterStatus)[] | "all",
    username?: string,
    fileType?: MimeMediaType
  ): Promise<IStatus> => {
    const request: GetPrinterAttributesRequest = {
      "operation-attributes-tag": {
        "requesting-user-name": username || "user",
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

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        if (attributes === "all") {
          return resolve(res["printer-attributes-tag"] as IStatus);
        }

        const response: IStatus = {};
        for (const key of attributes) {
          response[key as keyof PrinterDescription | keyof PrinterStatus] = res["printer-attributes-tag"][key as keyof object];
        }

        return resolve(response);
      });
    });
  };

  /**
   * Print a file from disk or Buffer.
   *
   * @param options An object with the following properties:
   *   @property buffer?: Buffer;
   *   @property fileType?: MimeMediaType;
   *   @property jobName: string;
   *   @property jobAttributes?: any;
   *   @property path?: string;
   *   @property username: string;
   * Either path to disk or Buffer need to be provided.
   *
   * @returns the job ID if successful.
   */
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

      const request: PrintJobRequest = {
        "operation-attributes-tag": {
          "requesting-user-name": options.username || "user",
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

  /**
   * Sends an identify request to the printer.
   *
   * @param identifyAction The action the printer should take to identify itself. The available actions are 'display', 'flash', 'sound' and 'speak'. Not all printers support all actions.
   *
   * @returns whether or not the request was successful.
   */
  public identify = (identifyAction?: IdentifyActions[], username?: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const request: FullRequest = {
        "operation-attributes-tag": {
          "identify-actions": identifyAction || ["sound"],
          "requesting-user-name": username || "user",
        },
      };

      this.printer.execute("Identify-Printer", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        resolve(true);
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
