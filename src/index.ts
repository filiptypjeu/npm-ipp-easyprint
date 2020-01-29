import fs from "fs";
import { IJobStatusAttributes, IJobTemplateAttributes, MimeMediaType, IRequest, Printer } from "ipp";

export class IPPPrinter {
  private printer: Printer;

  constructor(url: string) {
    this.printer = new Printer(url);
  }

  public printerStatus = () => {
    this.printer.execute("Get-Printer-Attributes", undefined, (e, res) => {
      if (e) {
        console.log(e);
      } else {
        console.log(res);
      }
    });
  };

  public printFile = (path: string, fileType: MimeMediaType, jobName: string, username: string): Promise<IPrintJobResponse> => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }

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
          if (e) {
            return reject(e);
          }

          if (res.statusCode !== "successful-ok") {
            return reject(res);
          }

          const attr = Array.isArray(res["job-attributes-tag"]) ? res["job-attributes-tag"][0] : res["job-attributes-tag"];

          resolve({
            "job-id": attr["job-id"],
            "job-state": attr["job-state"],
            "job-state-reasons": attr["job-state-reasons"],
            "number-of-intervening-jobs": attr["number-of-intervening-jobs"],
          });
        });
      });
    });
  };

  public getAllJobs = (
    username?: string,
    attributes: Array<keyof IJobStatusAttributes | keyof IJobTemplateAttributes> = ["job-uri", "job-id"]
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "requesting-user-name": username ? username : "",
          "my-jobs": username ? true : false,
          "requested-attributes": attributes,
        },
      };

      this.printer.execute("Get-Jobs", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        Array.isArray(res["job-attributes-tag"]) ? resolve(res["job-attributes-tag"]) : resolve([res["job-attributes-tag"]]);
      });
    });
  };

  public getJob = (jobId: number, attributes?: Array<keyof IJobStatusAttributes | keyof IJobTemplateAttributes>): Promise<any> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "job-id": jobId,
        },
      };

      if (attributes) {
        request["operation-attributes-tag"]["requested-attributes"] = attributes;
      }

      this.printer.execute("Get-Job-Attributes", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        const attr = Array.isArray(res["job-attributes-tag"]) ? res["job-attributes-tag"][0] : res["job-attributes-tag"];

        resolve(attr);
      });
    });
  };

  public cancelJob = (jobId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request: IRequest = {
        "operation-attributes-tag": {
          "job-id": jobId,
        },
      };

      this.printer.execute("Cancel-Job", request, (e, res) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== "successful-ok") {
          return reject(res);
        }

        resolve();
      });
    });
  };
}

interface IPrintJobResponse {
  "job-id"?: number;
  "job-state"?: string;
  "job-state-reasons"?: string | string[];
  "number-of-intervening-jobs"?: number;
}

const p = new IPPPrinter("http://banksy.tf.fi");

// p.printFile("testfile.txt", "text/plain", "UUUU", "JOBNAME").then(res => {
//   console.log(res);
// }).catch(e => console.log(e));

p.printerStatus();

// p.getAllJobs().then(res => {
//   console.log(res);
// }).catch(e => console.log(e));

// p.getJob(9973).then(res => {
//   console.log(res);
// }).catch(e => console.log(e));

// p.cancelJob(9973)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => console.log(e));
