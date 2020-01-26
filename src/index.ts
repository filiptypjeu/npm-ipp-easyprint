import fs from "fs";
import { ICancelJobResponse, IGetJobAttributesResponse, IGetJobsResponse, IJobTemplate, IMimeMediaType, IPrintJobResponse, IRequest, Printer } from "ipp";

export class IPPPrinter {
  private printer: Printer;

  constructor(url: string) {
    this.printer = new Printer(url);
  }

  public printFile = async (path: string, fileType: keyof typeof IMimeMediaType, username: string, jobName: string): Promise<IPrintJobResponse> => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) { reject(err); }

        const request: IRequest = {
          "operation-attributes-tag": {
            "requesting-user-name": username,
            "document-format": fileType,
            "job-name": jobName,
          },
          // "job-attributes-tag": {
          //   "media": "na_letter_8.5x11in"
          // },
          data,
        };

        this.printer.execute("Print-Job", request, (e, res) => {
          if (e) { reject(e); }

          resolve(res);
        });
      });
    });
  };

  public getAllJobs = async (username?: string, attributes?: Array<keyof IJobTemplate>): Promise<IGetJobsResponse> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "requesting-user-name": username ? username : "",
          "my-jobs": username ? true : false,
        },
      };

      if (attributes) {
        request["operation-attributes-tag"]["requested-attributes"] = attributes;
      }

      this.printer.execute("Get-Jobs", request, (e, res) => {
        if (e) { reject(e); }

        resolve(res);
      });
    });
  };

  public getJob = async (jobId: number): Promise<IGetJobAttributesResponse> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "job-id": jobId,
        },
      };

      this.printer.execute("Get-Job-Attributes", request, (e, res) => {
        if (e) { reject(e); }

        resolve(res);
      });
    });
  };

  public cancelJob = async (jobId: number): Promise<ICancelJobResponse> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "job-id": jobId,
        },
      };

      this.printer.execute("Cancel-Job", request, (e, res) => {
        if (e) { reject(e); }

        resolve(res);
      });
    });
  };
}
